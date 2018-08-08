import React from 'react'
import { MapView } from 'expo'
import LitMarker from './litMarker'


const { Marker } = MapView;


export default ({ region, places, onMarkerPressed }) => (
    <MapView
        style={{ flex: 1}}
        region={region}
        minZoomLevel={15}
    >
        {
            places.map (
                (place, index) => (
                    <Marker
                        key={"marker-" + index}
                        coordinate={place.location}
                        title={place.title}
                        onPress={ () => {
                            // for some reason, when onMarkerPressed is passed directly to onPress
                            // (e.g onPress={onMarkerPressed}), onMarkerPressed is called when Marker is created
                            onMarkerPressed(place.map);
                        }}
                    >
                        <LitMarker litness={place.litness}/>
                    </Marker>
                )
            )
        }
    </MapView>
)