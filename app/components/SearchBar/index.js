import React from 'react'; 
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function SearchBar(props) {
    return(
        <View style={searchBarStyles.container}>
            <Ionicons name="md-search" size={25} color="#333333" />
            <TextInput style={searchBarStyles.searchBar} 
                placeHolder="Try getting lit somewhere else?"
                value={props.value}
            />
        </View>
    ); 
}

const searchBarStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: 37,
        width: 250,
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 10,
        paddingTop: 7,
        paddingBottom: 7,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: .75,
        shadowRadius: 7.65,
        elevation: 5,
    },
    searchBar: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingLeft: 10, 
        fontSize: 16
    }
});

export default SearchBar;