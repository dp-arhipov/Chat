import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer, findResultsReducer, dialogListReducer} from "./slices/"

export const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
            findResults: findResultsReducer,
            dialogs: dialogListReducer
        },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    }
);

