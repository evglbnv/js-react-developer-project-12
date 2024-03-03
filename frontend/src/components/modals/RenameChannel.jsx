/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { selectChannels } from "../../store/channelsSlice";
import { modalSelectors } from "../../store/modalSlice";
import { useBackendApi } from "../hooks/useAuth";
import { useTranslation } from 'react-i18next';

const RenameChannel = ({ onHide }) => {

    const { t } = useTranslation();
    const inputRef = useRef();
    const { renameChannel } = useBackendApi();
    const modalChannel = useSelector(modalSelectors.getData);
    const { name: currentChannelName, id } = useSelector(modalSelectors.getData);
    const allChannels = useSelector(selectChannels)
    const blackList = allChannels.map((channel) => channel.name)
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required(t('valid.required'))
            .min(3, t('valid.min'))
            .max(20, t('valid.max'))
            .notOneOf(blackList, t('valid.mustBeUniq'))

    })

    const formik = useFormik({
        initialValues: { name: currentChannelName },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async ({ name }) => {
            const data = { id: modalChannel.id, name: name }
            try {
                await renameChannel(data)
                formik.setSubmitting(false);
                onHide();
            } catch (err) {
                console.error(err)
            }
        }

    })

    return (
        <>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{t('modal.renameTitle')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Floating>
                        <Form.Control
                            className="mb-2"
                            name="name"
                            type="text"
                            ref={inputRef}
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            isInvalid={formik.errors.name}
                        />
                        <Form.Label htmlFor="channelName">
                            Rename Channel
                        </Form.Label>
                        <Form.Text className="invalid-feedback">
                            {formik.errors.name}
                        </Form.Text>
                    </Form.Floating>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={onHide}>
                            {t('modal.cancelButton')}
                        </Button>
                        <Button variant="primary" type="submit">
                            {t('modal.renameButton')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </>
    )
}

export default RenameChannel