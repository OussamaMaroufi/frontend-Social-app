import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text,ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from "../actions/postActions"
import * as Font from 'expo-font';
import Post from '../components/Post';


const Findpostscreen = ({ searchText }) => {

    const dispatch = useDispatch();
    const { loading, posts, error } = useSelector((state) => state.postList)


    useEffect(() => {

        dispatch(listPosts(searchText))


    }, [dispatch, searchText])


    console.log(searchText);
    if (loading) {
        console.log("we steel loading...");
    } else {
        console.log("posts", posts);
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {
                posts.length>0?(
                    posts.map((post)=>(
                        <View>
                            <Post post={post}/>
                            <View style={{marginTop:6,marginBottom:5}}></View>
                        </View>
                    ))
                ):(
                    <Text>No Post Found </Text>
                )
            }
        </ScrollView>
    );
}


export default Findpostscreen;

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        // backgroundColor: "red"
        backgroundColor: '#1f1f1f',


    }
})