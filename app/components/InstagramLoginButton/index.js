import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import InstagramIcon from "../SVG/InstagramIcon";
import { LinearGradient } from "expo";

const { height, width } = Dimensions.get("window");

function InstagramLoginButton({ iconHeight, iconWidth, iconFill, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={["rgb(56, 10, 115)", "rgb(160, 11, 143)", "rgb(214, 146, 60)"]}
        style={styles.button}
        start={[0.9, 0.5]}
        end={[0.1, 0.9]}
      >
        <InstagramIcon height={iconHeight} width={iconWidth} fill={iconFill} />
        <Text style={styles.text}>{"Continue with Instagram"}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.0949625187,
    shadowColor: "#000",
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

InstagramLoginButton.defaultProps = {
  iconFill: "#ffffff",
  iconHeight: 27,
  iconWidth: 27
};

InstagramLoginButton.propTypes = {
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
  iconFill: PropTypes.string,
  onPress: PropTypes.func
};

export default InstagramLoginButton;
