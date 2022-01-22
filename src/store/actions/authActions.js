import {Auth, DB} from "../../API";
import {
    resetDialogList,
    resetFinder,
    resetUser,
    setCurrentUserProps,
    resetCurrentDialog
} from "../slices";

export const initApp = () => {
    return async function disp(dispatch, getState) {
        Auth.authHandler(async (user) => {
            if (user) {
                user = await DB.createUser(user.uid, user.displayName);
                dispatch(setCurrentUserProps({id: user.id, nickName: user.nickName, name: user.name}))
            }
        });
    }
}

export const logIn = () => {
    return async function disp(dispatch, getState) {
        await Auth.googleLogin();
    }
}


export const logOut = () => {
    return async function disp(dispatch, getState) {
        Auth.logOut();
        dispatch(resetUser())
        dispatch(resetFinder())
        dispatch(resetDialogList())
        dispatch(resetCurrentDialog())
        DB.removeListeners();
    }
}




