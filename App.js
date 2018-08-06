import { Constants, Location, MapView, Permissions } from 'expo';
import React from 'react';
import { Platform } from 'react-native'
import { connect, Provider } from 'react-redux'

import { setRegion } from './app/actions/actions'
import store from './app/stores/store'


const mapStateToProps = state => state


const mapDispatchToProps = dispatch => ({
    setRegion: region => dispatch(setRegion(region))
})


class ConnectedApp extends React.Component {

    constructor (props) {
        super(props)
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

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission denied'
            })
        }

        const location = await Location.getCurrentPositionAsync()
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        this.props.setRegion(region)
    }

    render() {
        return (
            <MapView
                style={{ flex: 1}}
                region={this.props.region}
                minZoomLevel={15}
            />
        );
    }
}


const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp)


export default () => (
    <Provider store={store}>
        <App/>
    </Provider>
)
