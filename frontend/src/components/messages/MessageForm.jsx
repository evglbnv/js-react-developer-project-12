/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useFormik } from 'formik';
import { useAuth, useBackendApi } from "../hooks/useAuth";
import * as Yup from 'yup';
import { actions as messagesSlice } from "../../store/messagesSlice"
import { selectCurrentChannelId } from "../../store/channelsSlice";
import { useTranslation } from 'react-i18next';

const MessageForm = (props) => {

    const { username } = props
    const { newMessage } = useBackendApi();


    const dispatch = useDispatch()
    const auth = useAuth();
    const { t } = useTranslation();
    const currentChannelId = useSelector(selectCurrentChannelId)

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
            try {
                await newMessage(message)
                formik.resetForm();
            }
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
                        aria-label={t('chat.messageLabel')}
                        placeholder={t('chat.messagePlaceholder')}
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
                        <span className="visually-hidden">{t('chat.sendButton')}</span>
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MessageForm