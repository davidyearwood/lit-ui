import PropTypes from 'prop-types'
import React from 'react'
import { Text, View } from 'react-native'


const LitMarker = (props) => {
    const style = {
        backgroundColor: "#FE5859",
        padding: 5,
        borderRadius: 5,
    };


    const styleText = {
        fontSize: 8 + props.litness,
    };

    const triangleShape = {
        backgroundColor: "#FE5859",
        width: 10,
        height: 10,
    };

    return (
        <View style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <View style={style}>
                <Text style={styleText}>
                    🔥 {props.litness}
                </Text>
            </View>
            <View style={triangleShape}/>
        </View>
    )
};


LitMarker.propTypes = {
    litness: PropTypes.number.isRequired,
};


export default LitMarker