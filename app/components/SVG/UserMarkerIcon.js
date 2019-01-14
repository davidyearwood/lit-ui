/* eslint-disable no-unused-vars */
import React from "react";
import { Svg } from "expo";
import PropTypes from "prop-types";

function UserMarkerIcon() {
  const { Path } = Svg;

  return (
    <Svg width="15" height="15" fill="none" xmlns="http://www.w3.org/2000/Svg">
      <Path
        d="M7.5.234A7.264 7.264 0 0 0 .234 7.5 7.264 7.264 0 0 0 7.5 14.766 7.264 7.264 0 0 0 14.766 7.5 7.264 7.264 0 0 0 7.5.234z"
        fill="#74BFFF"
      />
    </Svg>
  );
}

export default UserMarkerIcon;
