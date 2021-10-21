import React from 'react';

const Message = ({text, date, id}) => {

    return (
        <div className={"message-item"}>
            {id == "1"
                ? <div className={"message-item__mine"}><b> Я   [{date}]</b> {text}</div>
                : <div className={"message-item__not-mine"}><b> Он   [{date}]</b> {text}</div>
            }


        </div>
    );
};

export default Message;