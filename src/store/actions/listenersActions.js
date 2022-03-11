import {DB} from "../../API";
import {
    addDialog,
    pushDialogMessages,
    setDialogProps,
    setCurrentUserProps
} from "../slices";

import * as selectors from "../selectors"
import {createSavedMessages, setDialogMessageIsReaded} from "./dialogActions";
import {useSelector} from "react-redux";


const messageLoadLimit = 10;


export const init = () => {
    return async function disp(dispatch, getState) {
        dispatch(createSavedMessages())
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
            dispatch(addDialog(dialog))
            await dispatch(addDialogNameListener(dialog.dialogId))
            await dispatch(addDialogMessagesListener(dialog.dialogId))
            DB.addDialogInfoListener(dialog.dialogId, (id,data)=>{
                dispatch(setDialogProps({dialogId:dialog?.dialogId, lastRead: data?.lastRead}))
            })


        })
    }
}

export const addDialogNameListener = (dialogId) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        const dialog = selectors.dialog(getState(), dialogId);
        let dialogToListen = {dialogId: dialog.dialogId, userId: dialog.currentUserId};
        if (dialog.creatorId == currentUserId && dialog.companionId == currentUserId) {
            dispatch(setDialogProps({dialogId: dialogToListen.dialogId, name: 'Избранное'}))
            return;
        };

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
        const currentUserId = selectors.currentUserId(getState());
        const dialog = selectors.dialogInfo(getState(), dialogId);
        const lastReadedMessage = dialog.lastReadedMessageBy(currentUserId);
        const lastReadedMessageId = lastReadedMessage.id;
        const lastMessageTimestamp = dialog.lastMessage.timestamp;

        if (lastReadedMessageId) {
            let loadedMoreMessages=[]
            const unreadedMessages = await DB.getDialogMessages(dialogId, lastReadedMessageId, 100)

            const needToLoadMoreNumber = messageLoadLimit - unreadedMessages.length;

            if (needToLoadMoreNumber) {
                loadedMoreMessages = await DB.getDialogMessages(dialogId, lastReadedMessageId, -(needToLoadMoreNumber))

            }

            const messagesToAdd = [...loadedMoreMessages,...unreadedMessages];
            dispatch(pushDialogMessages({dialogId, messages: messagesToAdd}))

        }

        const r = await DB.addDialogMessagesListener(
            dialogId,
            (dialogId, message) => {
                const lastMessage =  selectors.dialogInfo(getState(), dialogId).lastMessage
                const lastMessageTimestamp =  lastMessage?.timestamp

                if (!lastMessage.id) {
                    dispatch(pushDialogMessages({dialogId, message}))
                }
                else if (lastMessageTimestamp) {
                    if (message.timestamp.toMillis() > lastMessageTimestamp.toMillis()) {
                        dispatch(pushDialogMessages({dialogId, message}))
                    }
                }

            });
        dispatch(setDialogProps({dialogId, status:"LOADED"}))
        return r;
    }
}




