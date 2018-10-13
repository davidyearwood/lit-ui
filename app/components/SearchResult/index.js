import React from 'react'; 
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import LitButton from '../LitButton';

function SearchResult(props) {
    return(
        <View style={styles.container}> 
            <Image 
                style={styles.image}
                source={props.source}
            />
            <View style={styles.col}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.iconText}>{props.litness} think this place is lit</Text>
                <LitButton text="Check In" styles={{marginTop: 'auto'}} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: '400',
        fontSize: 16 * 1.2
    },
    image: {
        width: 69,
        height: 90
    },
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        width: 272, 
        height: 110,
        marginLeft: 10,
        marginRight: 10
    },
    description: {
        fontSize: 16
    },
    iconText: {
        fontSize: 16 * 0.833,
        fontWeight: '300',
        marginTop: 5
    },
    icon: {
        height: 30, 
        width: 25,
        marginLeft: 7
    },
    col: {
        flexDirection: 'col',
    },
    round: {
        justifyContent: 'center',
        width: 40, 
        height: 40,
        backgroundColor: "#DEDCDB",
        borderRadius: 100,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: .75,
        shadowRadius: 7.65,
        elevation: 5,
        marginRight: 8
    }
});



export default SearchResult; 