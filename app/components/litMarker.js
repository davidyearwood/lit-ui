import React from 'react'
import { Text, View } from 'react-native'


export default ({ litness }) => {
    const style = {
        backgroundColor: "#FE5859",
        padding: 5,
        borderRadius: 5,
    };


    const styleText = {
        fontSize: 8 + litness,
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
                    🔥 {litness}
                </Text>
            </View>
            <View style={triangleShape}/>
        </View>
    )
};