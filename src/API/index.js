import {Auth, DB} from './firebaseInit';
import {store} from '../store'

export const logIn = async () => {
    let user = await Auth.googleLogin();
    user = await DB.createUser(user.uid, user.displayName);
    store.dispatch({type: 'SET_CURRENT_USER', payload: user})
}

export const logOut = () => {
    Auth.logOut();
    store.dispatch({type: 'LOGOUT', payload: false})
}

export const sendMessage = (text, senderId = store.getState().currentUser.id, dialogId = store.getState().currentDialog.id) => {
    DB.sendMessage(senderId, dialogId, text);

    const now = new Date();
    const message = {
        id: senderId,
        text: text,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    }
    store.dispatch({type: 'ADD_MESSAGE', payload: message})

}

export const setDialogMessages = async (dialogId) => {
    const messages = await DB.getDialogMessages(dialogId);
    store.dispatch({type: 'SET_MESSAGES', payload: messages})
}


export const changeNickName = async (nickName) => {
    DB.setNickName(nickName, store.getState().currentUser.id);
    store.dispatch({type: 'SET_NICK_NAME', payload: nickName})
}

export const find = async (text) => {
    let user = await DB.findUserByNickName(text);
    store.dispatch({type: 'SET_FIND_RESULTS', payload: user})
    console.log(store.getState())
    return user;
}

export const setCurrentDialog = async (dialogId) => {
    store.dispatch({type: 'SET_CURRENT_DIALOG', payload: dialogId});

    await setDialogMessages(dialogId);

}

export const setDialogList = async (userId = store.getState().currentUser.id) => {
    const dialogList = await DB.getCurrentUserDialogs(userId)
    store.dispatch({type: 'SET_DIALOG_LIST', payload: dialogList})

}

export const createDialogWith = async (member = store.getState().findResults.user, currentUser = store.getState().currentUser) => {
    let dialogId = await DB.dialogExists(member.id, currentUser.id);
    if (!dialogId) {
        dialogId = await DB.createDialog(member, currentUser);
    }
    await setDialogList();
    setCurrentDialog(dialogId);
}

export const initDialog = async () => {
    await setDialogList(store.getState().currentUser.id);
    if (store.getState().dialogList.length != 0) await setCurrentDialog(store.getState().dialogList[0].id)
}



