import {Auth, DB} from "../API";
import {

    shiftDialogMessages,
    resetDialogList,
    resetFinder,
    resetUser,
    setCurrentDialogId,
    setCurrentDialogScrollPosition2,
    addDialog,
    pushDialogMessages,
    setDialogMessageProps,
    setDialogProps,
    setDialogListProps,
    setFinderStatus,
    setFinderResults,
    setCurrentUserProps

} from "./slices";

import * as selectors from "./selectors"
import {nanoid} from "nanoid";
import * as selector from "./selectors";

const messageLoadLimit = 10;

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


export const initChat = () => {
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

                const lastMessage =  selectors.dialogLastMessage(getState(), dialogId)
                if (lastMessage == false) {
                    dispatch(pushDialogMessages({dialogId, messages}))
                }

                if (lastMessage.hasOwnProperty("timestamp")) {
                    if (message.timestamp.toMillis() > lastMessage.timestamp.toMillis()) {
                        dispatch(pushDialogMessages({dialogId, messages}))
                    }
                }

            });
        dispatch(setDialogProps({dialogId, status:"LOADED"}))
        return r;
    }
}

// export const loadDialogList = () => {
//     return async function disp(dispatch, getState) {
//         const currentUserId = selectors.currentUserId(getState());
//         let dialogList = await DB.getUserDialogList(currentUserId);
//         dispatch(setDialogList(dialogList))
//     }
// }


export const logOut = () => {
    return async function disp(dispatch, getState) {
        Auth.logOut();
        dispatch(resetUser())
        dispatch(resetFinder())
        dispatch(resetDialogList())
        DB.removeListeners();
    }
}

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
        dispatch(setDialogMessageProps({dialogId, messageId, timestamp: request.timestamp, status:"LOADED"}));
        dispatch(setDialogProps({dialogId, status: "LOADED"}))

        const test = selectors.test(getState(),dialogId);
        //dispatch(setDialogMessageProperty({dialogId: dialogId,messageId:messageId, status:"1" }))
    }
}


export const saveToCash = () => {
    console.log(document.cookie);
    return 0;
}

export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        //dispatch(setCurrentDialogFetching(true))
        //const isDialogListFetching = selectors.isDialogListFetching(getState())
        const dialogIdPrevious = selectors.currentDialogId(getState());


        if (dialogIdPrevious) {
            //console.log(dialogIdPrevious)
            const scrollPosition = selectors.currentDialogScroll(getState());
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

export const find = (searchString) => {
    return async function disp(dispatch, getState) {
        let result = [];

        dispatch(setFinderStatus("FETCHING"))
        const user = await DB.findUserByNickName(searchString)
        if (user) result.push(user)
        dispatch(setFinderResults(result))
        dispatch(setFinderStatus("LOADED"))

    }
}


export const createDialogWith = (userId) => {
    return async function disp(dispatch, getState) {
        if (userId != selectors.currentUserId(getState())) {
            let dialogId = await DB.findDialogByCompanionId(userId);
            console.log(dialogId)
            if (!dialogId) {
                dispatch(setDialogListProps({status:"FETCHING"}))
                dialogId = await DB.createDialogWith(userId);
                dispatch(setDialogListProps({status:"LOADED"}))
                //await dispatch(loadDialogList());
            }

            dispatch(setCurrentDialog(dialogId));
        }


    };
}

export const changeCurrentUserNickName = (nickName) => {
    return async function disp(dispatch, getState) {
        await DB.setNickName(nickName);
        //dispatch(setNickName(nickName))
    };
}

export const changeCurrentUserName = (name) => {
    return async function disp(dispatch, getState) {
        await DB.setName(name);
        //dispatch(setName(name))
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}

export const setCurrentDialogScrollPosition = (scrollPosition) => {
    return async function disp(dispatch, getState) {
        //console.log(selectors.currentDialogId(getState());)
        const dialogId = selectors.currentDialogId(getState());
        dispatch(setDialogProps({dialogId, scrollPosition}));
    }
}

export const setCurrentDialogScrollPosition22 = (scrollPosition) => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogScrollPosition2({scrollPosition}));
    }
}




