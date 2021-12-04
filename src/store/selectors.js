export const currentDialog = state => state.currentDialog
export const currentUser = state => state.currentUser
export const currentUserId = state => state.currentUser.id
export const currentUserName = state => state.currentUser.name
export const currentUserNickName = state => state.currentUser.nickName

export const dialogList = state => state.currentUser.dialogList
export const currentDialogId = state => state.currentDialog.id
export const messages = state => state.currentDialog.messages
export const findResults = state => state.findResults.data

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching
export const isFindResultsFetching = state => state.findResults.isFetching

