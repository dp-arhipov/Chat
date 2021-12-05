import {createSlice} from "@reduxjs/toolkit";

const dialogListInitialState = {
    isFetching: false,
    currentDialog: {},
    dialogs: {}

}

const dialogListSlice = createSlice({
    name: "dialogListSlice",
    initialState: dialogListInitialState,
    reducers: {
        // setCurrentDialogFetching(state, action){
        //     state.isFetching=action.payload;
        // },
        setDialogListTest(state, action) {
            const dialogList = action.payload;
            //state.dialogs = dialogList
            for(const dialog of dialogList){
                state.dialogs[dialog.id] = {...dialog, messages:[]};
            }

        },
        addMessageTest(state, action) {
            const id = state.currentDialog.id
            state.dialogs[id].messages.push(action.payload)
        },
        setCurrentDialogMessagesTest(state, action) {
            const id = state.currentDialog.id
            state.dialogs[id].messages = action.payload
        },
        setCurrentDialogInfoTest(state, action) {
            const currentDialog = action.payload;
            state.currentDialog.id = currentDialog.id
            state.currentDialog.name = currentDialog.name
            state.currentDialog.memberId = currentDialog.memberId
        },
        // setDialogMessages(state, action) {
        //     state.messages = action.payload
        // },
        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
        }

    }
})

const currentDialogInitialState = {
    isFetching: false,
    id: '',
    name: '',
    memberId: '',
    messages: []
}

const currentDialogSlice = createSlice({
    name: "currentDialog",
    initialState: currentDialogInitialState,
    reducers: {
        setCurrentDialogFetching(state, action) {
            state.isFetching = action.payload;
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
    isFetching: false,
    findResults: [],
    id: '',
    nickName: '',
    name: '',
    dialogList: []
}
const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: currentUserInitialState,
    reducers: {
        setCurrentUserFetching(state, action) {
            state.isFetching = action.payload;
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
    isFetching: false,
    data: []
}

const findResultsSlice = createSlice({
    name: "findResults",
    initialState: findResultsInitialState,
    reducers: {
        setFindResultsFetching(state, action) {
            state.isFetching = action.payload;
        },
        setFindResults(state, action) {
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
export const dialogListReducer = dialogListSlice.reducer;
export const {setCurrentUserFetching, setCurrentUser, setDialogList, setNickName, setName, resetUser} = currentUserSlice.actions
export const {setFindResultsFetching, setFindResults, resetFindResults} = findResultsSlice.actions
export const {setCurrentDialogFetching, addMessage, setCurrentDialogInfo, setDialogMessages, resetCurrentDialog} = currentDialogSlice.actions
export const {setDialogListTest, addMessageTest, setCurrentDialogInfoTest, setCurrentDialogMessagesTest} = dialogListSlice.actions


