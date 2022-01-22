import {DB} from "../../API";
import {
    shiftDialogMessages,
    setCurrentDialogId,
    setCurrentDialogScrollPositionTemp,
    pushDialogMessages,
    setDialogMessageProps,
    setDialogProps,
    setDialogListProps,
} from "../slices";

import * as selectors from "../selectors"
import {nanoid} from "nanoid";
import * as selector from "../selectors";

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
            isReaded: false,
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

        const test = selectors.test(getState(), dialogId);
        //dispatch(setDialogMessageProperty({dialogId: dialogId,messageId:messageId, status:"1" }))
    }
}

export const setMessageIsReaded = (dialogId, messageId) => {
    return async function disp(dispatch, getState) {
        dispatch(setDialogMessageProps({dialogId, messageId, status: "READED"}))
        await DB.setDialogMessageProps(dialogId, messageId, {status: "READED"} );
    }
}

export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        //dispatch(setCurrentDialogFetching(true))
        //const isDialogListFetching = selectors.isDialogListFetching(getState())
        const dialogIdPrevious = selectors.currentDialogId(getState());


        if (dialogIdPrevious) {
            //console.log(dialogIdPrevious)
            const scrollPosition = selectors.currentDialogScrollPositionTemp(getState());
            console.log(scrollPosition)
            dispatch(setDialogProps({dialogId: dialogIdPrevious, scrollPosition: scrollPosition}))
        }
        dispatch(setCurrentDialogId(dialogId));


    }
}

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const lastVisibleMessageId = selectors.currentDialogFirstMessageId(getState());

        // const lastFirstId = DB.getFirstMessageId();

        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit, lastVisibleMessageId)
        dispatch(shiftDialogMessages({dialogId, messages}))
        return messages;
    }

}


export const createDialogWith = (userId) => {
    return async function disp(dispatch, getState) {
        if (userId != selectors.currentUserId(getState())) {
            let dialogId = await DB.findDialogByCompanionId(userId);
            console.log(dialogId)
            if (!dialogId) {
                dispatch(setDialogListProps({status: "FETCHING"}))
                dialogId = await DB.createDialogWith(userId);
                dispatch(setDialogListProps({status: "LOADED"}))
                //await dispatch(loadDialogList());
            }

            dispatch(setCurrentDialog(dialogId));
        }


    };
}


export const setCurrentDialogScrollPosition = (scrollPosition) => {
    return async function disp(dispatch, getState) {
        //console.log(selectors.currentDialogId(getState());)
        const dialogId = selectors.currentDialogId(getState());
        dispatch(setDialogProps({dialogId, scrollPosition}));
    }
}

export const setCurrentDialogTempScrollPosition = (scrollPosition) => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogScrollPositionTemp(scrollPosition));
    }
}




