import { StyleSheet, Dimensions } from "react-native";

let { height, width } = Dimensions.get("window");

const commentContainer = {
  width: width * 0.8,
  height: height * 0.2,
  backgroundColor: "#262626",
  flexDirection: "column",
  padding: 30,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 4,
  marginHorizontal: 12.64
};

const comment = {
  color: "#ffffff",
  marginBottom: "auto",
  fontSize: 16
};

const date = {
  color: "#cccccc",
  fontSize: 12.64
};

export default StyleSheet.create({ commentContainer, comment, date });
