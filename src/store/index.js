import {applyMiddleware, combineReducers, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {configureStore, createAction} from "@reduxjs/toolkit";
import reduxReset from 'redux-reset'
import {currentUserReducer, currentDialogReducer, findResultsReducer, dialogListReducer} from "./slices"

export const store = configureStore({
    reducer: {
        currentUser:currentUserReducer,
        findResults: findResultsReducer,
        dialogList: dialogListReducer
    },
    //middleware: reduxReset()
    }
);