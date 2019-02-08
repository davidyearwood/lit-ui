import React from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import Logo from "../SVG/Logo.js";

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    backgroundColor: "#c64347",
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight
  },
  logo: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    width: 60
  },
  spinnerContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 30,
    textAlign: "center"
  }
});

const LoadingScreen = () => (
  <View style={styles.loadingScreen}>
    <ActivityIndicator size={80} color="#fff" />
    <Text style={styles.text}>
      Good parties create a temporary youthfulness
    </Text>
    <View style={styles.logo}>
      <Logo height={60} width={60} />
    </View>
  </View>
);

export default LoadingScreen;
