/* eslint-disable no-unused-vars */
import React from "react";
import { Svg } from "expo";
import PropTypes from "prop-types";

function MarkerIcon(props) {
  const { Path } = Svg;

  return (
    <Svg
      width={props.width}
      height={props.height}
      viewBox="0 0 25 36"
      fill="none"
      xmlns="http://www.w3.org/2000/Svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.2822 0.490479C5.74966 0.490479 0.450928 5.96181 0.450928 12.7072C0.450928 21.8697 12.2822 35.3953 12.2822 35.3953C12.2822 35.3953 24.1135 21.8697 24.1135 12.7072C24.1135 5.96181 18.8148 0.490479 12.2822 0.490479ZM12.2822 17.0703C9.94977 17.0703 8.05676 15.1156 8.05676 12.7072C8.05676 10.2987 9.94977 8.34406 12.2822 8.34406C14.6147 8.34406 16.5077 10.2987 16.5077 12.7072C16.5077 15.1156 14.6147 17.0703 12.2822 17.0703Z"
        fill={props.fill}
      />
    </Svg>
  );
}

MarkerIcon.defaultProps = {
  fill: "#FFA183",
  width: "25",
  height: "36"
};

export default MarkerIcon;
