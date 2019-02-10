import React, { Component } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import Logo from "../SVG/Logo.js";
import { randomQuote } from "./phrases.js";

const { width } = Dimensions.get("window");

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
  quoteStyle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "normal",
    marginTop: 30,
    textAlign: "center",
    width: width * 0.8
  },
  authorStyle: {
    color: "#fff",
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 15,
    textAlign: "right",
    width: width * 0.8
  }
});

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: randomQuote()
    };
  }

  componentDidMount() {
    this.randomQuoteTimer = setInterval(
      () => this.setState({ text: randomQuote() }),
      5000
    );
  }

  componentWillUnmount() {
    clearTimeout(this.randomQuoteTimer);
  }
  render() {
    const { quote, author } = this.state.text;
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size={80} color="#fff" />
        <Text style={styles.quoteStyle}>{quote}</Text>
        {author && <Text style={styles.authorStyle}>- {author}</Text>}
        <View style={styles.logo}>
          <Logo height={60} width={60} />
        </View>
      </View>
    );
  }
}

export default LoadingScreen;
