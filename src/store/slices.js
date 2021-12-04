import {createSlice} from "@reduxjs/toolkit";

const currentDialogInitialState = {
    isFetching:false,
    id: '',
    name: '',
    memberId: '',
    messages: []
}

const currentDialogSlice = createSlice({
    name: "currentDialog",
    initialState: currentDialogInitialState,
    reducers: {
        setCurrentDialogFetching(state, action){
            state.isFetching=action.payload;
        },
        setCurrentDialogInfo(state, action) {
            const currentDialog = action.payload;
            state.id = currentDialog.id
            state.name = currentDialog.name
            state.memberId = currentDialog.memberId

        },
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
        setDialogMessages(state, action) {
            state.messages = action.payload
        },
        resetCurrentDialog(state, action) {
            Object.assign(state, currentDialogInitialState)
        }

    }
})


const currentUserInitialState = {
    isFetching:false,
    findResults:[],
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
        setName(state, action) {
            state.name = action.payload
        },
        resetUser(state, action) {
            Object.assign(state, currentUserInitialState)
        }
    }
})

const findResultsInitialState = {
    isFetching:false,
    data:[]
}

const findResultsSlice = createSlice({
    name: "findResults",
    initialState: findResultsInitialState,
    reducers: {
        setFindResultsFetching(state, action){
            state.isFetching=action.payload;
        },
        setFindResults(state, action){
            state.data = action.payload
        },
        resetFindResults(state, action) {
            Object.assign(state, findResultsInitialState)
        }
    }
})

export const currentUserReducer = currentUserSlice.reducer;
export const currentDialogReducer = currentDialogSlice.reducer;
export const findResultsReducer = findResultsSlice.reducer;
export const {setCurrentUserFetching, setCurrentUser, setDialogList, setNickName, setName, resetUser} = currentUserSlice.actions
export const {setFindResultsFetching, setFindResults, resetFindResults} = findResultsSlice.actions
export const {setCurrentDialogFetching, addMessage, setCurrentDialogInfo, setDialogMessages, resetCurrentDialog} = currentDialogSlice.actions


