import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import Main from './src/Navigation/Main';
import { Provider } from 'react-redux';
import store from './src/store';
import Splashscreen from './src/screens/Splashscreen';
import Authnavigation from './src/Navigation/Authnavigation';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Root  = createNativeStackNavigator();

export default function App(){

return (

  <Provider store={store}>

    <NavigationContainer>
     <Root.Navigator>
        <Root.Screen name="welcome" component={Splashscreen} options={{headerShown:false}}/>
        <Root.Screen name='auth' component={Authnavigation} options={{headerShown:false}}/>
        <Root.Screen name="main" component={Main} options={{headerShown:false}}/>
     </Root.Navigator>
    </NavigationContainer>

  </Provider>
);
}


