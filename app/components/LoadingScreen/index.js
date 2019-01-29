import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  loadingScreen: {
    alignItems: "center",
    backgroundColor: "#c64347",
    flex: 1,
    justifyContent: "center",
    marginTop: StatusBar.currentHeight
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

const LoadingScreen = () => (
  <View style={styles.loadingScreen}>
    <Text style={styles.text}>Loading</Text>
  </View>
);

export default LoadingScreen;
