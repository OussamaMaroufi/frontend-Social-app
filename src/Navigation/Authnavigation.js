import React from 'react';
import SignUpscreen from '../screens/SignUpScreen';
import SignInscreen from '../screens/SignInScreen'
import Forgotpasswordscreen from '../screens/ForgotPasswordScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Auth = createNativeStackNavigator()

const Authnavigation = () => {

    return (
        <Auth.Navigator>
            <Auth.Screen name='signup' component={SignUpscreen} options={{ headerShown: false }} />
            <Auth.Screen name='signin' component={SignInscreen} options={{ headerShown: false }} />
            <Auth.Screen name='forget' component={Forgotpasswordscreen} options={{ headerShown: false }} />
        </Auth.Navigator>
    );
}


export default Authnavigation;
