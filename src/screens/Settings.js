import React from "react";
import { Text, View, StyleSheet } from 'react-native'



function Settings({navigation}) {
    return (
        <View style={styles.container} >
            <Text style={{color:"#fff",fontSize:20}}>
                Settings Of our App
            </Text>
        </View>
    );
}

export default Settings;


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#333"
    }
})