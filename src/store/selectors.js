export const currentDialog = state => state.dialogList.currentDialog
export const currentDialogId = currentDialog.id
export const currentUser = state => state.currentUser
export const currentUserId = currentUser.id
export const currentUserName = currentUser.name
export const currentUserNickName = currentUser.nickName

export const dialogList = state => state.dialogList.dialogs

export const messages =  dialogList[currentDialog.id].messages
export const findResults = state => state.findResults.data

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching
export const isFindResultsFetching = state => state.findResults.isFetching

