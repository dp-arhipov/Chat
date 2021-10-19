import {createSlice, current} from "@reduxjs/toolkit";

const dialogListInitialState = {
    isFetching: true,
    currentDialogId: '',
    currentDialogScrollPosition: 0,
    dialogs: {}
}

const dialogInitialState = {
    isFetching: false,
    dialogId: '',
    scrollPosition: 0,
    messages: []
}

const dialogListSlice = createSlice({
    name: "dialogListSlice",
    initialState: dialogListInitialState,
    reducers: {

        addCurrentDialogMessage(state, action) {
            const id = state.currentDialogId
            state.dialogs[id].messages.push(action.payload)
        },
        addDialogMessage(state, action) {
            const id = action.payload.dialogId
            const message = action.payload.message
            state.dialogs[id].messages.push(message)
        },

        setCurrentDialogFetching(state, action) {
            state.isFetching = action.payload;
        },

        addSomeLastCurrentDialogMessages(state, action) {
            const id = state.currentDialogId
            state.dialogs[id].messages = action.payload

        },
        setCurrentDialogId(state, action) {
            //const currentDialog = action.payload;
            state.currentDialogId = action.payload
            // state.currentDialog.name = currentDialog.name
            // state.currentDialog.memberId = currentDialog.memberId
        },

        addSomeOldCurrentDialogMessages(state, action) {
            const dialogId = state.currentDialogId
            state.dialogs[dialogId].messages = [...action.payload, ...state.dialogs[dialogId].messages]
        },


        updateDialogName(state, action) {
            const dialogId = action.payload.dialogId
            state.dialogs[dialogId].name = action.payload.name
        },
        setCurrentDialogScrollPosition2(state, action) {

            state.currentDialogScrollPosition = action.payload.scrollPosition
        },

        setDialogScrollPosition(state, action) {
            const id = action.payload.dialogId
            const position = action.payload.scrollPosition
            state.dialogs[id].scrollPosition = position;
        },
        updateMessageTimestamp(state, action) {
            const messageId = action.payload.messageId;
            const dialogId = action.payload.dialogId;
            const messages = state.dialogs[dialogId].messages;
            const timestamp = action.payload.timestamp;
            for (const message of messages) {
                if (message.messageId == messageId) {
                    message.timestamp = timestamp;
                    break;
                }
            }
        },
        setDialogFetching(state, action) {

            const id = action.payload.dialogId
            const isFetching = action.payload.isFetching
            state.dialogs[id].isFetching = isFetching
        },
        setDialogListFetching(state, action) {
            const isFetching = action.payload
            state.isFetching = isFetching
        },

        addDialog(state, action) {

            const id = action.payload.id;
            //delete action.payload.id;
            state.dialogs[id] = {...action.payload, messages: []}


            //state.dialogs
        },
        setDialogList(state, action) {

            const dialogList = action.payload;
            //state.dialogs = dialogList

            for (const dialog of dialogList) {
                state.dialogs[dialog.id] = {...dialog, messages: []};
                //state.dialogs.push({...dialog, messages:[]});
            }
            //return dialogList
        },
        // addDialogMessage(state, action) {
        //     const id = action.payload.dialogId
        //     const message = action.payload.message
        //     state.dialogs[id].messages.push(message)
        // },
        addDialogMessages(state, action) {
            const id = action.payload.dialogId
            const messages = action.payload.messages

            state.dialogs[id].messages = messages;
        },
        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
        }

    }
})


export const dialogListReducer = dialogListSlice.reducer;
export const {updateDialogName, setDialogListFetching, addDialogMessageBefore, addDialog, setCurrentDialogScrollPosition2, setDialogScrollPosition, setDialogList, setDialogFetching, addDialogMessage, addDialogMessages, updateMessageTimestamp, addCurrentDialogMessage, setCurrentDialogId, addSomeLastCurrentDialogMessages, addSomeOldCurrentDialogMessages, resetDialogList} = dialogListSlice.actions


