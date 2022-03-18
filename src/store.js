import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as SecureStore from 'expo-secure-store';


// async function getValueFor(key) {
//     let result = await SecureStore.getItemAsync(key)
//     console.log("dsfdd",result)
//     return result
//   }

// // let userInfoFromStorage;

// getValueFor('useInfo').then((res)=>{
//     userInfoFromStorage = res
//     console.log(userInfoFromStorage)
// })

import {
    userLoginReducer,
    userRegisterReducer,
    userListReducer,
    userPostListReducer,
    userFollowReducer
} from "./reducers/userReducer";

import {
    postCreateReducer,
    postListReducer,
    commentsListReducer,
    commentCreateReducer,
    postDeleteReducer


} from './reducers/postReducers'

import {
    chatsListReducer,
    addRoomReducer,
    messagesListReducer
} from "./reducers/chatReducers";



const reducer = combineReducers({
    postCreate: postCreateReducer,
    postList: postListReducer,
    postDelete:postDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    commentsList: commentsListReducer,
    commentCreate: commentCreateReducer,
    userList: userListReducer,
    userPostsList: userPostListReducer,
    userFollow: userFollowReducer,

    chatsList: chatsListReducer,
    addRoom: addRoomReducer,
    messagesList: messagesListReducer

})


//Here we get user infos from Asyncstorage or Secure store 

// const userInfoFromStorage = getValueFor('userInfo') ?JSON.stringify(getValueFor('userInfo')):null

// console.log("ddjjdd",userInfoFromStorage);it inside 

//I Should get userLogin from Secure store and put  
const initialState = {
    // userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store


