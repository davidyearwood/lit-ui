import React from 'react'
import { Button, Text, View } from 'react-native'


export default ({ info, callback }) => {

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Button
                onPress={ () => {
                    callback()
                }}
                title="< back"
            />
            <Text>{info.name}</Text>
        </View>
    )
};