import { Constants, Location, MapView, Permissions } from 'expo';
import React from 'react';
import { Platform } from 'react-native'
import { connect, Provider } from 'react-redux'

import { setLocation } from './app/actions/actions'
import store from './app/stores/store'


const mapStateToProps = state => state


const mapDispatchToProps = dispatch => ({
    setLocation: location => dispatch(setLocation(location))
})


class ConnectedApp extends React.Component {

    constructor (props) {
        super(props)
    }

    componentWillMount () {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work'
            })
        }
        else {
            this._getLocationAsync()
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION)

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission denied'
            })
        }

        const location = await Location.getCurrentPositionAsync()
        this.props.setLocation(location)
    }

    render() {
        const location = this.props.location
        console.log(location)
        return (
            <MapView
                style={{ flex: 1}}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
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
