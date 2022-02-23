import React,{useEffect} from 'react';
import {View,Text, StyleSheet,Image} from 'react-native';
import {useSelector} from 'react-redux'

const Splashscreen = ({navigation}) => {

    const userLogin = useSelector(state => state.userLogin)


    const {userInfo} = userLogin;
    // console.log("Your infos will be displayed here !",userInfo);

    useEffect(()=>{
        if(!userInfo){
            navigation.navigate('auth')
        }else{
            navigation.navigate('main')  
        }
    },[])

    return (
        <View style={styles.container} >
        {
            userInfo ?(
           
                <Text style={styles.text}>Splash Screen</Text>

            ):
            (
                <Text>Helo</Text>
            )
        }
        </View>
    );
}


export default Splashscreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:15,
        backgroundColor:"#333",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{

    }
})