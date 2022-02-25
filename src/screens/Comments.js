import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Post from '../components/Post';

const Comments = ({ route, navigation }) => {
    const { post } = route.params;
    console.log("This is your post ", post);

    const [inputMessage,setInputMessage] =useState('')

    return (
        <ScrollView style={styles.container}>
            <Post post={post} />

            <View style={{ paddingVertical: 10,marginBottom: 10}}>

                <View style={styles.messageInputView}>
                    <TextInput
                        defaultValue={inputMessage}
                        style={styles.messageInput}
                        placeholder='Message'
                        onChangeText={(text) => setInputMessage(text)}
                        onSubmitEditing={() => {
                            sendMessage();
                        }}
                    />
                    <TouchableOpacity
                        style={styles.messageSendView}
                        onPress={() => {
                            sendMessage();
                        }}
                    >
                        <Icon name='send' type='material' color={"#ED4C67"} />
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    );
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
        marginHorizontal: 14,
        backgroundColor: '#fff',
        borderRadius: 4,
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

})