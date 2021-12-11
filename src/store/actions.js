//переделать споcоб логина с использованием опций firebase
//разобраться, почему не работают операции с массивом, если их делать после строки с передачей массива в dispatch
//в компонентах сделать более логичное управление состояниями
//добавить isFetching во все компоненты с крутилками
//find results переделать формат
//валидацию имени и ника
//сохранение юзера в куках
//обработка ошибок в redux thunk
//поработать с временем сообщений
//почему сообщения загружаются несколько раз 2 раза added и 2 modified
//переделать слушатель, добавляет лишнее. при создании диалога с уже имеющимся собеседником, добавляются его сообщения, сейчас слушатель слушает все диалоги
//при создании нового диалога ничего не происходит, добавить экшна
//при создании диалога другим юзером нужно чтобы он появлялся у собеседника сразу
//передавать части стора через компоненты
//в dialog Info добавить вместо id непонятного документы по одному на каждое поле
//сохранять уже загруженные диаологи в кеше
//сделать мемоизацию компонентов
//разные форматы сообщений message, сделать однотипные
//уровни доступа, безопасность
//добавить возможность тестить без регистрацц
//починить поиск
//добавить задержки в загрузки через trottling
//сделать селекторы в actions

import {Auth, DB} from "../API";
import {
    addCurrentDialogMessage,
    addOldCurrentDialogMessages,
    resetDialogList,
    resetFindResults,
    resetUser,
    setCurrentDialogId,
    addLastCurrentDialogMessages,
    setCurrentUser,
    setDialogList,
    setFindResults,
    setFindResultsFetching,
    setName,
    setNickName
} from "./slices";

import * as selectors from "./selectors"

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
        const message = await DB.sendMessage(currentDialogId, text);
        dispatch(addCurrentDialogMessage(message));
    }
}


export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        //dispatch(setCurrentDialogFetching(true))
        dispatch(setCurrentDialogId(dialogId));
        const messages = await DB.getDialogMessages(dialogId, 10)
        dispatch(addLastCurrentDialogMessages(messages))
        //dispatch(setCurrentDialogFetching(false))
    }
}

export const loadOldCurrentDialogMessages = () => {
    return async function disp(dispatch, getState) {
        const dialogId = selectors.currentDialogId(getState());
        const lastVisibleMessageId = selectors.currentDialogLastMessageId(getState());
        const messages = await DB.getDialogMessages(dialogId, 10, lastVisibleMessageId)
        dispatch(addOldCurrentDialogMessages(messages))
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
                (dialogId, message, currentDialogId = selectors.currentDialogId(getState()), currentUserId = selectors.currentUserId(getState())) => {
                    if (dialogId == currentDialogId && message.creatorId != currentUserId) {
                        dispatch(addCurrentDialogMessage(message))
                    }
                });
        }
    }
}





