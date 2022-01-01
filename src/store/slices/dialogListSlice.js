import {createSlice, current} from "@reduxjs/toolkit";

const dialogListInitialState = {
    isFetching: false,
    currentDialogId: '',
    dialogs: {}
}

const dialogListSlice = createSlice({
    name: "dialogListSlice",
    initialState: dialogListInitialState,
    reducers: {
        setCurrentDialogFetching(state, action) {

            state.isFetching = action.payload;
        },
        updateMessageTimestamp(state, action) {

            const messageId = action.payload.messageId;
            const dialogId = action.payload.dialogId;
            const messages = state.dialogs[dialogId].messages;
            const timestamp = action.payload.timestamp;
            //console.log(messageId, dialogId, timestamp);
            for (const message of messages) {

                if (message.messageId == messageId) {
                    message.timestamp = timestamp;
                    console.log(current(message));

                    break;
                }
            }
        },
        setDialogFetching(state, action) {

            const id = action.payload.dialogId
            const isFetching = action.payload.isFetching
            state.dialogs[id].isFetching = isFetching
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
        addDialogMessage(state, action) {

            const id = action.payload.dialogId
            const message = action.payload.message
            state.dialogs[id].messages.push(message)
        },
        // addMessageTimestamp(state, action) {
        //     const dialogId = action.payload.dialogId
        //     const messageId  = action.payload.messageId
        //     state.dialogs[dialogId].messages.find(message=>message.messageId == messageId)
        // },
        addDialogMessages(state, action) {
            const id = action.payload.dialogId
            const messages = action.payload.messages

            state.dialogs[id].messages = messages;
        },
        addCurrentDialogMessage(state, action) {
            const id = state.currentDialogId
            state.dialogs[id].messages.push(action.payload)
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
        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
        }

    }
})


export const dialogListReducer = dialogListSlice.reducer;
export const {setDialogList, setDialogFetching, addDialogMessage, addDialogMessages,updateMessageTimestamp, addCurrentDialogMessage, setCurrentDialogId, addSomeLastCurrentDialogMessages, addSomeOldCurrentDialogMessages, resetDialogList} = dialogListSlice.actions


