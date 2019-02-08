import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import styles from "./commentStyles";

function Comment({ comment, date }) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.comment}>{comment}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

Comment.propTypes = {
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

export default Comment;
