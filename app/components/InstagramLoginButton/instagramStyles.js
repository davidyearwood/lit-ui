import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.0949625187,
    shadowColor: "#323232",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 2
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 4,
    padding: 15
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 22
  }
});

export default styles;
