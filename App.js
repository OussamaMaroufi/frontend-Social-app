import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/Navigation/Main';
import { Provider } from 'react-redux';
import store from './src/store';
import Splashscreen from './src/screens/Splashscreen';
import Authnavigation from './src/Navigation/Authnavigation';
import FlashMessage from "react-native-flash-message";
import { MenuProvider } from 'react-native-popup-menu'
import 'react-native-gesture-handler';

import * as Font from 'expo-font';
import React,{useEffect,useState} from 'react';
// import { Font } from 'expo'

import NSLight from './assets/fonts/Nunito-Light.ttf'
import NSRegular from './assets/fonts/Nunito-Regular.ttf'
import NSBold from './assets/fonts/Nunito-Bold.ttf';
import NSExtraBold from './assets/fonts/Nunito-ExtraBold.ttf';
import {ActivityIndicator,View} from 'react-native'


import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Root = createNativeStackNavigator();


export default function App() {

  const [loaded,setLoaded] = useState(false);

  useEffect(async()=>{
    try{
     await Font.loadAsync({ NSBold, NSRegular, NSLight, NSExtraBold })
     setLoaded(true)

    }catch(error){
        console.log(error);
    }
},[])

if(!loaded){
  return(
    <View>
      <ActivityIndicator size={20} color="red"/>
    </View>
  )
}

  return (

    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <Root.Navigator>
            <Root.Screen name="welcome" component={Splashscreen} options={{ headerShown: false }} />
            <Root.Screen name='auth' component={Authnavigation} options={{ headerShown: false }} />
            <Root.Screen name="main" component={Main} options={{ headerShown: false }} />
          </Root.Navigator>
        </NavigationContainer>

      </MenuProvider>

      <FlashMessage position="bottom" />

    </Provider>
  );
}




