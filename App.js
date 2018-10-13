import { Constants, Location, Permissions } from 'expo';
import React from 'react';
import { BackHandler, Platform, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect, Provider } from 'react-redux';
import { Button } from 'react-native'; 
import { changeView, mapIsReady, setInfo, setRegion } from './app/actions/actions';
import InfoView from './app/components/infoView';
import LitMapView from './app/components/litMapView';
import ViewMode from './app/constants/viewMode';
import store from './app/stores/store';
import SearchResult from './app/components/SearchResult';


const mapStateToProps = state => state;


const mapDispatchToProps = dispatch => ({
    changeView: viewMode => dispatch(changeView(viewMode)),
    mapIsReady: ready => dispatch(mapIsReady(ready)),
    setInfo: info => dispatch(setInfo(info)),
    setRegion: region => dispatch(setRegion(region)),
});

const SearchResults = props => {
    const results = props.searchResult.map((result) => {
        <SearchResult />
    });
    return (
        <View> 
            {results}
        </View>
    );
}


// checkedInCount
// imageSource
// title



class ConnectedApp extends React.Component {

    constructor (props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.onBackPress = this.onBackPress.bind(this);
        this.onMainScreen = this.onMainScreen.bind(this);
        this.onMapLayout = this.onMapLayout.bind(this);
        this.onMarkerPressed = this.onMarkerPressed.bind(this);
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

    // TODO: Change status for props
    getLocationAsync = async () => {
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

    // TODO: Acording with the documentation, goBack should be async
    // https://facebook.github.io/react-native/docs/backhandler.html#docsNav
    goBack () {
        this.props.changeView(ViewMode.MAP)
    }

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

    onMapLayout () {
        this.props.mapIsReady(true);
    }

    onMarkerPressed (name) {
        this.props.changeView(ViewMode.INFO);
        this.props.setInfo({name: name});
    }

    // TODO: The status bar overlaps the app, a horizontal bar must be added.
    render() {
        return(
            <View
                style={{
                    flex: 1,
                    paddingTop: Constants.statusBarHeight,
                    backgroundColor: "#474949"
                }}
            >
            <SearchResult 
                title="Slippery Effin Slope"
                litness="3"
                source={require("./concrete.jpg")}
            />

                {/* {
                    this.props.viewMode === ViewMode.MAP ?
                        <LitMapView
                            ready={this.props.isMapReady}
                            onLayout={this.onMapLayout}
                            onMarkerPressed={this.onMarkerPressed}
                            places={this.props.places}
                            region={this.props.region}
                            style={{
                                flex: 1
                            }}
                        />
                    :
                        <InfoView info={this.props.info} backCallback={this.goBack} />
                } */}

            </View>
        )
        // if (this.props.viewMode === ViewMode.MAP) {
        //     return <LitMapView
        //         onMarkerPressed={this.onMarkerPressed}
        //         places={this.props.places}
        //         region={this.props.region}
        //     />
        // }
        // else {
        //     return <InfoView name={this.props.info.name} callback={this.goBack}/>
        // }
    }
}


const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);


export default () => (
    <Provider store={store}>
        <App/>
    </Provider>
);
