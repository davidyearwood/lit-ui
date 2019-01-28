import PropTypes from "prop-types";
import React from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  view: {
    alignItems: "center",
    backgroundColor: "#c64347",
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight
  }
});

const LoginScreen = props => (
  <View style={styles.view}>
    <Text style={styles.text}>Login with Instagram</Text>
    <Button onPress={props.callback} title="Log in" />
  </View>
);

LoginScreen.propTypes = {
  callback: PropTypes.func.isRequired
};

export default LoginScreen;
