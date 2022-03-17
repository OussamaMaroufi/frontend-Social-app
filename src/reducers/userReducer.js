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






export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


//the name of reducer is the name of state object we access this state by using useselector hook 


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}


//Listing users Reducer 
export const userListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true }

        case USER_LIST_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
            }
        }


        case USER_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

//Reducer To List User posts 
export const userPostListReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_POSTS_LIST_REQUEST:
            return { loading: true }

        case USER_POSTS_LIST_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
            }
        }


        case USER_POSTS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userFollowReducer = (state = {}, action) => {

    switch (action.type) {
        case USER_FOLLOW_REQUEST:
            return { loading: true }

        case USER_FOLLOW_SUCCESS: {
            return {
                loading: false,
                data: action.payload,
            }
        }


        case USER_FOLLOW_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


