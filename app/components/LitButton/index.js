import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

function LitButton(props) {
  return (
    <TouchableOpacity style={[styles.button, props.styles]} onPress={props.onPress}>
      <Text style={styles.buttonText}>
        {props.text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EA4D4D',
    borderRadius: 2,
    shadowColor: "#000000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: .75,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
  }, 
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
  }
});

export default LitButton;