/* eslint-disable no-unused-vars */
import React from "react";
import { Marker, Callout } from "react-native-maps";
import MarkerIcon from "../SVG/MarkerIcon";
import ToolTip from "../ToolTip";
import PropTypes from "prop-types";

function LitMarker({ LatLng, title, litness, fill, onPressCallout, ...attr }) {
  return (
    <Marker coordinate={LatLng} title={title} {...attr}>
      <MarkerIcon fill={fill} />
      <Callout tooltip={true} onPress={onPressCallout}>
        <ToolTip litness={litness} />
      </Callout>
    </Marker>
  );
}

LitMarker.propTypes = {
  LatLng: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  litness: PropTypes.number.isRequired,
  fill: PropTypes.string,
  onPressCallout: PropTypes.func
};
export default LitMarker;
