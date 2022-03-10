import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert,Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

import Post from '../components/Post';
import { useSelector, useDispatch } from 'react-redux'
import { listComments } from '../actions/postActions'
import Commentitem from '../components/CommentItem';
import { createComment } from "../actions/postActions"


const Comments = ({ route, navigation }) => {
    const { post } = route.params;
    const dispatch = useDispatch()

    const [inputComment, setInputComment] = useState('')

    const commentData = {
        content: inputComment
    }

    const sendComment = () => {
        if (inputComment == '') {
            Alert('Comment should not be empty  !!')
        } else {
            dispatch(createComment(post.id, commentData))
            if(success){
                setInputComment('');
                Keyboard.dismiss()
            }
        }
    }






    const { loading, comments, error } = useSelector((state) => state.commentsList);
    const {success, comment } = useSelector((state) => state.commentCreate)
    console.log("THis the state of create a comment ", success)



    useEffect(() => {
        dispatch(listComments(post.id))

    }, [dispatch])



    if (loading) {
        return (
            <View style={{ ...styles.container, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="red" size='large' />
            </View>
        )
    } else {





        return (
            <View style={styles.container}>
                <Post post={post} />
                {/**Dispaly comments Here */}


                {

                


                <ScrollView>

                    {
                        comments.map((comment) => (
                            <View key={comment.id}>
                                <Commentitem comment={comment} />
                            </View>
                        ))
                    }

                </ScrollView>

            }





                <View style={{ paddingVertical: 20, marginBottom: 5 }}>

                    <View style={styles.messageInputView}>
                        <TextInput
                            value={inputComment}
                            style={styles.messageInput}
                            placeholder='What You want to say'
                            onChangeText={(text) => setInputComment(text)}
                        />
                        <TouchableOpacity
                            style={styles.messageSendView}
                            onPress={() => {
                                sendComment();
                            }}
                        >
                            <Icon name='send' type='material' color={"#ED4C67"} />
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        );
    }
}

export default Comments;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f',
        paddingTop: 20,
    },
    messageInputView: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 4,
        position: "absolute"
    },
    messageInput: {
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    messageSendView: {
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    commentsView: {
        display: "flex",
        position: "absolute",




    }

})