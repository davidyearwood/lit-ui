import { Constants, Location, Permissions } from 'expo';
import React from 'react';
import { BackHandler, Platform } from 'react-native';
import { connect, Provider } from 'react-redux';

import { changeView, setRegion } from './app/actions/actions';
import InfoView from './app/components/infoView';
import LitMapView from './app/components/litMapView';
import ViewMode from './app/constants/viewMode';
import store from './app/stores/store';


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
    changeView: viewMode => dispatch(changeView(viewMode)),
    setRegion: region => dispatch(setRegion(region))
});


class ConnectedApp extends React.Component {

    constructor (props) {
        super(props);

        this.onMainScreen = this.onMainScreen.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.onMarkerPressed = this.onMarkerPressed.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    // Don't delete this function, will be useful in the future.
    //
    // componentWillMount () {
    //     if (Platform.OS === 'android' && !Constants.isDevice) {
    //         this.setState({
    //             errorMessage: 'Oops, this will not work'
    //         })
    //     }
    //     else {
    //         this._getLocationAsync()
    //     }
    // }

    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission denied'
            });
        }

        const location = await Location.getCurrentPositionAsync();
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };
        this.props.setRegion(region);
    };

    // Handles input when the back button is pressed (Android only)
    onBackPress () {
        if (this.onMainScreen()) {
            BackHandler.exitApp();
        }
        else {
            this.goBack();
        }
    }

    onMainScreen () {
        return this.props.viewMode === ViewMode.MAP
    }

    onMarkerPressed () {
        this.props.changeView(ViewMode.INFO)
    }

    // TODO: Acording with the documentation, goBack should be async
    // https://facebook.github.io/react-native/docs/backhandler.html#docsNav
    goBack () {
        this.props.changeView(ViewMode.MAP)
    }

    render() {
        if (this.props.viewMode === ViewMode.MAP) {
            return <LitMapView
                onMarkerPressed={this.onMarkerPressed}
                places={this.props.places}
                region={this.props.region}
            />
        }
        else {
            return <InfoView name={this.props.info.name}/>
        }
    }
}


const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);


export default () => (
    <Provider store={store}>
        <App/>
    </Provider>
);
