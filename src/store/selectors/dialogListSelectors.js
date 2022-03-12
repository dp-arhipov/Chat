
import {currentUserId} from "./currentUserSelectors"

export const currentDialogId = state => state.dialogs?.currentDialogId

export const dialogList = state => state?.dialogs?.dialogList

export const dialog = (state, dialogId) => dialogList(state)[dialogId]

export const dialogInfo = (state, dialogId) => {
    const _dialog = dialog(state, dialogId);

    if (_dialog) {
        const messages = [..._dialog?.messages]?.sort((a, b) => {
            return a?.timestamp?.toMillis() - b?.timestamp?.toMillis()
        });
        const lastMessage = messages[messages?.length - 1];
        const firstMessage = messages && messages[0] && messages[0];
        const lastReadedMessage = (userId) => _dialog?.lastRead[userId]
        const _currentUserId = currentUserId(state);
        return {
            id: _dialog.dialogId,
            name: _dialog.name,
            status: _dialog.status,
            messages: messages,
            scrollPosition: _dialog.scrollPosition,
            lastMessage: {
                text: lastMessage?.text,
                id: lastMessage?.messageId,
                timestamp: lastMessage?.timestamp
            },
            firstMessage: {
                text: firstMessage?.text,
                id: firstMessage?.messageId
            },
            lastReadedMessageBy(userId) {
                return {
                    id: _dialog?.lastRead[userId]?.messageId,
                    timestamp: _dialog?.lastRead[userId]?.messageTimeStamp
                }
            },
            firstUnreadedMessageOf(userId) {
                const timestamp = _dialog?.lastRead[userId]?.messageTimeStamp
                const message = messages.find(item => (
                    item.timestamp?.toMillis() > timestamp?.toMillis())
                    && item.creatorId != _currentUserId
                )
                if(message) {
                    return {
                        id: message.messageId,
                        timestamp: message.timestamp
                    }
                }else return false
            },

            companionId: (_dialog.companionId != _currentUserId && _dialog.companionId)
                ? _dialog.companionId
                : _dialog.creatorId
            ,
            unreadMessagesNumber: (() => {
                const lastReadedTimestamp = lastReadedMessage(_currentUserId)?.messageTimeStamp?.toMillis();
                if(lastReadedTimestamp) {

                    if (messages.length != 0) {
                        return (messages.filter((message) => {
                            return (message?.timestamp?.toMillis() > lastReadedTimestamp && message?.creatorId != _currentUserId)
                        }).length)
                    }
                }else{
                    return messages.length;
                }

            })(),
        }
    }
}

export const dialogsInfo = (state) => {
    const dialogIds = Object.keys(dialogList(state));
    return dialogIds.map((dialogId) => {
        return dialogInfo(state, dialogId)
    })
}

export const currentDialogInfo = state => dialogInfo(state, currentDialogId(state))
