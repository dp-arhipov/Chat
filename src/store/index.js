import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer, finderReducer, dialogListReducer} from "./slices/"

export const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
            finder: finderReducer,
            dialogs: dialogListReducer
        },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    }
);

