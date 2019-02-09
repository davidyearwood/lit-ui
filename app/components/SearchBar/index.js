import { Ionicons } from "@expo/vector-icons";
import { Constants } from "expo";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this._onSearch = this._onSearch.bind(this);
  }

  _onSearch(event) {
    const text = event.nativeEvent.text;
    this.props.onSearch(text);
  }

  render() {
    return (
      <View style={searchBarStyles.container}>
        <Ionicons name="md-search" size={25} color="#333333" />
        <TextInput
          style={searchBarStyles.searchBar}
          placeholder="Try getting lit somewhere else?"
          onSubmitEditing={this._onSearch}
        />
      </View>
    );
  }
}

SearchBar.propTypes = {
  // Called when a new search is submitted. Passes submitted string to onSearch
  onSearch: PropTypes.func.required
};

const searchBarStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    elevation: 5,
    flexDirection: "row",
    height: 37,
    left: "5%",
    position: "absolute",
    paddingBottom: 7,
    paddingLeft: 10,
    paddingTop: 7,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.75,
    shadowRadius: 7.65,
    top: Constants.statusBarHeight + 10,
    width: "90%"
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    fontSize: 16,
    paddingLeft: 10
  }
});

export default SearchBar;
