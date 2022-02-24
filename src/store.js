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
} from "./reducers/userReducer";

import {
    postCreateReducer,
    postListReducer

} from './reducers/postReducers'



const reducer = combineReducers({
    postCreate: postCreateReducer,
    postList:postListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
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


