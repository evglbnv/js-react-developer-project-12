/* eslint-disable no-unused-vars */
import React from "react";
import { useFormik } from "formik";
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from "react-redux";
import * as Yup from 'yup'
import { webSocket } from "../../webSocket";
import { selectChannels } from "../../store/channelsSlice";

const AddChannelModal = () => {

    const { createChannel } = webSocket();

    const allChannels = useSelector(selectChannels)

    const blackList = allChannels.map((channel) => channel.name)

    const validationSchema = Yup.object().shape({
        channelName: Yup.string()
            .trim()
            .required('Обязательное поле')
            .min(3, 'От 3 до 20 символов')
            .max(20, 'От 3 до 20 символов')
            .notOneOf(blackList, 'Должно быть уникальным')

    })

    const formik = useFormik({
        initialValues: {
            channelName: '',
        },
        validationSchema,
        validateOnChange: false,
        onSubmit: async ({ newChannelName }) => {
            const name = { newChannelName }
            try {
                await createChannel({ name })
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
                        <Form.Control className="mb-2" />
                        <Form.Label>123</Form.Label>
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
