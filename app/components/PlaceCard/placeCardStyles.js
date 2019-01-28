import { StyleSheet } from "react-native";

const $textColor = "#ffffff";

const placeCard = {
  height: 120,
  backgroundColor: "#202020",
  flexDirection: "column",
  width: 911
};

const placeName = {
  color: $textColor,
  fontWeight: "500",
  fontSize: 17
};

const text = {
  color: $textColor,
  fontSize: 12
};

const row = {
  flexDirection: "row",
  flex: 1
};

const styles = StyleSheet.create({
  placeCard: placeCard,
  placeName: placeName,
  row: row,
  text: text
});

export default styles;
