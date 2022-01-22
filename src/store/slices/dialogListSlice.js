import {createSlice, current} from "@reduxjs/toolkit";
const dialogListInitialState = {

    status:'LOADED',
    dialogList: {}
}

const dialogInitialState = {
    status:'FETCHING',
    dialogId: '',
    scrollPosition: -1,
    messages: []
}


const messageInitialState = {
    status:'FETCHING',
    messageId: '',
    creatorId: '',
    text: '',
    date: '',
    time: '',
    timestamp: ''
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
            // if(isReaded) messagesInState.find(message=>message.messageId == messageId).isReaded = isReaded
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
    resetDialogList
} = dialogListSlice.actions


