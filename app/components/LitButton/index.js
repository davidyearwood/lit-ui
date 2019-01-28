/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import MarkerIcon from "../SVG/MarkerIcon";

function LitButton(props) {
  return (
    <TouchableOpacity
      style={[styles.button, props.styles]}
      onPress={props.onPress}
    >
      <MarkerIcon fill="#fff" width="15" height="15" />
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#AD4545",
    borderRadius: 4,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    elevation: 4,
    padding: 8.88,
    width: 110,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 8.88
  }
});

export default LitButton;
