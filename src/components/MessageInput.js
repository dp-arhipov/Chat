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
        <div className={"message-input"}>
            <form onSubmit={e=>handleSubmitButton(e)}>
                <input type="text" value={inputText} onChange={e => setInputText(e.target.value)}/>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    );
};

export default MessageInput;