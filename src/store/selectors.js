export const currentUser = state => state.currentUser
export const currentUserId = state => currentUser(state).id
export const currentUserName = state => currentUser(state).name
export const currentUserNickName = state => currentUser(state).nickName


export const dialogList = state => state.dialogList.dialogs
export const dialogMessages = (state, dialogId) => dialogList(state)[dialogId].messages
export const dialogLastMessageId = (state, dialogId) => dialogMessages(state, dialogId)[dialogMessages(state, dialogId).length-1]
// export const messageById = (state, messageId) => dialogMessages(state, dialogId)[dialogMessages(state, dialogId).length-1]


export const currentDialogId = state => state.dialogList.currentDialogId

export const currentDialog = state => dialogList(state)[currentDialogId(state)]
export const currentDialogName = state => currentDialog(state).name
export const currentDialogMessages = state => currentDialog(state).messages
export const currentDialogFirstMessageId = state => currentDialogMessages(state)[0].messageId
export const currentDalogScrollPosition = state => currentDialog(state).scrollPosition
export const currentDialogLastMessageId = state => currentDialogMessages(state)[currentDialogMessages(state).length-1].messageId





export const isDialogFetching = (state, dialogId) => dialogList(state)[dialogId].isFetching
export const dialogScrollPosition = (state, dialogId) => dialogList(state)[dialogId].scrollPosition

export const isCurrentDialogFetching = state => state.currentDialog.isFetching
export const isCurrentUserFetching = state => state.currentUser.isFetching

export const findResults = state => state.findResults.data
export const isFindResultsFetching = state => state.findResults.isFetching

