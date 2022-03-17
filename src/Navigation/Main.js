import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from '../screens/Settings';
import Notifications from '../screens/Notifications';
import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Explore from '../screens/Explore'
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons/';
import Profilescreen from '../screens/ProfileScreen';
import Chatnavigation from './ChatNavigation';
import Homenavigator from './HomeNavigator';
import Addpostscreen from '../screens/AddPostScreen';


const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={{
              
                    "tabBarActiveTintColor": "#ED4C67",
                    "tabBarInactiveTintColor": "#fafafa",
                    "tabBarActiveBackgroundColor": "#222",
                    "tabBarInactiveBackgroundColor": "#222",
                    "tabBarShowLabel": false,
                    "tabBarStyle": [
                      {
                        "display": "flex"
                      },
                      null
                    ]
                 
            }}
        >
            <Tab.Screen
                name='Home'
                component={Homenavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='home' color={color} size={size - 4} />
                    ),
                    headerShown:false
                }}
                
            />
            <Tab.Screen
                name='Chats'
                component={Chatnavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='message-square' color={color} size={size - 4} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name='AddPost'
                component={Addpostscreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='plus-circle' color={color} size={30} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name='Notifications'
                component={Notifications}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='bell' color={color} size={size - 4} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name='profile'
                component={Profilescreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name='user' color={color} size={size - 4} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    );

}

const styles = StyleSheet.create({})

export default Main;
