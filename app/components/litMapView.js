import { MapView } from "expo";
import PropTypes from "prop-types";
import React from "react";
import LitMarker from "./litMarker";

const { Marker } = MapView;

const LitMapView = props => (
  <MapView
    style={{ flex: 1 }}
    region={props.region}
    minZoomLevel={15}
    onLayout={props.onLayout}
  >
    {props.ready &&
      props.places.map((place, index) => (
        <Marker
          key={"marker-" + index}
          coordinate={place.location}
          title={place.title}
          onPress={() => {
            // for some reason, when onMarkerPressed is passed directly to onPress
            // (e.g onPress={onMarkerPressed}), onMarkerPressed is called when Marker is created
            props.onMarkerPressed(place.name);
          }}
        >
          <LitMarker litness={place.litness} />
        </Marker>
      ))}
  </MapView>
);

LitMapView.propTypes = {
  // Callback called after MapView is mounted.
  onLayout: PropTypes.func.isRequired,
  // Callback called after a markers is pressed
  onMarkerPressed: PropTypes.func.isRequired,
  // Array that contains the locations of all markers to be rendered.
  places: PropTypes.array.isRequired,
  // After MapView is mounted, 'ready' should be set to true in order to render the markers. See 'onLayout'.
  ready: PropTypes.bool.isRequired,
  // The region where the map is rendered
  region: PropTypes.object.isRequired
};

export default LitMapView;
