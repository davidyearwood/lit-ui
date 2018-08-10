import PropTypes from 'prop-types'
import React from 'react'
import { Button, Text, View } from 'react-native'


const InfoView = (props) => {

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Button
                onPress={ () => {
                    props.backCallback()
                }}
                title="< back"
            />
            <Text>{props.info.name}</Text>
        </View>
    )
};


InfoView.propTypes = {
    // Callback that is called when the view's back buttons is pressed.
    backCallback: PropTypes.func.isRequired,
    // Object that contains all the data about a place.
    info: PropTypes.object.isRequired,
};


export default InfoView