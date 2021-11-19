import {createSlice} from "@reduxjs/toolkit";


//export const setTestState = createAction("SET_TEST");

//
// const testSlice = createSlice({
//     name: "testSlice",
//     initialState,
//     reducers: {
//         setTestState(state, action) {
//             state.testState = 3
//         },
//         setCurrentUser(state, action) {
//             state.currentUser = action.payload
//         },
//         setCurrentDialog(state, action) {
//             state.currentDialog = state.dialogList.filter(dialog => dialog.id == action.payload)[0]
//         },
//         addMessage(state, action) {
//             state.messages.push(action.payload)
//         },
//         setDialogList(state, action) {
//             state.dialogList = action.payload
//         },
//         setNickName(state, action) {
//             state.nickName = action.payload
//         },
//         setFindResults(state, action) {
//             state.findResults = {user: action.payload}
//         },
//         logOut(state, action) {
//             state = initialState
//         }
//     }
// })
const currentDialogInitialState = {
    isFetching:false,
    id: '',
    name: '',
    messages: []
}

const currentDialogSlice = createSlice({
    name: "currentDialog",
    initialState: currentDialogInitialState,
    reducers: {
        setCurrentDialogFetching(state, action){
            state.isFetching=action.payload;
        },
        setCurrentDialog(state, action) {
            const currentDialog = action.payload;
            state.id = currentDialog.id
            state.name = currentDialog.name
            //console.log(action.payload)
        },
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
        setDialogMessages(state, action) {
            state.messages = action.payload
        },

    }
})


const currentUserInitialState = {
    isFetching:false,
    id: '',
    nickName: '',
    name: '',
    dialogList: []
}
const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: currentUserInitialState,
    reducers: {
        setCurrentUserFetching(state, action){
            state.isFetching=action.payload;
        },
        setCurrentUser(state, action) {
            state.id = action.payload.id
            state.nickName = action.payload.nickName
            state.name = action.payload.name
        },
        setDialogList(state, action) {
            state.dialogList = action.payload
        },
        setNickName(state, action) {
            state.nickName = action.payload
        },
        logOut(state) {
            state = currentUserInitialState
        }
    }
})
//export default currentUserSlice.reducer;
export const currentUserReducer = currentUserSlice.reducer;
export const currentDialogReducer = currentDialogSlice.reducer;
export const {setCurrentUserFetching, setCurrentUser, setDialogList, setNickName, logOut} = currentUserSlice.actions
export const {setCurrentDialogFetching, addMessage, setCurrentDialog, setDialogMessages} = currentDialogSlice.actions


