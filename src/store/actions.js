//переделать споcоб логина с использованием опций firebase
//разобраться, почему не работают операции с массивом, если их делать после строки с передачей массива в dispatch
//сделать общую функцию загрузки диалогов
//в компонентах сделать более логичное управление состояниями
//добавить isFetching во все компоненты с крутилками
//find results переделать формат
//валидацию имени и ника
//сохранение юзера в куках
//обработка ошибок в redux thunk
//поработать с временем сообщений
//сделать более логичные селекторы
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

import {Auth, DB} from "../API";
import {
    addMessage,
    addMessageTest,
    resetCurrentDialog,
    resetFindResults,
    resetUser,
    setCurrentDialogFetching,
    setCurrentDialogInfo,
    setCurrentDialogInfoTest,
    setCurrentDialogMessagesTest,
    setCurrentUser,
    setDialogList,
    setDialogListTest,
    setDialogMessages,
    setFindResults,
    setFindResultsFetching,
    setName,
    setNickName
} from "./slices";

//import {store} from "./";


export const logIn = () => {
    return async function disp(dispatch, getState) {
        let user = await Auth.googleLogin();
        user = await DB.createUser(user.id, user.name);
        dispatch(setCurrentUser(user));
        DB.setCurrentUser(user);


        //dispatch(addListeners());
        // DB.setCurrentUser(getState().currentUser);
        // dispatch(loadDialogList());
        //

    }
}


//console.log(getState())

// DB.setCurrentUser(getState().currentUser)



export const initChat = () => {
    return async function disp(dispatch, getState) {
        await dispatch(loadDialogList());
        dispatch(addDialogListeners())
       // dispatch(setCurrentDialog(getState().currentUser.dialogList[0].id));

    }
}

export const loadDialogList = () => {
    return async function disp(dispatch, getState) {
        let dialogList = await DB.getUserDialogList(getState().currentUser.id);
        dispatch(setDialogList(dialogList))
        dispatch(setDialogListTest(dialogList))
    }
}

// let dialogIds = [];
// dialogList.forEach((item => dialogIds.push(item.id)));
// for (const id of dialogIds) {
//     DB.addDialogListener(id, getState().currentUser.id, (x) => dispatch(addMessage(x)));
//     // DB.addDialogListener(id, (x) => console.log(x));
// }

export const logOut = () => {
    return async function disp(dispatch, getState) {
        dispatch(resetUser())
        dispatch(resetFindResults())
        dispatch(resetCurrentDialog())
    }
}

export const sendMessage = (text) => {
    return async function disp(dispatch, getState) {
        const senderId = getState().currentUser.id;
        const dialogId = getState().currentDialog.id;
        const message = await DB.sendMessage(dialogId, text);
        dispatch(addMessage(message));
        dispatch(addMessageTest(message));
    }
}


export const setCurrentDialog = (dialogId) => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogFetching(true))
        const currentDialogInfo = getState().currentUser.dialogList.filter(item => item.id == dialogId)[0];
        dispatch(setCurrentDialogInfo(currentDialogInfo));
        dispatch(setCurrentDialogInfoTest(currentDialogInfo));

        const messages = await DB.getDialogMessages(dialogId)
        dispatch(setDialogMessages(messages))

       // const messages2 = await DB.getDialogMessages(dialogId, 5, getState().dialogList.dialogs[dialogId].messages[0].messageId)
       //  let messages2 = await DB.getDialogMessages(dialogId, 5, messages[0].messageId)
       //  dispatch(setDialogMessages([...messages2, ...messages]))




        dispatch(setCurrentDialogMessagesTest(messages))

        dispatch(setCurrentDialogFetching(false))


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

// export const addDialogListeners = () => {
//     return async function disp(dispatch, getState) {
//         let dialogIds = [];
//         let dialogList = await getState().currentUser.dialogList;
//         dialogList.forEach((item=>dialogIds.push(item.id)));
//        // console.log(dialogList)
//         for (const dialogId of dialogIds) {
//            // DB.addDialogListener(id, (x) => dispatch(setFindResults(x)));
//             await DB.addDialogListener(
//                 dialogId,
//                 (dialogId, message, currentDialogId = getState().currentDialog.id, currentUserId = getState().currentUser.id) => {
//                     if (dialogId == currentDialogId && message.creatorId != currentUserId) {
//                         dispatch(addMessage(message))
//                         console.log(message)
//                     }
//                 });
//         }
//     }
// }

export const addDialogListeners = () => {
    return async function disp(dispatch, getState) {
        let dialogIds = [];
        let dialogList = await getState().dialogList.dialogs;
        //dialogList.forEach((item=>dialogIds.push(item.id)));
        dialogIds = Object.keys(dialogList);
        console.log(dialogIds)
        for (const dialogId of dialogIds) {
            // DB.addDialogListener(id, (x) => dispatch(setFindResults(x)));
            await DB.addDialogListener(
                dialogId,
                (dialogId, message, currentDialogId = getState().dialogList.currentDialog.id, currentUserId = getState().currentUser.id) => {
                    if (dialogId == currentDialogId && message.creatorId != currentUserId) {
                        dispatch(addMessageTest(message))

                    }
                });
        }



    }
}





