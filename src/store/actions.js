//переделать споcоб логина с использованием опций firebase
//разобраться, почему не работают операции с массивом, если их делать после строки с передачей массива в dispatch

//добавить isFetching во все компоненты с крутилками
//find results переделать формат
//валидацию имени и ника

///обработка ошибок в redux thunk
///поработать с временем сообщений
//при создании нового диалога ничего не происходит, добавить экшна
//при создании диалога другим юзером нужно чтобы он появлялся у собеседника сразу
//передавать части стора через компоненты

//в компонентах сделать более логичное управление состояниями
//сделать мемоизацию компонентов

//разные форматы сообщений message, сделать однотипные
//уровни доступа, безопасность
//добавить возможность тестить без регистрацц
//добавить задержки в загрузки через trottling
//исправить прокрутку

//добавить отработку ошибкок, если сообщений в диалоге нет при подгрузке
///почему сообщения загружаются несколько раз 2 раза added и 2 modified
////переделать слушатель, добавляет лишнее. при создании диалога с уже имеющимся собеседником, добавляются его сообщения, сейчас слушатель слушает все диалоги
////сохранение юзера в куках

//структура полей dialogs и message

//переделать параметры по умолчанию на undefined вместо 0

//исправить прокрутку при подгрузке сообщений
//исправить статус -- отправляется, отправлено

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
    updateMessageTimestamp
} from "./slices";

import * as selectors from "./selectors"
import {nanoid} from "nanoid";
import {serverTimestamp} from "firebase/firestore";

const messageLoadLimit = 10;

export const initApp = () => {
    return async function disp(dispatch, getState) {
        Auth.authHandler(async (user) => {
            if (user) {
                user = await DB.createUser(user.uid, user.name);
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
        await dispatch(loadDialogList());
        dispatch(addDialogListeners())

    }
}

export const loadDialogList = () => {
    return async function disp(dispatch, getState) {
        const currentUserId = selectors.currentUserId(getState());
        let dialogList = await DB.getUserDialogList(currentUserId);
        dispatch(setDialogList(dialogList))
    }
}


export const logOut = () => {
    return async function disp(dispatch, getState) {
        Auth.logOut();
        dispatch(resetUser())
        dispatch(resetFindResults())
        dispatch(resetDialogList())
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
        dispatch(setCurrentDialogId(dialogId));
        if (selectors.currentDialogMessages(getState()).length == 0) {
            const messages = await DB.getDialogMessages(dialogId, messageLoadLimit)
            console.log("first load: ")
            console.log(messages)
            //dispatch(addSomeLastCurrentDialogMessages(messages))
        }

        //dispatch(setCurrentDialogFetching(false))
        //dispatch(addDialogListeners())
    }
}

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const lastVisibleMessageId = selectors.currentDialogFirstMessageId(getState());
        //console.log(lastVisibleMessageId);
        // const lastFirstId = DB.getFirstMessageId();

        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit, lastVisibleMessageId)
        console.log("new load: ");
        console.log(messages);
        dispatch(addSomeOldCurrentDialogMessages(messages))
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
            dialogId = await DB.createDialogWith(userId);
        }
        await dispatch(loadDialogList());
        dispatch(setCurrentDialog(dialogId));

    };
}

export const changeCurrentUserNickName = (nickName) => {
    return async function disp(dispatch, getState) {
        nickName = await DB.setNickName(nickName);
        dispatch(setNickName(nickName))
    };
}

export const changeCurrentUserName = (name) => {
    return async function disp(dispatch, getState) {
        name = await DB.setName(name);
        dispatch(setName(name))
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}


export const addDialogListeners = () => {
    return async function disp(dispatch, getState) {
        let dialogIds = [];
        let dialogList = await selectors.dialogList(getState());
        dialogIds = Object.keys(dialogList);

        for (const dialogId of dialogIds) {
            const messages = await DB.getDialogMessages(dialogId, messageLoadLimit)
            dispatch(addDialogMessages({dialogId, messages}))

            await DB.addDialogListener(
                dialogId,
                async (dialogId, message) => {
                    if (!selectors.isDialogFetching(getState(), dialogId)) {
                        const lastMessage = getLastMessage(getState(), dialogId)
                        if (lastMessage.hasOwnProperty("timestamp")) {
                            if (message.timestamp.toMillis() > lastMessage.timestamp.toMillis()) {
                                dispatch(addDialogMessage({dialogId, message}))
                            }
                        }
                    }
                });
        }
    }
}

const getLastMessage = (state, dialogId) => {
    const dialogMessages = selectors.dialogMessages(state, dialogId);
    if (dialogMessages != []) {
        const lastMessageId = dialogMessages[dialogMessages.length - 1].messageId
        return dialogMessages.find(message => message.messageId == lastMessageId);
    } else return false;

    // return dialogMessages;
}






