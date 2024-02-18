/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useFormik } from "formik";
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from "react-redux";
import * as Yup from 'yup'
import { webSocket } from "../../webSocket";
import { selectChannels } from "../../store/channelsSlice";
import { useBackendApi } from "../hooks/useAuth";

const AddChannelModal = ({ onHide }) => {

    // const { createChannel } = webSocket();
    const { newChannel } = useBackendApi()

    const inputRef = useRef(null);

    const allChannels = useSelector(selectChannels)

    const blackList = allChannels.map((channel) => channel.name)

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Обязательное поле')
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .notOneOf(blackList, 'Должно быть уникальным')

    })

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema,
        validateOnChange: false,
        onSubmit: async ({ name }) => {
            const channel = { name }
            try {
                await
                    newChannel(channel)
                onHide()
                formik.resetForm()
            } catch (err) {
                console.error(err)
            }
        }

    })

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Floating className="mb-2">
                        <Form.Control
                            className="mb-2"
                            name="name"
                            type="text"
                            value={formik.values.name || ''}
                            onChange={formik.handleChange}
                            ref={inputRef}
                        />
                        {/* <Form.Label>123</Form.Label> */}
                    </Form.Floating>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" >Отменить</Button>
                        <Button variant="primary" type="submit">Добавить</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </>
    )
}

export default AddChannelModal
