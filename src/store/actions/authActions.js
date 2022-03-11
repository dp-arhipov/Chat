import {Auth, DB} from "../../API";
import {
    resetDialogList,
    resetFinder,
    resetUser,
    setCurrentUserProps,
    resetCurrentDialog
} from "../slices";

export const initAuth = () => {
    return async function disp(dispatch, getState) {
        return Auth.authHandler(async (user) => {
            if (user) {
                dispatch(setCurrentUserProps({isLoggedIn:true, status: 'LOADED'}))
                if(user.displayName==null) user.displayName = "Юзер Юзерович"
                user = await DB.createUser(user.uid, user.displayName, user.email);

                dispatch(setCurrentUserProps({id: user.id, nickName: user.nickName, name: user.name}))
            }else{
                dispatch(setCurrentUserProps({isLoggedIn:false, status: 'LOADED'}))
            }
        });
    }
}


export const emailLogin = (email, password) => {
    return async function disp(dispatch, getState) {
        return  Auth.emailLogin(email, password) ;
    }
}
export const emailSignUp = (email, password) => {
    return async function disp(dispatch, getState) {
        return  Auth.emailSignUp(email, password) ;
    }
}

export const googleLogIn = () => {
    return async function disp(dispatch, getState) {
        return Auth.googleLogin();
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




