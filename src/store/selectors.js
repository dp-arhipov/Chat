import {createDraftSafeSelector, createSelector} from "@reduxjs/toolkit";



export const currentUser = state => state.currentUser
export const currentUserId = state => currentUser(state).id
export const currentUserName = state => currentUser(state).name
export const currentUserNickName = state => currentUser(state).nickName



export const dialogList = state => state.dialogList.dialogs
// export const dialogIdsArray = state => {
//     const dialogList = state.dialogList.dialogs
//     const items = Object.values(dialogList)
//     //console.log(items)
//     let arr = [];
//     for(const item of items){
//         const newItem = {id: item.id}
//         arr.push(newItem)
//     }
//     return arr;
//
// }

export const dialogMessages = (state, dialogId) => dialogList(state)[dialogId]?.messages
export const dialog = (state, dialogId) => dialogList(state)[dialogId]

const dialogLastMessage = (state, dialogId) => {
    const dialogMessagesArr = dialogMessages(state, dialogId)
    if (dialogMessagesArr.length != 0) {
        const lastMessageId = dialogMessagesArr[dialogMessagesArr.length - 1].messageId
        const lastMessage = dialogMessagesArr.find(message => message.messageId == lastMessageId);
        return lastMessage.text
    } else return '';


}

const dialogIdsAndNames = state => {
    const dialogs = Object.values(state.dialogList.dialogs)
    return dialogs.map((dialog)=>{
        const lastMessage = dialogLastMessage(state, dialog.id)
        return {id: dialog.id, name: dialog.name, lastMessage: lastMessage}
    });
}



export const dialogListArray = createSelector(
    dialogIdsAndNames,
    (all) => {
        return all;
    }
)
// export const dialogLastMessage = (state, dialogId) => {
//     const dialogMessages = dialogMessages(state, dialogId)
//     if (dialogMessages.length != 0) {
//     const lastMessageId = dialogMessages[dialogMessages.length - 1].messageId
//     return dialogMessages.find(message => message.messageId == lastMessageId);
//     } else return false;
// }
// export const messageById = (state, messageId) => dialogMessages(state, dialogId)[dialogMessages(state, dialogId).length-1]


export const currentDialogId = state => state.dialogList.currentDialogId
export const currentDialogScroll2 = state => state.dialogList.currentDialogScrollPosition

export const currentDialog = state => dialogList(state)[currentDialogId(state)]
export const currentDialogName = state => currentDialog(state)?.name
export const currentDialogMessages = state => currentDialog(state).messages
export const currentDialogFirstMessageId = state => currentDialogMessages(state)[0]?.messageId
export const currentDalogScrollPosition = state => currentDialog(state).scrollPosition
export const currentDialogLastMessageId = state => currentDialogMessages(state)[currentDialogMessages(state).length-1].messageId





export const isDialogFetching = (state, dialogId) => dialogList(state)[dialogId].isFetching
export const isDialogListFetching = (state, dialogId) => state.dialogList.isFetching
export const dialogScrollPosition = (state, dialogId) => dialogList(state)[dialogId].scrollPosition

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching

export const findResults = state => state.findResults.data
export const isFindResultsFetching = state => state.findResults.isFetching

