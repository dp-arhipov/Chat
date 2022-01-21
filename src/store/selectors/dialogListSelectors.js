import {currentDialogId} from "./currentDialogSelectors"

export const dialogList = state => state.dialogs.dialogList

export const dialogListStatus = state => state.dialogs.status

export const dialogListValues = state => Object.values(dialogList(state))
export const dialogListIds = state => Object.keys(dialogList(state))



export const dialog = (state, dialogId) => dialogList(state)[dialogId]
export const dialogStatus = (state, dialogId) => dialog(state,dialogId)?.status
export const dialogScrollPosition = (state, dialogId) => dialog(state,dialogId)?.scrollPosition
export const dialogName = (state, dialogId) => dialog(state,dialogId)?.name

export const dialogMessages = (state, dialogId) => dialog(state,dialogId)?.messages
export const dialogMessage = (state, dialogId,messageId) => dialogMessages(state, dialogId).find(message=>message.messageId == messageId)
export const dialogMessageStatus = (state, dialogId,messageId) => dialogMessage(state, dialogId, messageId).status
export const dialogFirstMessage = (state, dialogId) => dialogMessages(state,dialogId)[0]
export const dialogFirstMessageId = (state, dialogId) => dialogFirstMessage(state,dialogId)?.messageId
export const dialogFirstMessageText = (state, dialogId) => dialogFirstMessage(state,dialogId)?.text
export const dialogLastMessage = (state, dialogId) => dialogMessages(state,dialogId)[dialogMessages(state,dialogId).length-1]
export const dialogLastMessageText = (state, dialogId) =>  dialogLastMessage(state, dialogId)?.text
export const dialogLastMessageId = (state, dialogId) =>  dialogLastMessage(state, dialogId)?.messageId


export const dialogInfo = (state, dialogId) => {
    const _dialog = dialog(state,dialogId);
    return {
        id: _dialog.dialogId,
        name: _dialog.name,
        lastMessage: dialogLastMessageText(state,dialogId)
    }
}

export const dialogsInfo = (state) => {
    const dialogIds = dialogListIds(state);
    return dialogIds.map((dialogId)=>{
        return dialogInfo(state, dialogId)
    })
}

export const currentDialog = state => dialog(state,currentDialogId(state))
export const currentDialogName = state => dialogName(state, currentDialogId(state))
export const currentDialogStatus = state => dialogStatus(state, currentDialogId(state))
export const currentDialogMessages = state => dialogMessages(state, currentDialogId(state))
export const currentDialogMessage = (state, messageId) => dialogMessage(state, currentDialogId(state), messageId)
export const currentDialogMessageStatus = (state, messageId) => dialogMessageStatus(state, currentDialogId(state), messageId)

export const currentDialogFirstMessageId = state => dialogFirstMessageId(state, currentDialogId(state))
export const currentDialogScrollPosition = state => dialogScrollPosition(state, currentDialogId(state))
export const currentDialogLastMessageId = state => dialogLastMessageId(state, currentDialogId(state))


export const test = (state,dialogId)=>{
    //console.log(currentDialogMessageStatus(state, currentDialogFirstMessageId(state)))
    //console.log(currentDialogMessageStatus(state, '2VRz_zkb')?.status)

}
