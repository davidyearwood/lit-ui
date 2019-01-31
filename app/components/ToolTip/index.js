/* eslint-disable no-unused-vars */

import React from "react";
import FireIcon from "../SVG/FireIcon";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

function ToolTip({ litness }) {
  return (
    <View style={styles.container}>
      <FireIcon width={20} height={20} />
      <Text style={styles.text}>{litness}</Text>
    </View>
  );
}

ToolTip.propTypes = {
  litness: PropTypes.number.isRequired
};

export default ToolTip;
