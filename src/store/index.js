import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer, finderReducer, dialogListReducer} from "./slices/"

export const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
            dialogs: dialogListReducer,
            finder: finderReducer,
        },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    }
);

