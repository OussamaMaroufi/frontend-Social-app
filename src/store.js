import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import * as SecureStore from 'expo-secure-store';


async function getValueFor(key) {
    let result = await SecureStore.getItemAsync(key)
    console.log("dsfdd",result)
    return result
  }

let userInfoFromStorage;

getValueFor('useInfo').then((res)=>{
    userInfoFromStorage = res
    console.log(userInfoFromStorage)
})

import {
    userLoginReducer,
    userRegisterReducer,
} from "./reducers/userReducer";



const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
})


//Here we get user infos from Asyncstorage or Secure store 

// const userInfoFromStorage = getValueFor('userInfo') ?JSON.stringify(getValueFor('userInfo')):null

console.log("ddjjdd",userInfoFromStorage);
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store


