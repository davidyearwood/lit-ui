import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./badgeStyles";

function Badge({ total }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{total}</Text>
    </View>
  );
}

Badge.propTypes = {
  total: PropTypes.number.isRequired
};

export default Badge;
