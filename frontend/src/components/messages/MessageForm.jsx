/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useFormik } from 'formik';
import { useAuth } from "../hooks/useAuth";
import * as Yup from 'yup';
import { actions as messagesSlice } from "../../store/messagesSlice"
import { webSocket } from '../../webSocket/index'
import { selectCurrentChannelId } from "../../store/channelsSlice";

const MessageForm = (props) => {

    const { username } = props
    const { sendMessage } = webSocket()


    const dispatch = useDispatch()
    const auth = useAuth();
    const currentChannelId = useSelector(selectCurrentChannelId)


    // const handleFormSubmit = (values) => {
    //     const message = {
    //         body: values.body,
    //         username: currentUser
    //     }
    //     dispatch(messagesSlice.sendMessage(message))
    //     formik.resetForm()
    // }

    const formik = useFormik({
        initialValues: {
            body: '',
        },
        onSubmit: async (values) => {
            const message = {
                body: values.body,
                username: auth.user.username,
                channelID: currentChannelId,
            };
            try { await sendMessage(message) }
            catch (err) {
                console.log(err)
            }
        },
        validationSchema: Yup.object({
            body: Yup.string()
                .trim()
                .required(),
        })
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Form
                noValidate
                className="py-1 border-2"
                onSubmit={formik.handleSubmit}
            >
                <Form.Group className="input-group has-validation">
                    <Form.Control
                        id="body"
                        name="body"
                        className="p-0 ps-2"
                        value={formik.values.body}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <Button
                        type="submit"
                        variant="group-vertical"
                        className="text-primary border-0"
                    >
                        <BsArrowRightSquare size={25} />
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MessageForm