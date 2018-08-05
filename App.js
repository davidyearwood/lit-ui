import React from 'react';
import { Platform } from 'react-native'
import { Constants, Location, MapView, Permissions } from 'expo';

export default class App extends React.Component {

    constructor () {
        super()
        this.state = {
            location: {
                coords: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                }
            },
            errorMessage: null,
        }
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

        let location = await Location.getCurrentPositionAsync()
        this.setState({location: location })
    }

    render() {
        const location = this.state.location
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
