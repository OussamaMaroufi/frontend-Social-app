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
}from "../constants/postConstants";





export const postCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case POST_CREATE_REQUEST:
            return { loading: true }

        case POST_CREATE_SUCCESS:
            return { loading: false, success: true, post: action.payload }

        case POST_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


export const postListReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case POST_LIST_REQUEST:
            return { loading: true, posts: [] }

        case POST_LIST_SUCCESS:
            return {
                loading: false,
                posts: action.payload.results,
                // page: action.payload.page,
                // pages: action.payload.pages
             
            }

        case POST_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const commentsListReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case COMMENTS_LIST_REQUEST:
            return { loading: true, comments: [] }

        case COMMENTS_LIST_SUCCESS:
            return {
                loading: false,
                comments: action.payload,
                // page: action.payload.page,
                // pages: action.payload.pages
             
            }

        case COMMENTS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

//Reducer of create a comment 
export const commentCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT_CREATE_REQUEST:
            return { loading: true }

        case COMMENT_CREATE_SUCCESS:
            return { loading: false, success: true, comment: action.payload }

        case COMMENT_CREATE_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}