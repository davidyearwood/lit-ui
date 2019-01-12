/* eslint-disable no-unused-vars */
import React from "react";
import { Marker } from "react-native-maps";
import MarkerIcon from "../SVG/MarkerIcon";

function LitMarker({ LatLng, title, ...attr }) {
  return (
    <Marker coordinate={LatLng} title={title} {...attr}>
      <MarkerIcon />
    </Marker>
  );
}

export default LitMarker;
