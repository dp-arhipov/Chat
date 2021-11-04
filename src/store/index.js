import {applyMiddleware, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {currentUser: false, currentDialog: false, dialogList: [], messages: []}


function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: action.payload
            }
        case "SET_CURRENT_DIALOG":
            return {
                ...state,
                currentDialog: state.dialogList.filter(dialog => dialog.id == action.payload)[0]
            }
        case "ADD_MESSAGE":
            return {
                ...state,
                //messages: action.payload
                messages: [...state.messages, action.payload]
            }
        case "SET_MESSAGES":
            return {
                ...state,
                //messages: action.payload
                messages: action.payload
            }
        case "SET_DIALOG_LIST":
            return {
                ...state,
                //messages: action.payload
                dialogList: action.payload
            }
        case "SET_NICK_NAME":
            return {
                ...state,
                //messages: action.payload
                dialogList: action.payload
            }
        case "SET_FIND_RESULTS":
            return {
                ...state,
                //messages: action.payload
                findResults: {user: action.payload}
            }
        case "LOGOUT":
            return {
                ...initialState
            }

    }

    return state;
};

//
// const vars={
//     currentMember,
//     currenUser,
//     currentDialog
// }

// export const store = createStore(reducer);


export const store = createStore(
    reducer,
    composeWithDevTools(
        //applyMiddleware(...middleware)
        // other store enhancers if any
    )
);
//
// store.dispatch({type: 'ADD_USER', payload: '5'})
// store.dispatch({type: 'ADD_USER', payload: '5'})