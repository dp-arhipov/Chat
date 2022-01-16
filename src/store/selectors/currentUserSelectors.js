export const currentUser = state => state.currentUser
export const currentUserId = state => currentUser(state).id
export const currentUserName = state => currentUser(state).name
export const currentUserNickName = state => currentUser(state).nickName
export const currentUserStatus = state => currentUser(state).status

export const isCurrentUserLoggedIn = state => currentUserId(state)?true:false
