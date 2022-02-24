import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput,Text } from 'react-native';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons/';


const Searchbar = () => {

 
    return (
        <View style={styles.searchBarView}>
            <View style={styles.searchBar}>
                <Icon name='search' size={22} color='#c1c1c1' />
                <TextInput
                    style={{
                        paddingHorizontal: 6,
                        color: '#c1c1c1',
                        // fontFamily: 'NSRegular',
                        fontSize: 16,
                    }}
                    placeholder='Search'
                    placeholderTextColor='#c1c1c1'
                />
            </View>
        
       
        </View>
    );
}

export default Searchbar;


const styles = StyleSheet.create({


    searchBarView: {
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    searchBar: {
        flex: 1,
        height: 40,
        backgroundColor: '#3f3f3f',
        marginRight: 10,
        borderRadius: 4,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

})