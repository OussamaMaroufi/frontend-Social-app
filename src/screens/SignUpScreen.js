import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux'
import { register } from "../actions/userActions"

export default function SignUpScreen({ navigation }) {

    let dispatch = useDispatch();

    //Hanlde SignUp and Capture data 
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const inputs = {
        email: email,
        username: username,
        password: password
    }
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister




    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(inputs))
    }




    useEffect(() => {
        StatusBar.setBarStyle('light-content', true);
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <LinearGradient
                colors={['#222', '#222', '#111']}
                style={styles.container}
            >
                <Text style={styles.welcomeText}>Let's Start</Text>
                <Text style={styles.loginText}>Create an Account</Text>

                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#808e9b'
                    style={styles.input}
                    // textContentType='text'
                    value={username}
                    onChangeText={(username) => setUsername(username)}
                />

                <TextInput
                    placeholder='Email Address'
                    placeholderTextColor='#808e9b'
                    style={styles.input}
                    autoCorrect={true}
                    //   autoCapitalize={false}
                    autoCompleteType='email'
                    keyboardType='email-address'
                    // textContentType='emailAddress'
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#808e9b'
                    style={styles.input}
                    secureTextEntry={true}
                    // textContentType='password'
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                />



                <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                    <Text style={styles.loginButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.loginWithBar}>

                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name='google' type='font-awesome' size={30} color='#808e9b' />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Icon
                            name='facebook-square'
                            type='font-awesome'
                            size={30}
                            color='#808e9b'
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name='apple' type='font-awesome' size={30} color='#808e9b' />
                    </TouchableOpacity>
                </View>

                <View style={styles.signUpTextView}>
                    <Text style={styles.signUpText}> I have an account</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                        <Text style={[styles.signUpText, { color: '#B53471' }]}>
                            {' Sign In'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#fff',
        alignSelf: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#333',
        borderRadius: 6,
        marginTop: 10,
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#808e9b',
    },
    fpText: {
        alignSelf: 'flex-end',
        color: '#B33771',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#833471',
        paddingVertical: 12,
        borderRadius: 6,
        marginTop: 20,
    },
    loginButtonText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fafafa',
        alignSelf: 'center',
    },
    loginWithBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    iconButton: {
        backgroundColor: '#333',
        padding: 14,
        marginHorizontal: 10,
        borderRadius: 100,
    },
    signUpTextView: {
        marginTop: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signUpText: {
        color: '#808e9b',
        fontSize: 20,
        fontWeight: '500',
    },
});

