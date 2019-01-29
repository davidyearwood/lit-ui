/* eslint-disable no-console  */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  Constants,
  Permissions,
  Linking,
  Location,
  MapView,
  TaskManager,
  WebBrowser
} from "expo";
import PropTypes from "prop-types";
import React from "react";
import {
  AsyncStorage,
  BackHandler,
  Platform,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList
} from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { connect, Provider } from "react-redux";
import uuidv4 from "uuid/v4";
import {
  mapIsReady,
  setDeviceId,
  setError,
  setInfo,
  setRegion,
  setPlaces,
  setToken,
  setView
} from "./app/actions";
import LitConstants from "./app/constants/lit";
import Views from "./app/constants/views";
import litApi from "./app/api/api";
import litMapStyle from "./app/components/LitMap/litMapStyle";
import LitMarkers from "./app/components/LitMarker/LitMarkers";
import LitMapView from "./app/components/litMapView";
import LoadingScreen from "./app/components/LoadingScreen";
import LoginScreen from "./app/components/LoginScreen";
import PlaceCard from "./app/components/PlaceCard";
import SearchBar from "./app/components/SearchBar";
import SearchResult from "./app/components/SearchResult";
import SettingButton from "./app/components/SettingButton";
import UserMarkerIcon from "./app/components/SVG/UserMarkerIcon";
import store from "./app/stores";
import { INSTAGRAM_ID } from "./credentials";

