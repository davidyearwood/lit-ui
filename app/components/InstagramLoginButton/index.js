import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text } from "react-native";
import InstagramIcon from "../SVG/InstagramIcon";
import { LinearGradient } from "expo";
import styles from "./instagramStyles";

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
