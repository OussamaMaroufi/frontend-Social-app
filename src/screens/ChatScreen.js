import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    FlatList,
    Dimensions,
    Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { listMessages } from "../actions/chatActions"
import SocketActions from '../socketActions';

const Chatscreen = ({ route, navigation }) => {
    const auth = useSelector((state) => state.userLogin)

    let typingTimer = 0;
    let isTypingSignalSent = false;

    const { chat } = route.params;
    //    console.log("kk",chat);
    let socket = new WebSocket(
        `ws://192.168.1.100:8000/ws/users/${auth.userInfo.id}/chat/`
    )


    const dispatch = useDispatch()
    const { loading, data, error } = useSelector((state) => state.messagesList);
    // console.log("Theese are messages for this room!", data)
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        dispatch(listMessages(chat.roomId))

        if (!loading) {
            setMessages(data?.reverse())
        }
    }, [dispatch, chat])



    const [chatUser] = useState({
        name: chat.name,
        profile_image: `http://192.168.1.100:8000${chat.image}`,
        last_seen: 'online',
    });

    const [currentUser] = useState({
        name: 'John Doe',
    });


    //THis fct to get current time when input a messge 
    function getTime(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }


    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        const chatId = chat.id;
        const userId = auth.userInfo.id
        if (chatId === data.roomId) {
            if (data.action === SocketActions.MESSAGE) {
                // data["userImage"] = ServerUrl.BASE_URL.slice(0, -1) + data.userImage;
                setMessages((prevState) => {
                    let messagesState = JSON.parse(JSON.stringify(prevState));
                    messagesState.results.unshift(data);
                    return messagesState;
                });


                setMessages((prev) => [...prev, data.message])
                setTyping(false);
            }
            else if (data.action === SocketActions.TYPING && data.user !== auth.userInfo.id) {
                setTyping(data.typing);
            }
        }
        // if (data.action === SocketActions.ONLINE_USER) {
        //   setOnlineUserList(data.userList);
        // }
    };


    function sendMessage() {
        if (inputMessage) {
            socket.send(
                JSON.stringify({
                    action: SocketActions.MESSAGE,
                    message: inputMessage,
                    user: auth.userInfo.id,
                    roomId: chat.roomId,
                })
            );
        }
        setInputMessage('');
    }

    const sendTypingSignal = (typing) => {
        socket.send(
            JSON.stringify({
                action: SocketActions.TYPING,
                typing: typing,
                user: auth.userInfo.id,
                roomId: chat.roomId
            })
        );
    };

    const chatMessageTypingHandler = (event) => {
        if (event.keyCode !== 13) {
            if (!isTypingSignalSent) {
                sendTypingSignal(true);
                isTypingSignalSent = true;
                console.log("State of,typing", typing)
            }
            clearTimeout(typingTimer);
            typingTimer = setTimeout(() => {
                sendTypingSignal(false);
                isTypingSignalSent = false;
            }, 3000);
        } else {
            clearTimeout(typingTimer);
            isTypingSignalSent = false;
        }
    };



    useEffect(() => {
        navigation.setOptions({
            title: '',
            headerLeft: () => (
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        style={{ paddingRight: 10 }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Icon
                            name='angle-left'
                            type='font-awesome'
                            size={30}
                            color='#fff'
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.userProfileImage}
                        source={{ uri: chatUser.profile_image }}
                    />
                    <View
                        style={{
                            paddingLeft: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 18 }}>
                            {chatUser.name}
                        </Text>
                        <Text style={{ color: '#fff', fontWeight: '300' }}>
                            {chatUser.last_seen}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={{ paddingRight: 10 }}
                    onPress={() => {
                        Alert.alert('Audio Call', 'Audio Call Button Pressed');
                    }}
                >
                    <Icon name='call' size={28} color='#fff' />
                </TouchableOpacity>
            ),
        });
    }, []);

    useEffect(() => {
        console.log("refreshed");
        console.log(messages);
    }, [messages])

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <FlatList
                    style={{ backgroundColor: '#333' }}
                    inverted={true}
                    data={JSON.parse(JSON.stringify(messages)).reverse()}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback>
                            <View style={{ marginTop: 6, }}>
                                <View
                                    style={{
                                        maxWidth: Dimensions.get('screen').width * 0.6,
                                        backgroundColor: 'grey',
                                        alignSelf:
                                            item.user === auth.userInfo.id
                                                ? 'flex-end'
                                                : 'flex-start',

                                        marginHorizontal: 10,
                                        padding: 10,
                                        borderRadius: 8,
                                        borderBottomLeftRadius:
                                            item.sender === currentUser.name ? 8 : 0,
                                        borderBottomRightRadius:
                                            item.sender === currentUser.name ? 0 : 8,
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: 16,
                                        }}
                                    >
                                        {item.message}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#dfe4ea',
                                            fontSize: 14,
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        {item.time}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                />

                {
                    typing &&
                    <View>
                        <Text style={{ color: "#fff" }}>Typing</Text>
                    </View>
                }

                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.messageInputView}>
                        <TextInput
                            defaultValue={inputMessage}
                            style={styles.messageInput}
                            placeholder='Message'
                            onChangeText={(text) => setInputMessage(text)}
                            onSubmitEditing={() => {
                                sendMessage();
                            }}


                            onKeyPress={chatMessageTypingHandler}
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
            </View>
        </TouchableWithoutFeedback>
    );
}


export default Chatscreen;

const styles = StyleSheet.create({
    headerLeft: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
    container: {
        flex: 1,
        backgroundColor: '#333',
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
});
