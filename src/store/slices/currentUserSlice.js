import {createSlice} from "@reduxjs/toolkit";

const currentUserInitialState = {
    isFetching: false,
    id: '',
    nickName: '',
    name: '',
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


export const currentUserReducer = currentUserSlice.reducer;


export const {setCurrentUserFetching, setCurrentUser, setNickName, setName, resetUser} = currentUserSlice.actions
