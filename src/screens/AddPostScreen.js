import React from 'react';
import {View, StyleSheet,Text} from 'react-native';

const Addpostscreen = () => {
    return (
        <View style={styles.container}>
           <Text style={{color:"#fff",fontSize:20}}>Welcome from Add Post Screen </Text> 
        </View>
    );
}


export default Addpostscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#333"
    }
})