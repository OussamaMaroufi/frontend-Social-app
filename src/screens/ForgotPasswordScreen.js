import React,{useEffect} from 'react';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import {useSelector,useDispatch } from 'react-redux'
import { logout } from '../actions/userActions';

const Forgotpasswordscreen = () => {

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo } = userLogin

    useEffect(()=>{
        console.log("working");
    },[userInfo])
    
    return (
        <View style={styles.container}>
        {
            userInfo?(

                <Text style={styles.text}>{userInfo.username}</Text> 
            ):(
                    <Text style={styles.text}>Empty</Text>
            )
        }
           <TouchableOpacity onPress={()=>dispatch(logout())} style={{backgroundColor:"cyan",padding:3}}>
            <Text>Logout</Text>
           </TouchableOpacity>
        </View>
    );
}


export default Forgotpasswordscreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#333",
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:20,
        color:"#fff"

    }
})