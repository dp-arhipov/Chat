import React from 'react';

const Message = ({text, date, id}) => {

    return (
        <div className={"message-item"}>
            {id == "1"
                ? <p className={"message-item__mine"}><b> Я   [{date}]</b> {text}</p>
                : <p className={"message-item__not-mine"}><b> Он   [{date}]</b> {text}</p>
            }


        </div>
    );
};

export default Message;