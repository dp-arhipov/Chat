import * as DB from "./DB";

export const getMessages = (dialogId) => {

    let messages = DB.messages.filter(message => message.dialogId == dialogId);
    messages = messages[0].messages;
    return messages;
}

export const getDialogs = () => {
    return DB.dialogs;

}