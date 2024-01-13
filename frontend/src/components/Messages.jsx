/* eslint-disable no-unused-vars */
import React from "react"
import { useSelector } from "react-redux"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFormik } from 'formik';

export const Messages = () => {

    const { messages } = useSelector(state => state.messagesReducer)
    console.log(messages)

    const { currentChannelId, currentChannel } = useSelector(state => state.channelsReducer)

    const formik = useFormik({
        initialValues: { body: '' },
    })

    return (
        <div className='card col-10 d-flex flex-column px-0'>
            <div className="card-header text-left d-flex flex-column">
                <strong>General</strong>
                <span className="text-muted">0 messages</span>
            </div>
            <div id="messages-box" className="row mx-4 mt-3 chat-messages" style={{ overflowY: 'auto', maxHeight: '550px' }}>
                {messages.map(message =>
                    <div className='text-break' key={message.id}>
                        <strong>{`${message.username}:`}</strong> <span>{message.body}</span>
                    </div>
                )}
            </div>
            <div className="row mt-auto pb-2 d-flex justify-content-center">
                <Form className="col-10">
                    <InputGroup>
                        <Form.Control
                            className="col-6"
                            name="body"
                            value={formik.values.body}
                            onChange={formik.handleChange}
                            type='text'
                            placeholder="Input message..."
                        />
                        <Button disabled={!formik.values.body} variant="dark" type="submit">-&gt;</Button>
                    </InputGroup>
                </Form>
            </div>
        </div>

    )
}
