import {DB} from "../../API";
import {
    addDialog,
    pushDialogMessages,
    setDialogProps,
    setCurrentUserProps
} from "../slices";

import * as selectors from "../selectors"
import {setDialogMessageIsReaded} from "./dialogActions";


const messageLoadLimit = 10;


export const init = () => {
    return async function disp(dispatch, getState) {
        dispatch(addUserInfoListener());
        await dispatch(addDialogListListener())

    }
}


export const addUserInfoListener = () => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        const r = await DB.addUserInfoListener(currentUserId, (userInfo) => {
            const currentUserName = selectors.currentUserName(getState());
            const currentUserNickName = selectors.currentUserNickName(getState());
            if (userInfo.name != currentUserName) {
                dispatch(setCurrentUserProps({name:userInfo.name}))
            }
            if (userInfo.nickName != currentUserNickName) dispatch(setCurrentUserProps({nickName:userInfo.nickName}))

        })
        return r;
    }
}



export const addDialogListListener = () => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        return await DB.addDialogListListener(currentUserId, async (dialog) => {
            //dispatch(setDialogListProperty({status:"FETCHING"}))
            dispatch(addDialog(dialog))
            await dispatch(addDialogNameListener(dialog.dialogId))
            await dispatch(addDialogMessagesListener(dialog.dialogId))
            //dispatch(setDialogListProperty({status:"LOADED"}))

        })
    }
}

export const addDialogNameListener = (dialogId) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        const dialog = selectors.dialog(getState(), dialogId);
        let dialogToListen = {dialogId: dialog.dialogId, userId: dialog.currentUserId};
        if (dialog.companionId != currentUserId) dialogToListen.userId = dialog.companionId
        else if (dialog.creatorId != currentUserId) dialogToListen.userId = dialog.creatorId

        return await DB.addUserInfoListener(dialogToListen.userId, (userInfo) => {
            dispatch(setDialogProps({dialogId: dialogToListen.dialogId, name: userInfo.name}))
        })

    }
}

export const addDialogMessagesListener = (dialogId) => {
    return async function disp(dispatch, getState) {
        dispatch(setDialogProps({dialogId, status:"FETCHING"}))
        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit)
        dispatch(pushDialogMessages({dialogId, messages}))
        const r = await DB.addDialogMessagesListener(
            dialogId,
            (dialogId, message) => {

                //console.log(message)
                if(message.status=="READED") dispatch(setDialogMessageIsReaded(dialogId, message.messageId));


                const lastMessage =  selectors.dialogLastMessage(getState(), dialogId)
                if (!lastMessage) {
                    dispatch(pushDialogMessages({dialogId, message}))
                }
                else if (lastMessage.hasOwnProperty("timestamp")) {
                    if (message.timestamp.toMillis() > lastMessage.timestamp.toMillis()) {
                        dispatch(pushDialogMessages({dialogId, message}))
                    }
                }

            });
        dispatch(setDialogProps({dialogId, status:"LOADED"}))
        return r;
    }
}




