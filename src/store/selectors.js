export const currentDialog = state => state.currentDialog
export const currentUserId = state => state.currentUser.id
export const dialogList = state => state.currentUser.dialogList
export const messages = state => state.currentDialog.messages

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching

