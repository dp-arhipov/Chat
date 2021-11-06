import {combineReducers} from "redux";
import {configureStore, createAction, createReducer} from "@reduxjs/toolkit";


const initialState = {currentUser: false, currentDialog: false, dialogList: [], messages: []}

export const setCurrentUser = createAction("SET_CURRENT_USER22");
// case "SET_CURRENT_USER":
// return {
//     ...state,
//     currentUser: action.payload
// }
// case "SET_CURRENT_DIALOG":
// return {
//     ...state,
//     currentDialog: state.dialogList.filter(dialog => dialog.id == action.payload)[0]
// }
// case "ADD_MESSAGE":
// return {
//     ...state,
//     //messages: action.payload
//     messages: [...state.messages, action.payload]
// }
// case "SET_MESSAGES":
// return {
//     ...state,
//     //messages: action.payload
//     messages: action.payload
// }
// case "SET_DIALOG_LIST":
// return {
//     ...state,
//     //messages: action.payload
//     dialogList: action.payload
// }
// case "SET_NICK_NAME":
// return {
//     ...state,
//     //messages: action.payload
//     dialogList: action.payload
// }
// case "SET_FIND_RESULTS":
// return {
//     ...state,
//     //messages: action.payload
//     findResults: {user: action.payload}
// }
// case "LOGOUT":
// return {
//     ...initialState
// }

export const reducerText = createReducer(initialState, {
[setCurrentUser]:(state, action)=>{
    state.currentUser22=action.payload
}
});

// export const rootReducer = combineReducers( {
//     reducer
//
// })

//const store2 = configureStore({rootReducer})





