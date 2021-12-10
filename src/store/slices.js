import {createSlice} from "@reduxjs/toolkit";

const dialogListInitialState = {
    isFetching: false,
    currentDialogId: '',
    dialogs: {}

}

const dialogListSlice = createSlice({
    name: "dialogListSlice",
    initialState: dialogListInitialState,
    reducers: {
        setCurrentDialogFetchingTest(state, action){
            state.isFetching=action.payload;
        },
        setDialogListTest(state, action) {
            const dialogList = action.payload;
            //state.dialogs = dialogList

            for(const dialog of dialogList){
                state.dialogs[dialog.id] = {...dialog, messages:[]};
                //state.dialogs.push({...dialog, messages:[]});
            }
            //return dialogList
        },
        addMessageTest(state, action) {
            const id = state.currentDialogId
            state.dialogs[id].messages.push(action.payload)
        },
        setCurrentDialogMessagesTest(state, action) {
            const id = state.currentDialogId
            state.dialogs[id].messages = action.payload

        },
        setCurrentDialogIdTest(state, action) {
            //const currentDialog = action.payload;
            state.currentDialogId = action.payload
            // state.currentDialog.name = currentDialog.name
            // state.currentDialog.memberId = currentDialog.memberId
        },
        addOldDialogMessagesTest(state, action){
                const id = state.currentDialogId
                state.dialogs[id].messages = [...action.payload,...state.dialogs[id].messages]
        },
        // setDialogMessages(state, action) {
        //     state.messages = action.payload
        // },
        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
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
const currentLoggedInUserInitialState = {
    isFetching: false,
    id: 'yJiN8j3mxxVhT7mejKfXnhW0OfF3',
    nickName: 'user_9zBQN6aK',
    name: 'Даниил Архипов',
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

export const findResultsReducer = findResultsSlice.reducer;
export const dialogListReducer = dialogListSlice.reducer;
export const {setCurrentUserFetching, setCurrentUser, setDialogList, setNickName, setName, resetUser} = currentUserSlice.actions
export const {setFindResultsFetching, setFindResults, resetFindResults} = findResultsSlice.actions

export const {setDialogListTest, addMessageTest, setCurrentDialogIdTest, setCurrentDialogMessagesTest, addOldDialogMessagesTest, resetDialogList} = dialogListSlice.actions


