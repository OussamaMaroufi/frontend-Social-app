import React from 'react';
import { StyleSheet } from 'react-native';

import Chatscreen from '../screens/ChatScreen';
import Chats from '../screens/Chats';

import { createNativeStackNavigator } from '@react-navigation/native-stack';


const ChatStack = createNativeStackNavigator();


const Chatnavigation = () => {
    return (
        <ChatStack.Navigator>
        <ChatStack.Screen name='ChatList' component={Chats} options={{headerShown:false}} />
        <ChatStack.Screen name='Room' component={Chatscreen}  options={{headerStyle: {
            backgroundColor: '#f4511e',
          },}} />
        </ChatStack.Navigator>

    );
}

const styles = StyleSheet.create({})

export default Chatnavigation;
