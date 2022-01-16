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

        setCurrentUserProps(state, action){
            const {id,name,nickName,status} = action.payload;
            if(id)state.id = id;
            if(name)state.name = name;
            if(nickName)state.nickName = nickName;
            if(status)state.status = status;
        },
        resetUser(state, action) {
            Object.assign(state, currentUserInitialState)
        }
    }
})


export const currentUserReducer = currentUserSlice.reducer;


export const {setCurrentUserProps, setCurrentUser, setNickName, setName, resetUser} = currentUserSlice.actions
