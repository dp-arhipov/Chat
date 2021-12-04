import {applyMiddleware, combineReducers, createStore} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {configureStore, createAction} from "@reduxjs/toolkit";
import reduxReset from 'redux-reset'
import {currentUserReducer, currentDialogReducer, findResultsReducer} from "./slices"

export const store = configureStore({
    reducer: {
        currentUser:currentUserReducer,
        currentDialog:currentDialogReducer,
        findResults: findResultsReducer
    },
    //middleware: reduxReset()
    }
);