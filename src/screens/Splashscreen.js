import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {useDispatch} from 'react-redux'


const Splashscreen = ({ navigation }) => {

    const dispatch = useDispatch();

    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
            // alert("🔐 Here's your value 🔐 \n" + result);
          result = JSON.parse(result)
          console.log(result)

          dispatch({
              type:"USER_LOGIN_SUCCESS",
              payload:result
          })
          
            // console.log(result["userInfo"]);

            setTimeout(()=>{navigation.navigate("main")},3000)
          
            
            // navigation.navigate("main")
            dispatch({
                type: 'USER_LOGIN_SUCCESS',
                payload: result
            })
        } else {
            // alert('No values stored under that key.');
            navigation.navigate("auth")
        }
    }



    useEffect(()=>{
        let key = "userInfo"
    getValueFor(key) 
    },[])

    return (
        <View style={styles.container} >
            <Text>HERE IS SPLASH SCREEN</Text>
        </View>
    );
}


export default Splashscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#333",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color:"#fff"
    }
})