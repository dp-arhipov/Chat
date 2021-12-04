//переделать споcоб логина с использованием опций firebase
//разобраться, почему не работают операции с массивом, если их делать после строки с передачей массива в dispatch
//сделать общую функцию загрузки диалогов
//в компонентах сделать более логичное управление состояниями
//добавить isFetching во все компоненты с крутилками
//find results переделать формат
//валидацию имени и ника
//сохранение юзера в куках
//обработка ошибок в redux thunk
//переделать все функции в API, чтобы возвращали правильное значение
//убрать из функций API лишние параметры
//поработать с временем сообщений
//сделать более логичные селекторы
//узнать, как делать последовательный dispatch
//последовательное чтение из стора сделать покрасивее, сейчас это не отдельные функции, а сразу встроенный код
//почему сообщения загружаются несколько раз 2 раза added и 2 modified
//слушатели диалогов добавляются в логине, а не в чате
//сделать все функции DB без передачи лишних аргументов в виде userId и тд
//переделать слушатель, добавляет лишнее. при создании диалога с уже имеющимся собеседником, добавляются его сообщения, сейчас слушатель слушает все диалоги
//при создании нового диалога ничего не происходит, добавить экшна
//при создании диалога другим юзером нужно чтобы он появлялся у собеседника сразу
//передавать части стора через компоненты
//в dialog Info добавить вместо id непонятного документы по одному на каждое поле

import {Auth, DB} from "../API/firebaseInit";
import {
    addMessage,
    resetCurrentDialog,
    resetFindResults,
    resetUser,
    setCurrentDialogFetching,
    setCurrentDialogInfo,
    setCurrentUser,
    setDialogList,
    setDialogMessages,
    setFindResults,
    setFindResultsFetching,
    setName,
    setNickName
} from "./slices";

import {store} from "./index";


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
       // dispatch(setCurrentDialog(getState().currentUser.dialogList[0].id));

    }
}

export const loadDialogList = () => {
    return async function disp(dispatch, getState) {
         let dialogList = await DB.getUserDialogList(getState().currentUser.id);
         dispatch(setDialogList(dialogList))
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


// export const setDefaultDialog = () => {
//     return async function disp(dispatch, getState) {
//         // dispatch(setCurrentDialogFetching(true))
//         DB.getUserDialogList(getState().currentUser.id).then((dialogList) => {
//             dispatch(setDialogList(dialogList))
//             dispatch(setCurrentDialog(dialogList[0].id));
//         })
//     }
// }

export const sendMessage = (text) => {
    return async function disp(dispatch, getState) {
        const senderId = getState().currentUser.id;
        const dialogId = getState().currentDialog.id;
        DB.sendMessage(dialogId, text);
        const now = new Date();
        const message = {
            id: senderId,
            text: text,
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString()
        }
        dispatch(addMessage(message));
    }
}


export const setCurrentDialog = (dialogID = "") => {
    return async function disp(dispatch, getState) {
        dispatch(setCurrentDialogFetching(true))
        const currentDialogInfo = getState().currentUser.dialogList.filter(item => item.id == dialogID)[0];
        dispatch(setCurrentDialogInfo(currentDialogInfo));
        DB.getDialogMessages(dialogID).then((messages) => {
            dispatch(setDialogMessages(messages))
            dispatch(setCurrentDialogFetching(false))
        });
        //DB.setCurrentUser(getState().currentUser)
    }
}


export const find = (text) => {
    return async function disp(dispatch, getState) {
        let result = [];
        dispatch(setFindResultsFetching(true))
        DB.findUserByNickName(text).then((user) => {
            if (user) result.push(user)
            dispatch(setFindResults(result))
            dispatch(setFindResultsFetching(false))
        });
    }
}


export const createDialogWith = (userId) => {
    return async function disp(dispatch, getState) {
        const owner = getState().currentUser
        let dialogId = await DB.dialogWithThisUserExists(userId);
        if (!dialogId) {
            dialogId = await DB.createDialogWith(userId);
        }
        await dispatch(loadDialogList());
        dispatch(setCurrentDialog(dialogId));

    };
}

export const changeNickName = (nickName) => {
    return async function disp(dispatch, getState) {

        DB.setNickName(nickName, getState().currentUser.id).then((dialogList) => {
            dispatch(setNickName(nickName))
        })

    };
}

export const changeName = (name) => {
    return async function disp(dispatch, getState) {
        DB.setName(name, getState().currentUser.id).then(() => {
            dispatch(setName(name))
        })
    };
}

export const isNickNameBusy = async (nickName) => {
    return await DB.findUserByNickName(nickName) ? true : false;
}

export const addDialogListeners = () => {
    // return async function disp(dispatch, getState) {
    //     let dialogIds = [];
    //     let dialogList = await getState().currentUser.dialogList;
    //     dialogList.forEach((item=>dialogIds.push(item.id)));
    //     console.log(dialogList)
    //     for (const id of dialogIds) {
    //        // DB.addDialogListener(id, (x) => dispatch(setFindResults(x)));
    //         await DB.addDialogListener(id, (x) => console.log(x));
    //     }
    // }

}

export const addListeners = () => {
    return async function disp(dispatch, getState) {
        store.subscribe(() => {
           // DB.setCurrentUser(getState().currentUser, getState().currentDialog);
        })

    //     store.subscribe(() => {
    //         let dialogIds = [];
    //         getState().currentUser.dialogList.forEach((item => dialogIds.push(item.id)));
    //         for (const id of dialogIds) {
    //             DB.addDialogListener(id, getState().currentUser.id, (x) => dispatch(addMessage(x)));
    //             // DB.addDialogListener(id, (x) => console.log(x));
    //         }
    //     })
    }


}



