import {combineReducers} from "redux";
import {configureStore, createAction, createReducer, createSlice} from "@reduxjs/toolkit";


const initialState = {testState: false}

//export const setTestState = createAction("SET_TEST");



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

// export const reducerTestState = createReducer(initialState, {
// [setTestState]:(state, action)=>{
//     state.testState=action.payload
// }
// });


const testSlice = createSlice({
    name: "testSlice",
    initialState,
    reducers:{
        setTestState(state, action){
            state.testState=action.payload
        }
    }

})

export default testSlice.reducer
export const {setTestState} = testSlice.actions


