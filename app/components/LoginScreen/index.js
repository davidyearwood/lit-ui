import PropTypes from "prop-types";
import React from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground
} from "react-native";
import InstagramLoginButton from "../InstagramLoginButton";
import Logo from "../SVG/Logo";

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 19,
    marginTop: 16
  },
  view: {
    alignItems: "center",
    backgroundColor: "#c64347",
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  logoContainer: {
    justifyContent: "center",
    marginTop: height * 0.3
  },
  centerBlock: {
    marginLeft: "auto",
    marginRight: "auto"
  },
  bottom: {
    position: "absolute",
    bottom: height * 0.1
  }
});

const LoginScreen = props => (
  <ImageBackground style={styles.view} source={require("./partyImage.jpg")}>
    <View
      style={{
        backgroundColor: "rgba(198, 67, 71, .4)",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }}
    />
    <View style={styles.logoContainer}>
      <Logo styles={styles.centerBlock} />
      <Text style={styles.text}>Let’s get this party started.</Text>
    </View>
    <InstagramLoginButton
      onPress={props.callback}
      customStyles={styles.bottom}
    />
  </ImageBackground>
);

LoginScreen.propTypes = {
  callback: PropTypes.func.isRequired
};

export default LoginScreen;
