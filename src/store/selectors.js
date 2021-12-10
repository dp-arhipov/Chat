export const currentUser = state => state.currentUser
export const currentUserId = state => currentUser(state).id
export const currentUserName = state => currentUser(state).name
export const currentUserNickName = state => currentUser(state).nickName

export const dialogList = state => state.dialogList.dialogs


export const currentDialogId = state=> state.dialogList.currentDialogId
export const currentDialog = state => state.dialogList.dialogs[currentDialogId(state)]
export const currentDialogName = state => currentDialog(state).name
export const currentDialogMessages =  state => currentDialog(state).messages
export const findResults = state => state.findResults.data

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching
export const isFindResultsFetching = state => state.findResults.isFetching

