import {createSlice, current} from "@reduxjs/toolkit";
const dialogListInitialState = {

    status:'LOADED',
    currentDialogId: '',
    currentDialogScrollPosition: 0,
    dialogList: {}
}

const dialogInitialState = {
    status:'FETCHING',
    dialogId: '',
    scrollPosition: 0,
    messages: []
}

const dialogListSlice = createSlice({
    name: "dialogListSlice",
    initialState: dialogListInitialState,
    reducers: {


        pushDialogMessages(state, action){
            let {dialogId, messages,message} = action.payload
            const messagesInState = state.dialogList[dialogId].messages
            if(message) messagesInState.push(message)
            if(messages) messagesInState.push(...messages)
        },
        shiftDialogMessages(state, action){
            let {dialogId, messages,message} = action.payload
            if(message) state.dialogList[dialogId].messages = [message, ...state.dialogList[dialogId].messages]
            if(messages) state.dialogList[dialogId].messages = [...messages, ...state.dialogList[dialogId].messages]
        },

        setDialogMessageProps(state, action) {
            const {dialogId, messageId, status, timestamp} = action.payload
            const messagesInState = state.dialogList[dialogId].messages
            if(status) messagesInState.find(message=>message.messageId == messageId).status = status
            if(timestamp) messagesInState.find(message=>message.messageId == messageId).timestamp = timestamp
        },

        setDialogProps(state, action) {
            const {dialogId, status, name, scrollPosition} = action.payload
            const dialogInState = state.dialogList[dialogId]
            if(status) dialogInState.status = status
            if(name) dialogInState.name = name
            if(scrollPosition) dialogInState.scrollPosition = scrollPosition
        },

        setDialogListProps(state, action) {
            const {status} = action.payload;
            if(status) state.status = status
           },

        addDialog(state, action) {
            const {dialogId} = action.payload;
            state.dialogList[dialogId] = {...dialogInitialState,...action.payload}
        },

        setCurrentDialogId(state, action) {
            state.currentDialogId = action.payload
        },
        setCurrentDialogScrollPosition2(state, action) {
            state.currentDialogScrollPosition = action.payload.scrollPosition
        },


        resetDialogList(state, action) {
            Object.assign(state, dialogListInitialState)
        }

    }
})


export const dialogListReducer = dialogListSlice.reducer;
export const {
    setDialogListProps,
    setDialogProps,
    setDialogMessageProps,
    shiftDialogMessages,
    pushDialogMessages,
    addDialog,
    setCurrentDialogScrollPosition2,
    setCurrentDialogId,
    resetDialogList
} = dialogListSlice.actions


