import React from 'react';
import { View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Comments from '../screens/Comments';
import Searchscreen from '../screens/SearchScreen';
import Settings from '../screens/Settings';



//profile comments search screens 

const HomeStack = createNativeStackNavigator()

const Homenavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='home' component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen name='comment' component={Comments} options={{ headerShown: false }} />
            <HomeStack.Screen name='search' component={Searchscreen} options={{ headerShown: false }} />
            <HomeStack.Screen name='settings' component={Settings} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}


export default Homenavigator;
