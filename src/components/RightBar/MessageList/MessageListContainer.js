import React, {Fragment, useCallback, useEffect} from 'react';
import * as selectors from "../../../store/selectors"
import {useDispatch, useSelector} from "react-redux";
import {addCDMessagesTop, loadOldCurrentDialogMessages, setCurrentDialogLastRead} from "../../../store/actions";
import useScroll from "../../../customHooks/useScroll";
import {setDialogProps} from "../../../store/slices";
import MessageList from "./MessageList";
import Date from "./Date";
import Message from "./Message";

const MessageListContainer = ({...props}) => {
    const currentUserId = useSelector(selectors.currentUserId);


    const currentDialog = useSelector(selectors.currentDialogInfo)

    const currentDialogLastRead = currentDialog.lastReadedMessageBy;
    const currentCompanionId = currentDialog.companionId;
    const currentDialogStatus = currentDialog.status;
    const messages = currentDialog.messages;
    const currentDialogId = currentDialog.id;
    const dispatch = useDispatch();
    const {containerRef, scrollTo, setPinBottom, setScrollBottom, scrollTopPercents, scrollTop, scrollBottom, setSaveScrollPosition, init} = useScroll(
        [messages.length],
        50,
    );

    useEffect(async () => {
        if (scrollTopPercents <= 5) {
            if (currentDialogStatus != 'FETCHING') {
                dispatch(setDialogProps({dialogId: currentDialogId, status: 'FETCHING'}))
                const messages = await dispatch(loadOldCurrentDialogMessages())
                setSaveScrollPosition(true)
                dispatch(addCDMessagesTop(messages))
                dispatch(setDialogProps({dialogId: currentDialogId, status: 'LOADED'}))
                setSaveScrollPosition(false)
            }
        }
        if (scrollBottom <= 0) {
            setPinBottom(true)
        } else {
            setPinBottom(false)
        }
    }, [scrollBottom])


    useEffect(() => {
        const element = document.getElementById("firstUnreadedMessage");
        if (element) {
            element.scrollIntoView(true);
        } else {
            scrollTo('bottom')
        }
    }, [currentDialogId])



    const onRead =  useCallback(async (messageTimestamp, messageId) => {
        dispatch(setCurrentDialogLastRead(messageTimestamp, messageId))
    }, [containerRef]);



    const needTopLoader = currentDialogStatus=='FETCHING' && scrollTop==0 && messages.length>=20
    let previousDate = null;

    return (
        <MessageList ref={containerRef} needTopLoader={needTopLoader}>
            {messages.map(message => {

                const isCurrentUserMessage = (message.creatorId == currentUserId)
                const isReaded = (currentDialogLastRead(currentCompanionId)?.timestamp) && currentDialogLastRead(currentCompanionId)?.timestamp.toMillis() >= message?.timestamp?.toMillis()
                const isFirstUnreadedMessage = (currentDialog.firstUnreadedMessageOf(currentUserId)?.id == message.messageId);

                const date = message.date;
                const newDate = date != previousDate
                if (newDate) previousDate = date;

                return (
                    <Fragment>
                        {(newDate) &&
                        <div style={{margin: '2rem'}}>
                            <Date date={date}/>
                        </div>
                        }

                        <div style={{
                            maxWidth: '60%',
                            marginBottom: '10px',
                            width: 'max-content',
                            backgroundColor: isCurrentUserMessage ? "inherit" : "rgba(25,118,210,0.11)",
                            marginLeft: isCurrentUserMessage ? 'auto' : 0,
                        }}>
                            <Message
                                isCurrentUserMessage={isCurrentUserMessage}
                                id={isFirstUnreadedMessage ? 'firstUnreadedMessage' : null}
                                status={isReaded ? 'READED' : message.status}
                                key={message.messageId}
                                messageId={message.messageId}
                                text={message.text}
                                time={message.time}
                                timestamp={message.timestamp}
                                onRead={onRead}
                            />
                        </div>
                    </Fragment>
                )
                }
            )}

        </MessageList>

    );
};


export default React.memo(MessageListContainer);
