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
} from "../constants/chatConstants";

export const messagesListReducer = (state = {}, action) => {

    switch (action.type) {
        case CHATE_MESSAGES_LIST_REQUEST:
            return { loading: true }

        case CHATE_MESSAGES_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload
            }

        case CHATE_MESSAGES_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const chatsListReducer = (state = {}, action) => {

    switch (action.type) {
        case CHATS_LIST_REQUEST:
            return { loading: true }

        case CHATS_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload

            }

        case CHATS_LIST_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const addRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CHAT_REQUEST:
            return { loading: true }

        case ADD_CHAT_SUCCESS:
            return { loading: false, success: true, room: action.payload }

        case ADD_CHAT_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}


