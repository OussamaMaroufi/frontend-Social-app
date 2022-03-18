import {
    POST_CREATE_FAIL,
    POST_CREATE_REQUEST,
    POST_CREATE_SUCCESS,
    POST_LIST_REQUEST,
    POST_LIST_SUCCESS,
    POST_LIST_FAIL,
    COMMENTS_LIST_REQUEST,
    COMMENTS_LIST_SUCCESS,
    COMMENTS_LIST_FAIL,
    COMMENT_CREATE_FAIL,
    COMMENT_CREATE_REQUEST,
    COMMENT_CREATE_SUCCESS,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_DELETE_FAIL,


} from "../constants/postConstants";

import axios from "axios";


export const deletePost = (postId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: POST_DELETE_REQUEST
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

        const { data } = await axios.delete(
            `http://192.168.1.100:8000/api/posts/delete/${postId}`,
            config
        )
        dispatch({
            type: POST_DELETE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: POST_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}




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


export const listPosts = (q = '') => async (dispatch, getState) => {

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

        const { data } = await axios.get(`http://192.168.1.100:8000/api/posts/?q=${q}`, config)


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


export const listComments = (post_Id) => async (dispatch, getState) => {

    try {
        dispatch({ type: COMMENTS_LIST_REQUEST })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.access}`
            }
        }

        const { data } = await axios.get(`http://192.168.1.100:8000/api/posts/${post_Id}/comments/`, config)
        // console.log("your comments ",data);

        dispatch({
            type: COMMENTS_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: COMMENTS_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createComment = (post_Id, commentData) => async (dispatch, getState) => {
    try {
        console.log("triggered ");

        dispatch({
            type: COMMENT_CREATE_REQUEST
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
            `http://192.168.1.100:8000/api/posts/${post_Id}/comment-create/`,
            commentData,
            config
        )

        dispatch({
            type: COMMENT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: COMMENT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}