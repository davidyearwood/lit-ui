/* eslint-disable no-unused-vars */
import React from "react";
import FireIcon from "../SVG/FireIcon";
import { Text, View, StyleSheet } from "react-native";
import LitButton from "../LitButton";

function PlaceCard(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <View style={styles.placeCard}>
        <Text style={styles.placeName}>{props.placeName}</Text>
        <View style={[styles.placeRow, styles.centerHor]}>
          <FireIcon />
          <Text style={[styles.text, { marginLeft: 8.88 }]}>
            {props.litScore}
          </Text>
        </View>
        <View style={styles.placeRow}>
          <Text style={[styles.text, { marginRight: 8.88 }]}>
            {props.placeAddress}
          </Text>
          <Text style={styles.text}>{props.placeDistance}</Text>
        </View>
        <LitButton text="Check-in" />
      </View>
    </View>
  );
}

const placeCard = {
  height: 160,
  backgroundColor: "#202020",
  flexDirection: "column",
  width: 335,
  marginBottom: 50,
  padding: 15,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 1,
  shadowRadius: 5,
  elevation: 4,
  borderRadius: 4,
  marginRight: 12.64,
  marginLeft: 12.64
};

const placeName = {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: 20.25
};

const text = {
  color: "#ffffff",
  fontSize: 16
};

const row = {
  flexDirection: "row",
  flex: 1
};

const centerHor = {
  alignItems: "center"
};

const styles = StyleSheet.create({
  placeCard: placeCard,
  placeName: placeName,
  placeRow: row,
  text: text,
  centerHor: centerHor
});

export default PlaceCard;
