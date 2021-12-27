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
        setCurrentDialogFetching(state, action){
            state.isFetching=action.payload;
        },
        setDialogFetching(state, action){
            const id = action.payload.dialogId
            const isFetching  = action.payload.isFetching
            state.dialogs[id].isFetching = isFetching
        },
        setDialogList(state, action) {
            const dialogList = action.payload;
            //state.dialogs = dialogList

            for(const dialog of dialogList){
                state.dialogs[dialog.id] = {...dialog, messages:[]};
                //state.dialogs.push({...dialog, messages:[]});
            }
            //return dialogList
        },
        addDialogMessage(state, action) {
            const id = action.payload.dialogId
            const message  = action.payload.message
            state.dialogs[id].messages.push(message)
        },
        // addMessageTimestamp(state, action) {
        //     const dialogId = action.payload.dialogId
        //     const messageId  = action.payload.messageId
        //     state.dialogs[dialogId].messages.find(message=>message.messageId == messageId)
        // },
        addDialogMessages(state, action) {
            const id = action.payload.dialogId
            const messages  = action.payload.messages
            console.log(action.payload)
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
        addSomeOldCurrentDialogMessages(state, action){
            const dialogId = state.currentDialogId
            state.dialogs[dialogId].messages = [...action.payload,...state.dialogs[dialogId].messages]
        },
        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
        }

    }
})



export const dialogListReducer = dialogListSlice.reducer;
export const {setDialogList, setDialogFetching, addDialogMessage, addDialogMessages, addCurrentDialogMessage, setCurrentDialogId, addSomeLastCurrentDialogMessages, addSomeOldCurrentDialogMessages, resetDialogList} = dialogListSlice.actions


