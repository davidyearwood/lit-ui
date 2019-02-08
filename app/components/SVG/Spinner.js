import React from "react";
import PropTypes from "prop-types";
import { Svg } from "expo";

const { Path } = Svg;

const Spinner = ({ fill, height, width }) => (
  <Svg
    fill="none"
    height={height}
    viewBox="0 0 512 512"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48 21.49-48 48-48 48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48 48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.491-48-48-48z"
      fill={fill}
    />
  </Svg>
);

Spinner.defaultProps = {
  fill: "#fff",
  height: 50,
  width: 50
};

Spinner.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

export default Spinner;
