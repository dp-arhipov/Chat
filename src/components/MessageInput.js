import React, {useContext, useState} from 'react';
import ChatContext from '../context';

const MessageInput = () => {
    const {addMessage} = useContext(ChatContext)
    const [inputText, setInputText] = useState();

    const handleSubmitButton  = (e) => {
        e.preventDefault();
        addMessage(inputText);
        setInputText('');
    }

    return (

            <form className={"message-input"} onSubmit={e=>handleSubmitButton(e)}>
                <input type="text" value={inputText} placeholder={"Введите сообщение..."} onChange={e => setInputText(e.target.value)}/>
                <input type="submit" value="Отправить"/>
            </form>

    );
};

export default MessageInput;