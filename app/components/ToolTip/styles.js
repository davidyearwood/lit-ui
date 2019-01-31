import { StyleSheet } from "react-native";
const $bgColor = "#AD4545";
export const $width = 65;
export const $height = 30;
const $fs = 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    width: $width,
    height: $height,
    backgroundColor: $bgColor,
    flexDirection: "row",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  text: {
    fontSize: $fs,
    color: "#ffffff",
    fontWeight: "bold"
  }
});
