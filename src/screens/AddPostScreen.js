import React, { useState,useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { createPost,listPosts } from "../actions/postActions"

const Addpostscreen = () => {

    const dispatch = useDispatch()
    const [content, setContent] = useState('');
    const inputs = {
        content: content
    }



    const data = useSelector((state) => state.postCreate)
    const { posts }  = useSelector((state)=>state.postList)
    

    // const [posts,setPosts] = useState([])

    console.log("Your post data",posts);

    const handleSubmit = () => {
        console.log("This is the content of your post :", content);
        if (content !== "") {

            dispatch(createPost(inputs))
            setContent("")
        } else {
            return
        }
    }


    const handleList= ()=>{
        dispatch(listPosts())
    }


    return (
        <View style={styles.container}>
            <Text style={{ color: "#fff", fontSize: 20, marginBottom: 15 }}>Add Your Post Here ! </Text>

            <TextInput
                placeholder='What do you want to say !'
                placeholderTextColor='#808e9b'
                style={styles.input}
                value={content}
                multiline={true}
                numberOfLines={4}
                onChangeText={(content) => setContent(content)}
            />



            <TouchableOpacity style={{ backgroundColor: "lightgrey", width: 120, padding: 8, marginTop: 20, borderRadius: 60 }} onPress={handleSubmit}>
                <Text style={{ color: "red", textAlign: "center", fontSize: 20 }}>Add</Text>
            </TouchableOpacity>
       
            <Text style={{ color: "#fff", fontSize: 20, marginBottom: 15 }}>List of Posts </Text>

            <TouchableOpacity style={{ backgroundColor: "lightgrey", width: 120, padding: 8, marginTop: 20, borderRadius: 60 }} onPress={handleList}>
                <Text style={{ color: "red", textAlign: "center", fontSize: 20 }}>List Here</Text>
            </TouchableOpacity>
            {/*Here To list post  */}
            <View style={{marginTop:20}}>
                {
                    posts.length>0 ?(<Text style={styles.text}>Posts Available</Text>):(<Text style={styles.text}>No Post Available yet ! </Text>)
                    
                }
            </View>



        </View>
    );
}


export default Addpostscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: "center",
        backgroundColor: "#1f1f1f",
        padding: 10
    },
    input: {
        width: '100%',
        height: 70,
        backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#808e9b',
    },
    text:{
        color:"#fff",
        fontSize:20
    }
})