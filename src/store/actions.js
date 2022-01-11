//--переделать споcоб логина с использованием опций firebase
//разобраться, почему не работают операции с массивом, если их делать после строки с передачей массива в dispatch

//добавить isFetching во все компоненты с крутилками
//find results переделать формат
//валидацию имени и ника

///обработка ошибок в redux thunk
///поработать с временем сообщений
//при создании нового диалога ничего не происходит, добавить экшна
//повесить слушатель на создание диалога
//передавать части стора через компоненты

//в компонентах сделать более логичное управление состояниями
//--сделать мемоизацию компонентов

//--разные форматы сообщений message, сделать однотипные
//--уровни доступа, безопасность
//добавить задержки в загрузки через trottling

//добавить отработку ошибкок, если сообщений в диалоге нет при подгрузке
//--почему сообщения загружаются несколько раз 2 раза added и 2 modified
//--переделать слушатель, добавляет лишнее. при создании диалога с уже имеющимся собеседником, добавляются его сообщения, сейчас слушатель слушает все диалоги
//--сохранение юзера в куках

//--структура полей dialogs и message

//переделать параметры по умолчанию на undefined вместо 0

//--исправить прокрутку при подгрузке сообщений
//--исправить статус -- отправляется, отправлено

//добавить селекторы и в App.js

//--дописать запоминание скролла в диалоги

//lazy loading сделать

//--переделать запись позиции диалога, перенести логику в DialogList
//--удалить все слушатели после логаута
//--перенести логику сообщений в firebseAPI
import {Auth, DB} from "../API";
import {
    addDialogMessage,
    addDialogMessages,
    setDialogFetching,
    addSomeOldCurrentDialogMessages,
    resetDialogList,
    resetFindResults,
    resetUser,
    setCurrentDialogId,
    setCurrentUser,
    setDialogList,
    setFindResults,
    setFindResultsFetching,
    setName,
    setNickName,
    updateMessageTimestamp,
    setDialogScrollPosition,
    setCurrentDialogScrollPosition2,
    addDialog,
    addDialogMessageBefore,
    setDialogListFetching

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
                dispatch(setCurrentUser(user))
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
        //await dispatch(loadDialogList());

        await dispatch(addDialogListListener())
        //dispatch(addDialogListeners())
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
        dispatch(resetFindResults())
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

        }
        dispatch(setDialogFetching({dialogId, isFetching: true}))
        dispatch(addDialogMessage({dialogId, message}));
        const request = await DB.sendMessage(dialogId, message);
        dispatch(setDialogFetching({dialogId, isFetching: false}))
        dispatch(updateMessageTimestamp({dialogId, messageId, timestamp: request.timestamp}));

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
            const scrollPosition = selectors.currentDialogScroll2(getState());
            console.log(scrollPosition)
            dispatch(setDialogScrollPosition({dialogId: dialogIdPrevious, scrollPosition: scrollPosition}))
        }
        dispatch(setCurrentDialogId(dialogId));


    }
}

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const lastVisibleMessageId = selectors.currentDialogFirstMessageId(getState());
        //console.log(lastVisibleMessageId);
        // const lastFirstId = DB.getFirstMessageId();

        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit, lastVisibleMessageId)

        dispatch(addSomeOldCurrentDialogMessages(messages))
        return messages;
    }

}

export const find = (searchString) => {
    return async function disp(dispatch, getState) {
        let result = [];
        dispatch(setFindResultsFetching(true))
        const user = await DB.findUserByNickName(searchString)
        if (user) result.push(user)
        dispatch(setFindResults(result))
        dispatch(setFindResultsFetching(false))
    }
}


export const createDialogWith = (userId) => {
    return async function disp(dispatch, getState) {
        let dialogId = await DB.findDialogByCompanionId(userId);
        if (!dialogId) {
            dispatch(setDialogListFetching(true))
            dialogId = await DB.createDialogWith(userId);
            //dispatch(setDialogListFetching(false))
            //await dispatch(loadDialogList());
        }

        dispatch(setCurrentDialog(dialogId));

    };
}

export const changeCurrentUserNickName = (nickName) => {
    return async function disp(dispatch, getState) {
        await DB.setNickName(nickName);
        dispatch(setNickName(nickName))
    };
}

export const changeCurrentUserName = (name) => {
    return async function disp(dispatch, getState) {
        await DB.setName(name);
        dispatch(setName(name))
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}


export const addDialogMessagesListener = (dialogId) => {
    return async function disp(dispatch, getState) {
        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit)
        dispatch(addDialogMessages({dialogId, messages}))
        await DB.addDialogMessagesListener(
            dialogId,
            async (dialogId, message) => {
                //if (!selectors.isDialogFetching(getState(), dialogId)) {
                //dispatch(addDialogMessage({dialogId, message}))
                console.log(message)
                const lastMessage = getLastMessage(getState(), dialogId)
                if (lastMessage == false) {
                    dispatch(addDialogMessage({dialogId, message}))
                }
                console.log(lastMessage)
                if (lastMessage.hasOwnProperty("timestamp")) {
                    if (message.timestamp.toMillis() > lastMessage.timestamp.toMillis()) {
                        dispatch(addDialogMessage({dialogId, message}))
                    }
                }
            });

    }
}


export const addDialogListListener = () => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        const r = await DB.addDialogListListener(currentUserId, (dialog) => {

            dispatch(addDialog(dialog))
            dispatch(addDialogMessagesListener(dialog.id))

            //DB.addDialogListenerTest(dialog.id)
        })
        //dispatch(setDialogListFetching(false))
        return r;
    }
}

const getLastMessage = (state, dialogId) => {
    const dialogMessages = selectors.dialogMessages(state, dialogId);
    if (dialogMessages.length != 0) {
        const lastMessageId = dialogMessages[dialogMessages.length - 1].messageId
        return dialogMessages.find(message => message.messageId == lastMessageId);
    } else return false;

}

export const setCurrentDialogScrollPosition = (scrollPosition) => {
    return async function disp(dispatch, getState) {
        //console.log(selectors.currentDialogId(getState());)
        const dialogId = selectors.currentDialogId(getState());
        dispatch(setDialogScrollPosition({scrollPosition, dialogId}));
    }
}

export const setCurrentDialogScrollPosition22 = (scrollPosition) => {
    return async function disp(dispatch, getState) {

        dispatch(setCurrentDialogScrollPosition2({scrollPosition}));
    }
}




