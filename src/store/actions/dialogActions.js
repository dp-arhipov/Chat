import {DB} from "../../API";
import {
    shiftDialogMessages,
    setCurrentDialogId,

    pushDialogMessages,
    setDialogMessageProps,
    setDialogProps,
    setDialogListProps,
} from "../slices";

import * as selectors from "../selectors"
import {nanoid} from "nanoid";
import * as selector from "../selectors";
import {serverTimestamp} from "firebase/firestore";

const messageLoadLimit = 10;

export const sendMessage = (text) => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const creatorId = selectors.currentUserId(getState());

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        const messageId = nanoid(8);

        let message = {
            messageId,
            creatorId: creatorId,
            text: text,
            date: date,
            time: time,
            status: "LOADED"
        }

        dispatch(setDialogProps({dialogId, status: "FETCHING"}))
        dispatch(pushDialogMessages({dialogId, message}));
        dispatch(setDialogMessageProps({dialogId, messageId, status: "FETCHING"}));
        const request = await DB.sendMessage(dialogId, message);
        dispatch(setDialogMessageProps({dialogId, messageId, timestamp: request.timestamp, status: "LOADED"}));
        dispatch(setDialogProps({dialogId, status: "LOADED"}))
    }
}

export const setCurrentDialogLastRead = (messageTimeStamp, messageId) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState())
        const dialogId = selectors.currentDialogId(getState())
        const lastReadedMessage = selectors.currentDialogInfo(getState()).lastReadedMessageBy(currentUserId);
        if (!lastReadedMessage.timestamp || lastReadedMessage?.timestamp?.toMillis() < messageTimeStamp?.toMillis()) {
            dispatch(setDialogProps({
                dialogId: dialogId,
                lastRead: {
                    [currentUserId]: {
                        messageTimeStamp: messageTimeStamp,
                        messageId: messageId
                    }
                }
            }))
            DB.setLastRead(currentUserId, dialogId, messageTimeStamp, messageId)
        }
    }
}







export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogId(dialogId));
    }
}
export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialog = selectors.currentDialogInfo(getState());
        const dialogId = dialog.id;
        const lastVisibleMessageId = dialog?.firstMessage?.id;
        let messages=[];
        if(lastVisibleMessageId) {
            messages = await DB.getDialogMessages(dialogId, lastVisibleMessageId, -messageLoadLimit)
        }
        return messages;
    }
}

export const addCDMessagesTop = (messages) => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        dispatch(shiftDialogMessages({dialogId, messages}))

    }
 }


export const createDialogWith = (userId) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState())
        if (userId != currentUserId) {
            let dialogId = await DB.findDialogByCompanionId(userId);

            if (!dialogId) {
                dispatch(setDialogListProps({status: "FETCHING"}))
                dialogId = await DB.createDialogWith(userId);
                dispatch(setDialogListProps({status: "LOADED"}))
            }
        }


    };
}

export const createSavedMessages = () => {
    return async function disp(dispatch, getState) {
        const userId = selectors.currentUserId(getState())
            let dialogId = await DB.isSavedMessagesExist(userId);
            if (!dialogId) {
                dispatch(setDialogListProps({status: "FETCHING"}))
                return DB.createDialogWith(userId);
                dispatch(setDialogListProps({status: "LOADED"}))
            }
        }

}


