/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { selectChannels } from "../../store/channelsSlice";
import { modalSelectors } from "../../store/modalSlice";
import { webSocket } from "../../webSocket";

const RenameChannel = ({ onHide }) => {

    const { renameChannel } = webSocket()
    const modalChannel = useSelector(modalSelectors.getData);

    console.log(modalChannel)


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
        initialValues: { name: modalChannel.name },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async ({ name }) => {

            const data = { id: modalChannel.id, name }

            try {
                await renameChannel(data)
                onHide();
            } catch (err) {
                console.error(err)
            }
        }

    })

    return (
        <>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>Переименуйте канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Floating>
                        <Form.Control
                            className="mb-2"
                            name="name"
                            type="text"
                            // ref={inputRef}
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.channelName}
                            isInvalid={formik.errors.channelName}
                        />
                        <Form.Label htmlFor="channelName">
                            Переименование
                        </Form.Label>
                        <Form.Text className="invalid-feedback">
                            {formik.errors.channelName}
                        </Form.Text>
                    </Form.Floating>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={onHide}>Отмена</Button>
                        <Button variant="primary" type="submit">Переименовать</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </>
    )

}

export default RenameChannel