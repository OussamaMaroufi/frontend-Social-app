import {
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL


}from "../constants/postConstants";

import axios from "axios";




export const createPost = (postData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_CREATE_REQUEST
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
            `http://192.168.1.100:8000/api/posts/create/`,
            postData,
            config
        )
        dispatch({
            type: POST_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: POST_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const listPosts = () => async (dispatch,getState) => {

    try {
        dispatch({ type: POST_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/posts/`,config)
        // console.log("your posts ",data);

        dispatch({
            type: POST_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}