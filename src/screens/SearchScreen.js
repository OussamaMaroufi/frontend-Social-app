import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import Searchbar from '../components/SearchBar';

const Searchscreen = () => {
    return (
        // <View style={styles.container}>
        //     <Text>Screen to make rserach to post or groups or freinds </Text>
        // </View>
        <View>
            <Searchbar/>
        </View>
    );
}


export default Searchscreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#333"
    }
})