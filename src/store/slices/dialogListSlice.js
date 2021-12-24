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
export const {setDialogList, addDialogMessage, addCurrentDialogMessage, setCurrentDialogId, addSomeLastCurrentDialogMessages, addSomeOldCurrentDialogMessages, resetDialogList} = dialogListSlice.actions


