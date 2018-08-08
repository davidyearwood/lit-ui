import React from 'react'
import { MapView } from 'expo'
import LitMarker from './litMarker'


const { Marker } = MapView;


export default ({ region, places }) => (
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
                        onPress={null}
                    >
                        <LitMarker litness={place.litness}/>
                    </Marker>
                )
            )
        }
    </MapView>
)