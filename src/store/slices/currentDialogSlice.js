import {createSlice} from "@reduxjs/toolkit";

const currentDialogInitialState = {
    status: 'LOADED',
    id: '',
    // scrollPosition: '',
}

const currentDialogSlice = createSlice({
    name: "currentDialog",
    initialState: currentDialogInitialState,
    reducers: {
        setCurrentDialogId(state, action){
            const id = action.payload;
            if(id) state.id = id;
        },
        setCurrentDialogStatus(state, action){
            const status = action.payload;
            if(status) state.status = status;
        },
        // setCurrentDialogScrollPositionTemp(state, action){
        //     const scrollPosition = action.payload;
        //     if(scrollPosition) state.scrollPosition = scrollPosition;
        // },
        resetCurrentDialog(state, action) {
            Object.assign(state, currentDialogInitialState)
        }
    }
})


export const currentDialogReducer = currentDialogSlice.reducer;
export const {setCurrentDialogId, setCurrentDialogStatus, setCurrentDialogScrollPositionTemp, resetCurrentDialog} = currentDialogSlice.actions
