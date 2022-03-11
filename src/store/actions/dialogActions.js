import {DB} from "../../API";
import {
    shiftDialogMessages,
    setCurrentDialogId,
    // setCurrentDialogScrollPositionTemp,
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

        // const test = selectors.test(getState(), dialogId);

        //dispatch(setDialogMessageProperty({dialogId: dialogId,messageId:messageId, status:"1" }))
       // const l1 = await dispatch(getDialogUnreadMessages())
            // const l2 = await dispatch(firstLoadMessages())
        //l2.map(item=>{l2.find(item.messageId);})
        //const load = (l1.length<10)?l2:l1;
       // console.log(l1,l2)
        // console.log(await dispatch(getDialogUnreadMessages()));
        // console.log(await dispatch(firstLoadMessages()));

    }
}

// export const setDialogMessageIsReaded = (dialogId, messageId) => {
//     return async function disp(dispatch, getState) {
//         dispatch(setDialogMessageProps({dialogId, messageId, status: "READED"}))
//         await DB.setDialogMessageProps(dialogId, messageId, {status: "READED"} );
//
//     }
// }

// export const getDialogUnreadMessages  = () => {
//     return async function disp(dispatch, getState) {
//         const currentDialogId = selectors.currentDialog(getState()).dialogId
//         const currentUserId = selectors.currentUserId(getState())
//         const lastReadedMessageId = selectors.currentDialog(getState()).lastRead[currentUserId].messageId
//         console.log(lastReadedMessageId);
//         const unreadMessages = await DB.getDialogUnreadMessages(currentDialogId, 10, lastReadedMessageId)
//
//         //dispatch(setDialogProps({dialogId:currentDialogId, lastRead:lastReaded}))
//         return unreadMessages;
//     }
// }

// export const firstLoadMessages  = () => {
//     return async function disp(dispatch, getState) {
//         const loadLimit = 10;
//         const currentDialogId = selectors.currentDialog(getState()).dialogId
//
//         const lastTenMessages = await DB.getDialogMessages(currentDialogId, loadLimit)
//        // console.log(if(lastTenMessages.length<loadLimit)))
//
//         //dispatch(setDialogProps({dialogId:currentDialogId, lastRead:lastReaded}))
//         return lastTenMessages;
//     }
// }


export const setCurrentDialogLastRead = (messageTimeStamp, messageId) => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState())
        const dialogId = selectors.currentDialogId(getState())
        const lastReadedMessage = selectors.currentDialogInfo(getState()).lastReadedMessageBy(currentUserId);
        console.log( selectors.currentDialogInfo(getState()).lastReadedMessageBy(currentUserId))
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
        //dispatch(setCurrentDialogFetching(true))
        //const isDialogListFetching = selectors.isDialogListFetching(getState())
        // const dialogIdPrevious = selectors.currentDialogId(getState());
        //
        //
        // if (dialogIdPrevious&&dialogIdPrevious!='none') {
        //     //console.log(dialogIdPrevious)
        //     const scrollPosition = selectors.currentDialogScrollPositionTemp(getState());
        //     console.log(scrollPosition)
        //     dispatch(setDialogProps({dialogId: dialogIdPrevious, scrollPosition: scrollPosition}))
        // }
        dispatch(setCurrentDialogId(dialogId));
       //  const currentDialog = selectors.dialog(getState(),dialogId)
       // if(!currentDialog.lastRead) dispatch(setLastRead(serverTimestamp()))


    }
}
//
// export const setLastActiveTime = (dialogId)=>{
//     return async function disp(dispatch, getState) {
//         const creatorId = selectors.currentUserId(getState());
//         await DB.setLastActiveTime(creatorId, dialogId)
//     }
// }

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialog = selectors.currentDialogInfo(getState());
        const dialogId = dialog.id;
        const lastVisibleMessageId = dialog?.firstMessage?.id;
        let messages=[];
        // const lastFirstId = DB.getFirstMessageId();

        // const messages = await DB.getDialogMessages(dialogId, messageLoadLimit, lastVisibleMessageId)
        // console.log(dialogId, messageLoadLimit, lastVisibleMessageId, messages)
        if(lastVisibleMessageId) {
            messages = await DB.getDialogMessages(dialogId, lastVisibleMessageId, -messageLoadLimit)
            // console.log(`messages old: ${lastVisibleMessageId}`, messages )

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
               // const dialogId2 = selectors.currentDialogId(getState());
                //console.log(dialogId2)
                //dispatch(setLastRead(serverTimestamp(), dialogId))
                dispatch(setDialogListProps({status: "LOADED"}))
                //dispatch(setCurrentDialogId(dialogId))

                //await dispatch(loadDialogList());
            }
        }


    };
}

export const createSavedMessages = () => {
    return async function disp(dispatch, getState) {
        const userId = selectors.currentUserId(getState())
            let dialogId = await DB.isSavedMessagesExist(userId);
        console.log(userId)
            if (!dialogId) {
                dispatch(setDialogListProps({status: "FETCHING"}))
                return DB.createDialogWith(userId);
                dispatch(setDialogListProps({status: "LOADED"}))
                //await dispatch(loadDialogList());
            }
        }

}

//
// export const setCurrentDialogScrollPosition = (scrollPosition) => {
//     return async function disp(dispatch, getState) {
//         //console.log(selectors.currentDialogId(getState());)
//         const dialogId = selectors.currentDialogId(getState());
//         dispatch(setDialogProps({dialogId, scrollPosition}));
//     }
// }

// export const setCurrentDialogTempScrollPosition = (scrollPosition) => {
//     return async function disp(dispatch, getState) {
//         dispatch(setCurrentDialogScrollPositionTemp(scrollPosition));
//     }
// }




