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
  FlatList,
  Dimensions,
  Animated
} from "react-native";
import {
  Marker,
  PROVIDER_GOOGLE,
  Animated as AnimatedMap,
  AnimatedRegion
} from "react-native-maps";
import { connect, Provider } from "react-redux";
import uuidv4 from "uuid/v4";
import {
  mapIsReady,
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
import LitMarker from "./app/components/LitMarker/LitMarker";
import LitMapView from "./app/components/litMapView";
import LoadingScreen from "./app/components/LoadingScreen";
import LoginScreen from "./app/components/LoginScreen";
import PlaceCard from "./app/components/PlaceCard";
import SCearchBar from "./app/components/SearchBar";
import SearchResult from "./app/components/SearchResult";
import SettingButton from "./app/components/SettingButton";
import UserMarkerIcon from "./app/components/SVG/UserMarkerIcon";
import store from "./app/stores";
import { INSTAGRAM_ID } from "./credentials";

const { height, width } = Dimensions.get("window");
const PLACE_CARD_WIDTH = width * 0.9 + 30;
// TaskManager.defineTask(
//   LitConstants.TASK_SET_DEVICE_LOCATION,

//   ({ data, error }) => {
//     if (error) {
//       console.log("[js] TaskManager error:", error);
//     }
//     if (data) {
//       // NOTE - Code commented because the API changed
//       // const device_id = Constants.installationId;
//       // litApi
//       //   .setDeviceLocation(id, "ChIJUcXdzOr_0YURd95z59ZBAYc")
//       //   .then(response => {
//       //     // Do something with the response
//       //   })
//       //   .catch(error => {
//       //     console.log("[js] Unable to set location:", error);
//       //   });
//       console.log("[js] TaskManager", data);
//     }
//   }
// );

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  mapIsReady: ready => dispatch(mapIsReady(ready)),
  setInfo: info => dispatch(setInfo(info)),
  setPlaces: places => dispatch(setPlaces(places)),
  setRegion: region => dispatch(setRegion(region)),
  setToken: token => dispatch(setToken(token)),
  setView: view => dispatch(setView(view))
});

class ConnectedApp extends React.Component {
  constructor(props) {
    super(props);

    this.index = 0;
    this.animation = new Animated.Value(0);

    this.goBack = this.goBack.bind(this);
    this.onBackPress = this.onBackPress.bind(this);
    this.onMainScreen = this.onMainScreen.bind(this);
    this.onMapLayout = this.onMapLayout.bind(this);
    this.onMarkerPressed = this.onMarkerPressed.bind(this);
    this.updateDeviceLocation = this.updateDeviceLocation.bind(this);
    this.updatePlaces = this.updatePlaces.bind(this);
    this._loginWithInstagram = this._loginWithInstagram.bind(this);
    this._initServices = this._initServices.bind(this);
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

  _initServices() {
    // Sets device location
    this.updateDeviceLocation(true);

    // Fetch device location in the background
    Location.startLocationUpdatesAsync(LitConstants.TASK_SET_DEVICE_LOCATION, {
      accuracy: Location.Accuracy.High
    });
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
              this._initServices();
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
    // Unique device id
    console.log("[js] Installation ID:", Constants.installationId);

    // Retrieves the api token if one is available
    // Asumes that having a token is the same that bein logged.
    AsyncStorage.getItem(LitConstants.TOKEN_LABEL).then(token => {
      if (token !== null) {
        this.props.setToken(token);
        this.props.setView(Views.DEFAULT);
        this._initServices();
      } else {
        this.props.setView(Views.LOGIN);
      }
      console.log("[js] TOKEN:", token);
    });

    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / PLACE_CARD_WIDTH);
      const { places } = this.props;

      if (index >= places.length) {
        index = places.lenght - 1;
      }

      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { lat, lng } = places[index].location;
          this.map.animateToRegion(
            {
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            },
            350
          );
        }
      }, 10);
    });

    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    this.animation.removeAllListeners();
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
    this.props.setInfo({ name });
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
    const { lat, lng } = this.props;

    litApi
      .getLocations(lat, lng, radius)
      .then(places => this.props.setPlaces(places.result))
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }

  render() {
    // if (this.props.view === Views.MAP) {
    let { region, places } = this.props;

    let regionLatLng = {
      latitude: region.lat,
      longitude: region.lng,
      latitudeDelta: region.latDelta,
      longitudeDelta: region.lngDelta
    };

    const interpolations = places.map((place, index) => {
      const inputRange = [
        (index - 1) * PLACE_CARD_WIDTH,
        index * PLACE_CARD_WIDTH,
        (index + 1) * PLACE_CARD_WIDTH
      ];
      const fill = this.animation.interpolate({
        inputRange,
        outputRange: ["#FFA183", "#AD4545", "#FFA183"],
        extrapolate: "clamp"
      });

      return { fill };
    });

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <MapView
          initialRegion={regionLatLng}
          style={{
            flex: 1,
            flexDirection: "column"
          }}
          customMapStyle={litMapStyle}
          provider={PROVIDER_GOOGLE}
          ref={map => (this.map = map)}
        >
          {places.map((place, index) => {
            let latLng = {
              latitude: place.location.lat,
              longitude: place.location.lng
            };

            return (
              <LitMarker
                coordinate={latLng}
                title={place.name}
                litness={place.litness}
                key={place.id}
                onPressCallout={() => {
                  console.log(this.animation);
                  console.log(interpolations[index].fill);
                }}
              />
            );
          })}
          <Marker coordinate={regionLatLng} title="user">
            <UserMarkerIcon />
          </Marker>
        </MapView>
        <Animated.ScrollView
          horizontal={true}
          snapToInterval={PLACE_CARD_WIDTH}
          snapToAlignment="end"
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          snapToOffsets={places.map((place, index) => index * PLACE_CARD_WIDTH)}
          decelerationRate="fast"
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          {places.map((item, index) => {
            return (
              <PlaceCard
                key={item.id}
                placeName={item.name}
                placeAddress="123 F. Street chicago, IL"
                placeDistance="4m away"
                litScore={item.litness}
                onPress={() => console.log("pressed!")}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
    );
    //   } else if (this.props.view === Views.LOGIN) {
    //     return <LoginScreen callback={this._loginWithInstagram} />;
    //   }
    //   return <LoadingScreen />;
    // }
  }
  static get propTypes() {
    return {
      places: PropTypes.array,
      mapIsReady: PropTypes.func,
      region: PropTypes.object,
      setInfo: PropTypes.func,
      setPlaces: PropTypes.func,
      setRegion: PropTypes.func,
      setToken: PropTypes.func,
      setView: PropTypes.func,
      token: PropTypes.string,
      view: PropTypes.string,
      lat: PropTypes.number,
      lng: PropTypes.number
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
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0
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
