import {
    CHATS_LIST_FAIL,
    CHATS_LIST_REQUEST,
    CHATS_LIST_SUCCESS,

    ADD_CHAT_FAIL,
    ADD_CHAT_REQUEST,
    ADD_CHAT_SUCCESS,

    CHATE_MESSAGES_LIST_REQUEST,
    CHATE_MESSAGES_LIST_SUCCESS,
    CHATE_MESSAGES_LIST_FAIL,


} from "../constants/chatConstants"

import axios from "axios";

export const listMessages = (RoomId) => async (dispatch, getState) => {

    try {

        dispatch({ type: CHATE_MESSAGES_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/v1/chats/${RoomId}/messages/`, config)

        dispatch({
            type: CHATE_MESSAGES_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:     CHATE_MESSAGES_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listchats = () => async (dispatch, getState) => {

    try {

        dispatch({ type: CHATS_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/v1/users/${userInfo.id}/chats/`, config)

        dispatch({
            type: CHATS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CHATS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const addRoom = (RoomData) => async (dispatch, getState) => {
    try {


        dispatch({
            type: ADD_CHAT_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.post(
            `http://192.168.1.100:8000/api/v1/chats/`,
            RoomData,
            config
        )

        dispatch({
            type: ADD_CHAT_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: ADD_CHAT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