TaskManager.defineTask(
  LitConstants.TASK_SET_DEVICE_LOCATION,
  ({ data, error }) => {
    if (error) {
      console.log("[js] TaskManager error:", error);
    }
    if (data) {
      AsyncStorage.getItem(LitConstants.DEVICE_ID_LABEL).then(id => {
        // litApi
        //   .setDeviceLocation(id, "ChIJUcXdzOr_0YURd95z59ZBAYc")
        //   .then(response => {
        //     // Do something with the response
        //   })
        //   .catch(error => {
        //     console.log("[js] Unable to set location:", error);
        //   });
      });
      console.log("[js] TaskManager", data);
    }
  }
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  mapIsReady: ready => dispatch(mapIsReady(ready)),
  setDeviceId: id => dispatch(setDeviceId(id)),
  setInfo: info => dispatch(setInfo(info)),
  setPlaces: places => dispatch(setPlaces(places)),
  setRegion: region => dispatch(setRegion(region)),
  setToken: token => dispatch(setToken(token)),
  setView: view => dispatch(setView(view))
});

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onMainScreen = this.onMainScreen.bind(this);
    this.onMapLayout = this.onMapLayout.bind(this);
    this.onMarkerPressed = this.onMarkerPressed.bind(this);
    this.updateDeviceLocation = this.updateDeviceLocation.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this._loginWithInstagram = this._loginWithInstagram.bind(this);
  }

  async _getDeviceLocationAsync() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      return null;
    }
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission denied"
      });
    }

    const location = await Location.getCurrentPositionAsync();

    return {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      latDelta: 0.0922,
      lngDelta: 0.0421
    };
  }

  async _loginWithInstagram() {
    try {
      const deep_link = Linking.makeUrl(LitConstants.INSTAGRAM_DEEP_LINK);
      const url =
        `https://api.instagram.com/oauth/authorize/` +
        `?client_id=${INSTAGRAM_ID}` +
        `&redirect_uri=${LitConstants.REDIRECT_URL}` +
        `&response_type=code` +
        `&state=${deep_link}`;
      console.log("[js] url:", url);
      WebBrowser.openAuthSessionAsync(url, deep_link)
        .then(result => {
          if (result.type === "success") {
            const token_regex = /token=\w+\.\w+\.\w+/;
            const match = result.url.match(token_regex);
            if (match) {
              const token = match[0].substring(6);
              AsyncStorage.setItem(LitConstants.TOKEN_LABEL, token);
              this.props.setToken(token);
              this.props.setView(Views.DEFAULT);
              console.log("[js] New Token:", token);
            }
          }
        })
        .catch(error => console.log("[js] WebBrowser Error:", error));

      // this._removeLoginListener();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    // Sets a unique id when the app is launched for the first time.
    AsyncStorage.getItem(LitConstants.DEVICE_ID_LABEL)
      .then(id => {
        if (id === null || !id.match(/\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/)) {
          const new_id = uuidv4();
          AsyncStorage.setItem(LitConstants.DEVICE_ID_LABEL, new_id)
            // .then(() => console.log("Device ID: ", new_id))
            .catch(error => console.log("Error saving data:", error));
        } else {
          // console.log("Device ID: ", id);
          this.props.setDeviceId(id);
        }
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });

    // Retrieves the api token if one is available
    AsyncStorage.getItem(LitConstants.TOKEN_LABEL).then(token => {
      if (token !== null) {
        this.props.setToken(token);
        this.props.setView(Views.DEFAULT);
      } else {
        this.props.setView(Views.LOGIN);
      }
      console.log("[js] TOKEN:", token);
    });

    // Sets device location
    this.updateDeviceLocation(true);

    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    // Fetch device location in the background
    Location.startLocationUpdatesAsync(LitConstants.TASK_SET_DEVICE_LOCATION, {
      accuracy: Location.Accuracy.High
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  // TODO: Acording with the documentation, goBack should be async
  // https://facebook.github.io/react-native/docs/backhandler.html#docsNav
  goBack() {
    this.props.setView(View.MAP);
  }

  // Handles input when the back button is pressed (Android only)
  onBackPress() {
    if (this.onMainScreen()) {
      BackHandler.exitApp();
    } else {
      this.goBack();
    }
  }

  onMainScreen() {
    return this.props.view === View.MAP;
  }

  onMapLayout() {
    this.props.mapIsReady(true);
  }

  onMarkerPressed(name) {
    this.props.view(View.INFO);
    this.props.setInfo({ name: name });
  }

  updateDeviceLocation(fetchLocations = false) {
    this._getDeviceLocationAsync().then(region => {
      if (region) {
        const previousRegion = this.props.region;
        if (previousRegion !== region) {
          console.log("New region:", region);
          console.log(region);
          this.props.setRegion(region);
          if (fetchLocations) {
            this.updatePlaces();
          }
        }
      }
    });
  }

  updatePlaces(radius = 10000) {
    const lat = this.props.region.lat;
    const lng = this.props.region.lng;
    litApi
      .getLocations(lat, lng, radius)
      .then(places => this.props.setPlaces(places.result))
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  render() {
    // Asumes that having a token is the same that bein logged.
    if (this.props.view === Views.MAP) {
      let { region, places } = this.props;
      let regionLatLng = {
        latitude: region.lat,
        longitude: region.lng,
        latitudeDelta: region.latDelta,
        longitudeDelta: region.lngDelta
      };

      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          <MapView
            region={regionLatLng}
            style={{
              flex: 1,
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0
            }}
            customMapStyle={litMapStyle}
            provider={PROVIDER_GOOGLE}
          >
            <LitMarkers places={places} />
            <Marker coordinate={regionLatLng} title="user">
              <UserMarkerIcon />
            </Marker>
          </MapView>

          <FlatList
            horizontal={true}
            data={places}
            renderItem={({ item }) => (
              <PlaceCard
                key={item.id}
                placeName={item.name}
                placeAddress="123 F. Street chicago, IL"
                placeDistance="4m away"
                litScore={item.litness}
                onPress={() => console.log("pressed!")}
              />
            )}
          />
        </View>
      );
    } else if (this.props.view === Views.LOGIN) {
      return <LoginScreen callback={this._loginWithInstagram} />;
    }
    return <LoadingScreen />;
  }

  static get propTypes() {
    return {
      places: PropTypes.array,
      mapIsReady: PropTypes.func,
      region: PropTypes.object,
      setDeviceId: PropTypes.func,
      setInfo: PropTypes.func,
      setPlaces: PropTypes.func,
      setRegion: PropTypes.func,
      setToken: PropTypes.func,
      setView: PropTypes.func,
      token: PropTypes.string,
      view: PropTypes.string
    };
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  col: {
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

// eslint-disable-next-line no-unused-vars
const Lit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedApp);

const App = () => (
  <Provider store={store}>
    <Lit />
  </Provider>
);

export default App;
