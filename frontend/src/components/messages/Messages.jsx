import React from "react";
// import { useSelector } from "react-redux";
import { Col } from 'react-bootstrap';
import MessageForm from "./MessageForm";
import Message from "./Message";


const Messages = () => {

    // const { messages } = useSelector(state => state.messagesReducer)

    return (
        <Col className="p-0 h-100">
            <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                        <b>
                            # General
                        </b>
                    </p>
                    <span className="text-muted">Number of messages</span>
                </div>
                <div id="messges-box" className="chat-messages overflow-auto px-5">
                    <Message />
                    <div className="scroll-marker" />
                </div>
                <MessageForm />
            </div>
        </Col>
    )
}

export default Messages