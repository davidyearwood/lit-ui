/* eslint-disable no-console  */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  Constants,
  Linking,
  Location,
  Permissions,
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
  Text
} from "react-native";
import { connect, Provider } from "react-redux";
import uuidv4 from "uuid/v4";
import {
  changeView,
  mapIsReady,
  setDeviceId,
  setInfo,
  setRegion,
  setPlaces,
  setError
} from "./app/actions/actions";
import litApi from "./app/api/api";
import SearchBar from "./app/components/SearchBar";
import litMapStyle from "./app/components/LitMap/litMapStyle";
import LitMapView from "./app/components/litMapView";
import LitMarkers from "./app/components/LitMarker/LitMarkers";
import LoginScreen from "./app/components/LoginScreen";
import SearchResult from "./app/components/SearchResult";
import SettingButton from "./app/components/SettingButton";
import UserMarkerIcon from "./app/components/SVG/UserMarkerIcon";
import LitConstants from "./app/constants/lit";
import ViewMode from "./app/constants/viewMode";
import { INSTAGRAM_ID } from "./credentials";
import store from "./app/stores/store";

TaskManager.defineTask(
  LitConstants.TASK_SET_DEVICE_LOCATION,
  ({ data, error }) => {
    if (error) {
      console.log("[js] TaskManager error:", error);
    }
    if (data) {
      // AsyncStorage.getItem(LitConstants.DEVICE_ID_LABEL).then(id => {
      //   litApi
      //     .setDeviceLocation(id, "ChIJUcXdzOr_0YURd95z59ZBAYc")
      //     .then(response => {
      //       // Do something with the response
      //     })
      //     .catch(error => {
      //       console.log('[js] Unable to set location:', error);
      //     });
      // });
      console.log("[js] TaskManager", data);
    }
  }
);

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  changeView: viewMode => dispatch(changeView(viewMode)),
  mapIsReady: ready => dispatch(mapIsReady(ready)),
  setDeviceId: id => dispatch(setDeviceId(id)),
  setInfo: info => dispatch(setInfo(info)),
  setRegion: region => dispatch(setRegion(region)),
  setPlaces: places => dispatch(setPlaces(places))
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

  _handleLogin(event) {
    WebBrowser.dismissBrowser();
    const data = Linking.parse(event.url);
    console.log(data);
  }

  _addLoginListener() {
    Linking.addEventListener(
      Linking.makeUrl(LitConstants.INSTAGRAM_DEEP_LINK),
      this._handleLogin
    );
  }

  _removeLoginListener() {
    Linking.removeEventListener(
      Linking.makeUrl(LitConstants.INSTAGRAM_DEEP_LINK),
      this._handleLogin
    );
  }

  async _loginWithInstagram() {
    try {
      this._addLoginListener();
      const deep_link = Linking.makeUrl(LitConstants.INSTAGRAM_DEEP_LINK);
      const result = await WebBrowser.openAuthSessionAsync(
        `https://api.instagram.com/oauth/authorize/` +
          `?client_id=${INSTAGRAM_ID}` +
          `&redirect_uri=${encodeURIComponent(LitConstants.REDIRECT_URL)}` +
          `&response_type=code` +
          `&state={deep_link}`,
        Linking.makeUrl("login/instagram")
      );
      this._removeLoginListener();
      console.log(result);
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
    this.props.changeView(ViewMode.MAP);
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
    return this.props.viewMode === ViewMode.MAP;
  }

  onMapLayout() {
    this.props.mapIsReady(true);
  }

  onMarkerPressed(name) {
    this.props.changeView(ViewMode.INFO);
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
    return <LoginScreen callback={this._loginWithInstagram} />;
  }

  static get propTypes() {
    return {
      changeView: PropTypes.func,
      mapIsReady: PropTypes.func,
      region: PropTypes.object,
      setDeviceId: PropTypes.func,
      setInfo: PropTypes.func,
      setPlaces: PropTypes.func,
      setRegion: PropTypes.func,
      viewMode: PropTypes.string
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
    <App />
  </Provider>
);

export default App;
