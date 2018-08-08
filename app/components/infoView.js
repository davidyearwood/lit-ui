import React from 'react'
import { Button, Text, View } from 'react-native'


export default ({ name, callback }) => {

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
            <Text>{name}</Text>
        </View>
    )
};