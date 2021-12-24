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

import {Auth, DB} from "../API";
import {
    addCurrentDialogMessage,
    addDialogMessage,
    addSomeLastCurrentDialogMessages,
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
    setNickName
} from "./slices";

import * as selectors from "./selectors"
import {nanoid} from "nanoid";

const messageLoadLimit = 5;

export const logIn = () => {
    return async function disp(dispatch, getState) {
        let user = await Auth.googleLogin();
        user = await DB.createUser(user.id, user.name);
        dispatch(setCurrentUser(user));
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
        dispatch(resetUser())
        dispatch(resetFindResults())
        dispatch(resetDialogList())
    }
}

export const sendMessage = (text) => {
    return async function disp(dispatch, getState) {
        const currentDialogId = selectors.currentDialogId(getState());
        const creatorId = selectors.currentUserId(getState());

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();
        const messageId = nanoid(8);
        const message = {
            messageId,
            creatorId: creatorId,
            text: text,
            date: date,
            time: time,
        }
        // const message = await DB.sendMessage(currentDialogId, text);
        const request = await DB.sendMessage(currentDialogId, message);
        //console.log(message)
        dispatch(addNewMessage(currentDialogId, message));
    }
}


export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        //dispatch(setCurrentDialogFetching(true))
        dispatch(setCurrentDialogId(dialogId));
        if (selectors.currentDialogMessages(getState()).length == 0) {
            const messages = await DB.getDialogMessages(dialogId, messageLoadLimit)
            //console.log(messages)
            dispatch(addSomeLastCurrentDialogMessages(messages))
        }

        //dispatch(setCurrentDialogFetching(false))
        //dispatch(addDialogListeners())
    }
}

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const lastVisibleMessageId = selectors.currentDialogLastMessageId(getState());
        //console.log(lastVisibleMessageId);
       // const lastFirstId = DB.getFirstMessageId();

        const messages = await DB.getDialogMessages(dialogId, messageLoadLimit, lastVisibleMessageId)
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
           
            await DB.addDialogListener(
                dialogId,
                (dialogId, message) => {
                    if (!isMessageInCash(message.messageId, dialogId, getState())) {
                        dispatch(addNewMessage(dialogId, message))
                    }
                });
        }
    }
}

const isMessageInCash = (messageId, dialogId, state) => {
    const dialogMessages = selectors.dialogMessages(state, dialogId);
    //console.log(messageId, dialogMessages)
    return dialogMessages.some(message => message.messageId == messageId);
}

export const addNewMessage = (dialogId, message) => {
    return async function disp(dispatch, getState) {
        if (!isMessageInCash(message.messageId, dialogId, getState())) {
            dispatch(addDialogMessage({dialogId, message}))
        }
    }
}





