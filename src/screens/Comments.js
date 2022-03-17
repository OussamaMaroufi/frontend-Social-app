import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView } from 'react-native';
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
    const [_Comments, setListComments] = useState([]);

    const commentData = {
        content: inputComment
    }

    const { success, comment } = useSelector((state) => state.commentCreate)

    const sendComment =async () => {
        if (inputComment == '') {
            Alert('Comment should not be empty  !!')
        } else {
           await dispatch(createComment(post.id, commentData))
            if (comment) {
                setInputComment('');
                Keyboard.dismiss()
                if (success) {
                    // setListComments((_Comments) => [comment,..._Comments]);
                    console.log("success");
                }


            }
        }
    }












    const { loading, comments, error } = useSelector((state) => state.commentsList);
    console.log("THis the state of create a comment ", success)
    // console.log("Theese are comments Here ",comments)



    useEffect(() => {
        dispatch(listComments(post.id))

        if (!loading) {
            setListComments(comments)
        }


    }, [dispatch,success])




    if (loading) {
        return (
            <View style={{ ...styles.container, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator color="red" size='large' />
            </View>
        )
    } else {





        return (
            <View style={styles.container} showsHorizontalScrollIndicator={false}>
                <View >
                    <Post post={post} />


                    
                    
                </View>
                    {/**Dispaly comments Here */}







                    <ScrollView>

                    {
                        _Comments.map((comment) => (
                            <View key={comment.id} style={{ marginBottom: 2 }}>
                                <Commentitem comment={comment} />
                            </View>
                        ))
                    }

                    </ScrollView>

                    <View style={{ paddingVertical: 20, marginBottom:0 }}>
                    
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
        marginBottom:2
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