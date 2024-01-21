/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Form from 'react-bootstrap/Form';
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useFormik } from 'formik';
import useAuth from './hooks/useAuth.jsx';
import { addMessage } from "../store/messagesSlice.js";
import { fetchMessages } from "../api/fetchApi.js";
import { webSocket } from "../webSocket/index.js"


export const Messages = () => {

    const dispatch = useDispatch();
    const auth = useAuth()
    const { user: { username } } = useAuth()

    useEffect(() => {
        dispatch(fetchMessages(auth.getAuthHeader()));
    }, [auth, dispatch])

    const { messages } = useSelector(state => state.messagesReducer)

    const { currentChannelId, currentChannel } = useSelector(state => state.channelsReducer)



    const formik = useFormik({
        initialValues: { body: '' },
        onSubmit: async ({ body }) => {
            const message = {
                body,
                channelId: currentChannelId,
                username
            }
            try {
                formik.resetForm();
            }
            catch (err) {
                console.log(err)
            }

        }
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
                <Form className="col-10" onSubmit={formik.handleSubmit}>
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
