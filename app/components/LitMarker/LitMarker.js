/* eslint-disable no-unused-vars */
import React from "react";
import { Marker, Callout } from "react-native-maps";
import MarkerIcon from "../SVG/MarkerIcon";
import ToolTip from "../ToolTip";

function LitMarker({ LatLng, title, litness, ...attr }) {
  return (
    <Marker coordinate={LatLng} title={title} {...attr}>
      <MarkerIcon />
      <Callout tooltip={true}>
        <ToolTip litness={litness} />
      </Callout>
    </Marker>
  );
}

export default LitMarker;
