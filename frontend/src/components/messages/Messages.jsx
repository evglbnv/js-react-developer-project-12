/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Col } from 'react-bootstrap';
import MessageForm from "./MessageForm";
import Message from "./Message";
import { selectMessages } from "../../store/messagesSlice";
import { useAuth } from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { fetchMessageData } from "../../api/fetchApi";
import { actions as messagesSlice } from "../../store/messagesSlice"
import { selectCurrentChannelId, selectActiveChannel } from "../../store/channelsSlice";
import { currentChannelMessages } from "../../store/messagesSlice";
import { selectChannels } from "../../store/channelsSlice";

const Messages = () => {
    // const messages = useSelector(selectActiveChannelMessages)
    const auth = useAuth();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMessageData(auth.getAuthHeader()))
    }, [])

    const messages = useSelector(selectMessages)
    const currentChannelId = useSelector(selectCurrentChannelId)
    const activeChannel = useSelector(selectActiveChannel)

    // const { name } = activeChannel

    console.log(activeChannel)


    useEffect(() => {
        dispatch(messagesSlice.addCurrentChannelMessages(currentChannelId))
    }, [messages])

    const currentMessages = useSelector(currentChannelMessages)

    return (
        <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <strong>
                            {activeChannel?.name}
                        </strong>
                    </p>
                    <span className="text-muted">Number of messages</span>
                </div>
                <div id="messges-box" className="chat-messages overflow-auto px-5">
                    <Message />
                    <ul className="list-unstyled">
                        {currentMessages.map((message) => (
                            <li className="text-break mb-4" key={message.id}>
                                <Message
                                    key={message.id}
                                    username={message.username}
                                    body={message.body}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="scroll-marker" />
                </div>
                <MessageForm currentUser={auth.username} />
            </div>
        </Col>
    )
}

export default Messages