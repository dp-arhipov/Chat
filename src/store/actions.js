import {Auth, DB} from "../API/firebaseInit";
import {
    addMessage,
    setCurrentDialog,
    setCurrentDialogFetching,
    setCurrentUser,
    setDialogList,
    setDialogMessages
} from "./toolkit";
//import {setDialogMessages} from "../API";
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

// export const loadDialogMessages = (dialogId) => {
//     return async function disp(dispatch) {
//         DB.getDialogMessages(dialogId).then((messages)=>{
//             dispatch(setDialogMessages(messages))
//         });
//     }
// }

export const setDefaultDialog = () => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogFetching(true))
        DB.getUserDialogs(getState().currentUser.id).then((dialogList) => {
            dispatch(setDialogList(dialogList));
            dispatch(setCurrentDialog(dialogList[0]));
            //dispatch(loadDialogMessages(dialogList[0].id));
            DB.getDialogMessages(dialogList[0].id).then((messages) => {
                dispatch(setDialogMessages(messages))
                dispatch(setCurrentDialogFetching(false))
            });

        });
    }
}

export const sendMessage = (text) => {
    return async function disp(dispatch, getState) {
        const senderId = getState().currentUser.id;
        const dialogId = getState().currentDialog.id;
        DB.sendMessage(senderId, dialogId, text);

        const now = new Date();
        const message = {
            id: senderId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        dispatch(addMessage(message));
    }
}

export const changeCurrentDialog = (dialogID) => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogFetching(true))
        const currentDialog = getState().currentUser.dialogList.filter(item => item.id == dialogID)[0];
        dispatch(setCurrentDialog(currentDialog));
        DB.getDialogMessages(dialogID).then((messages) => {
            dispatch(setDialogMessages(messages))
            dispatch(setCurrentDialogFetching(false))
        });


    }
}


// export const changeCurrentDialog = (dialogId="") => {
//     return async function disp(dispatch, getState) {
//         dialogId = getState().currentUser.dialogList[0].id
//         dispatch(setCurrentDialog(dialogId));
//     }
// }
