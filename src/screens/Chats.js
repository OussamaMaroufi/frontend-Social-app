import React, { useState } from 'react'
import { useFonts } from 'expo-font';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    Image,
} from 'react-native';

import { Feather as Icon, MaterialIcons as MIcon } from '@expo/vector-icons';


import NSLight from '../../assets/fonts/Nunito-Light.ttf'
import NSRegular from '../../assets/fonts/Nunito-Regular.ttf'
import NSBold from '../../assets/fonts/Nunito-Bold.ttf'
import NSExtraBold from '../../assets/fonts/Nunito-ExtraBold.ttf';
import Searchbar from '../components/SearchBar';

function Chats({ navigation }) {

    const [loaded] = useFonts({
        NSLight,
        NSRegular,
        NSBold,
        NSExtraBold,
    });

    const [messages, setMessages] = useState([
        {
            userImage: 'https://randomuser.me/api/portraits/women/79.jpg',
            userName: 'Alma Carpenter',
            message: {
                sender: 'Alma Carpenter',
                text: 'Hello',
                seenByYou: true,
                seenByUser: true,
            },
            isTyping: true,
            time: 'now',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
            userName: 'Sophie Price',
            message: {
                sender: 'You',
                text: 'Are you learning React Native too?',
                seenByYou: true,
                seenByUser: false,
            },
            time: '03:32 PM',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/33.jpg',
            userName: 'Jessie Collins',
            message: {
                sender: 'You',
                text: 'Bye!',
                seenByYou: true,
                seenByUser: true,
            },
            time: '01:40 PM',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/85.jpg',
            userName: 'Clinton Meyer',
            message: {
                sender: 'Clinton Meyer',
                text: 'Let me know, what you think?',
                seenByYou: false,
                seenByUser: false,
            },
            time: '10:37 AM',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/60.jpg',
            userName: 'Brayden Willis',
            message: {
                sender: 'Brayden Willis',
                text: 'Okay, will share it with you by Friday.',
                seenByYou: true,
                seenByUser: true,
            },
            time: 'Yesterday',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/47.jpg',
            userName: 'Dennis Brown',
            message: {
                sender: 'Dennis Brown',
                text: 'Sure, talk to you later.',
                seenByYou: true,
                seenByUser: true,
            },
            time: '3 days ago',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/women/21.jpg',
            userName: 'Dolores Bell',
            message: {
                sender: 'You',
                text: 'Thanks!',
                seenByYou: true,
                seenByUser: true,
            },
            time: '4 days ago',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/54.jpg',
            userName: 'Everett Green',
            message: {
                sender: 'Everett Green',
                text: 'I am not sure about that.',
                seenByYou: true,
                seenByUser: true,
            },
            time: 'one month ago',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/54.jpg',
            userName: 'Everett Green',
            message: {
                sender: 'Everett Green',
                text: 'I am not sure about that.',
                seenByYou: true,
                seenByUser: true,
            },
            time: 'one month ago',
        },
        {
            userImage: 'https://randomuser.me/api/portraits/men/54.jpg',
            userName: 'Everett Green',
            message: {
                sender: 'Everett Green',
                text: 'I am not sure about that.',
                seenByYou: true,
                seenByUser: true,
            },
            time: 'one month ago',
        },
    ]);

    if (!loaded) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    function getRandomImage() {
        let max = 100;
        let min = 1;
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        let url = `https://randomuser.me/api/portraits/${n % 2 == 0 ? 'men' : 'women'
            }/${n}.jpg`;

        return url;
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>


            <View style={{ flex: 1 }}>

                {/*View to display stories */}
                <View style={{ marginTop: 15, backgroundColor: "#333", paddingVertical: 5 }}>

                    <View style={styles.storiesView}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginTop: 0 }}>
                                {Array(10)
                                    .fill(0)
                                    .map((s) => (

                                        <TouchableOpacity key={Math.random() * 10} style={styles.storyUserProfile}>
                                            <Image
                                                style={styles.storyUserProfileImage}
                                                source={{ uri: getRandomImage() }}
                                            />
                                        </TouchableOpacity>
                                    ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* Here view of search bar */}

                <View style={{backgroundColor:"#333"}}>
                   <Searchbar/>
                </View>

                {/*View to display chats */}

                <View style={{  marginTop: 0, backgroundColor: '#1f1f1f', }}>
                    {messages.map((chat) => (
                        <TouchableOpacity
                            key={chat.time}
                            style={{
                                marginTop: 0,
                                paddingHorizontal: 8,
                                paddingVertical: 7,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#333',


                            }}
                            onLongPress={() => {
                                Alert.alert(
                                    'Delete Chat?',
                                    `Do you want to delete ${chat.userName}'s chats?`,
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => { },
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Yes',
                                            onPress: () => {
                                                let newChats = messages.filter(
                                                    (m) => m.userName !== chat.userName
                                                );
                                                setMessages(newChats);
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            }}
                            onPress={() => navigation.navigate("Room")}
                        >
                            <TouchableOpacity>
                                {/*Here we set image of user  to redirect to user profile  */}

                                <Image
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 100,
                                    }}

                                    source={{
                                        uri: chat.userImage,
                                    }}
                                />



                            </TouchableOpacity>
                            <View style={{ flex: 1, paddingHorizontal: 10 }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NSBold',
                                            fontSize: 15,
                                            color: "#fff"

                                        }}
                                    >
                                        {chat.userName}
                                    </Text>
                                    <Text style={{ fontFamily: 'NSRegular', fontSize: 14, color: "#fff" }}>
                                        {chat.time}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    {chat.isTyping ? (
                                        <Text
                                            style={{
                                                fontFamily: 'NSRegular',
                                                color: 'green',
                                                fontSize: 16,
                                            }}
                                        >
                                            typing...
                                        </Text>
                                    ) : (
                                        <Text
                                            style={{
                                                fontFamily:
                                                    chat.message.sender !== 'You'
                                                        ? chat.message.seenByYou
                                                            ? 'NSRegular'
                                                            : 'NSBold'
                                                        : 'NSRegular',
                                                fontSize: 16,
                                                color: "#fff"
                                            }}
                                        >
                                            {chat.message.text}
                                        </Text>
                                    )}
                                    {chat.message.sender === 'You' ? (
                                        chat.message.seenByUser ? (
                                            <MIcon name='done-all' size={16} color='#3c40c6' />
                                        ) : (
                                            <MIcon name='done' size={16} color={'#555'} />
                                        )
                                    ) : null}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>
            </View>

        </ScrollView>
    );
}


export default Chats;


const styles = StyleSheet.create({
    storiesView: {
        paddingHorizontal: 8,
        marginTop: 14,
    },
    storyUserProfile: {
        marginRight: 8,
        borderColor: '#B53471',
        borderWidth: 2.5,
        borderRadius: 100,
    },
    storyUserProfileImage: { width: 70, height: 70, borderRadius: 100 },
})