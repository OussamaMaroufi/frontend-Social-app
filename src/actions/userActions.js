import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_POSTS_LIST_REQUEST,
    USER_POSTS_LIST_SUCCESS,
    USER_POSTS_LIST_FAIL,
    USER_FOLLOW_REQUEST,
    USER_FOLLOW_SUCCESS,
    USER_FOLLOW_FAIL



} from "../constants/userConstants";

import * as SecureStore from 'expo-secure-store';


async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}



export const login = (loginCredentials) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://192.168.1.100:8000/api/users/login/',
            loginCredentials,
            config
        )


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        //Here data is stored in secure store 
        save('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const logout = () => (dispatch) => {
    SecureStore.deleteItemAsync('userInfo')
    dispatch({ type: USER_LOGOUT })
}


export const register = (inputs) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://192.168.1.100:8000/api/users/register/',
            inputs,
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        // localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//This  Action to Handle Listing users 



export const listUsers = (q = '') => async (dispatch, getState) => {


    try {
        dispatch({ type: USER_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/users/?q=${q}`, config)


        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

//THis Action To list User Posts


export const listUserPosts = (username) => async (dispatch) => {
    try {
        dispatch({ type: USER_POSTS_LIST_REQUEST })

        const config = {
            headers: {
                'Content-type': 'application/json',

            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/users/${username}/posts/`, config)


        dispatch({
            type: USER_POSTS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_POSTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


//This Action  to handle following 
export const followUser = (username) => async (dispatch, getState) => {
    
    try {
        dispatch({ type: USER_FOLLOW_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(`http://192.168.1.100:8000/api/users/${username}/follow/`, {}, config)
        dispatch({
            type: USER_FOLLOW_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: USER_FOLLOW_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

