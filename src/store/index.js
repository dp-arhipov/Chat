import {configureStore} from "@reduxjs/toolkit";
import {currentUserReducer, finderReducer, dialogListReducer, currentDialogReducer} from "./slices/"

export const store = configureStore({
        reducer: {
            currentUser: currentUserReducer,
            dialogs: dialogListReducer,
            currentDialog: currentDialogReducer,
            finder: finderReducer,
        },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    }
);

