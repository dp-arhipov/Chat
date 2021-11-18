import {Auth, DB} from "../API/firebaseInit";
import {setCurrentDialog, setCurrentUser, setDialogList, setDialogMessages} from "./toolkit";
//import {setDialogMessages} from "../API";
import {store} from "./index";
//import {setCurrentDialog} from "../API";

export const logIn = () => {
    return async function disp(dispatch, getState) {
        let user = await Auth.googleLogin();
        user = await DB.createUser(user.uid, user.displayName);
        dispatch(setCurrentUser(user));
    }
}

// export const loadDialogList = (userId = "") => {
//     return async function disp(dispatch, getState) {
//         //console.log(getState().currentUser.id)
//         userId = getState().currentUser.id;
//         const dialogList = await DB.getUserDialogs(userId);
//         dispatch(setDialogList(dialogList));
//     }
// }
//
// const loadDialogList2 = async (userId = "") => {
//     const dialogList = await DB.getUserDialogs(userId);
//     return dialogList;
// }

// const loadDialogMessages = (dispatch, dialogId) => {
//     DB.getDialogMessages(dialogId).then((messages)=>{
//         dispatch(setDialogMessages(messages))
//     });
// }

export const loadDialogMessages = (dialogId) => {
    return async function disp(dispatch) {
        DB.getDialogMessages(dialogId).then((messages)=>{
            dispatch(setDialogMessages(messages))
        });
    }
}

export const setDefaultDialog = () => {
    return async function disp(dispatch, getState) {
        DB.getUserDialogs(getState().currentUser.id).then((dialogList) => {
            dispatch(setDialogList(dialogList));
            dispatch(setCurrentDialog(dialogList[0]));
            dispatch(loadDialogMessages(dialogList[0].id));
        });
    }
}

// export const setCurrentDialog2 = (dialogId="") => {
//     return async function disp(dispatch, getState) {
//         dialogId = getState().currentUser.dialogList[0].id
//         dispatch(setCurrentDialog(dialogId));
//     }
// }
