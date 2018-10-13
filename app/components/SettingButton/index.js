import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


function SettingButton(props) {
    return (
        <TouchableOpacity style={[SettingButtonStyles.round, props.styles]}>
            <Ionicons name="md-menu" size={22} color="#333333" />
        </TouchableOpacity>
    ); 
}

const SettingButtonStyles = StyleSheet.create({
    round: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 35, 
        width: 35,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: .75,
        shadowRadius: 7.65,
        elevation: 5,
    }
});

export default SettingButton; 
