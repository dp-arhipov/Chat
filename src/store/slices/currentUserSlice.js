import {createSlice} from "@reduxjs/toolkit";

const currentUserInitialState = {
    status: 'FETCHING',
    id: '',
    nickName: '',
    name: '',
    isLoggedIn:false
}

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: currentUserInitialState,
    reducers: {

        setCurrentUserProps(state, action){
            const {id,name,nickName,status, isLoggedIn} = action.payload;
            if(id)state.id = id;
            if(name)state.name = name;
            if(nickName)state.nickName = nickName;
            if(status)state.status = status;
            if(isLoggedIn)state.isLoggedIn = isLoggedIn;
        },
        resetUser(state, action) {
            Object.assign(state, currentUserInitialState)
        }
    }
})


export const currentUserReducer = currentUserSlice.reducer;


export const {setCurrentUserProps, setCurrentUser, setNickName, setName, resetUser} = currentUserSlice.actions
