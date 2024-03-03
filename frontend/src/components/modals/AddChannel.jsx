/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useFormik } from "formik";
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from "react-redux";
import * as Yup from 'yup'
import { selectChannels } from "../../store/channelsSlice";
import { useBackendApi } from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const AddChannelModal = ({ onHide }) => {

    const { newChannel } = useBackendApi();

    const { t } = useTranslation()

    const inputRef = useRef(null);

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
        initialValues: {
            name: '',
        },
        validationSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async ({ name }) => {
            const channel = { name }
            try {
                await
                    newChannel(channel)
                onHide()
                formik.resetForm()
            } catch (err) {
                formik.setSubmitting(false);
                console.error(err)
            }
        }

    })

    return (
        <>
            <Modal.Header closeButton onHide={onHide}>
                <Modal.Title>{t('modal.addTitle')}</Modal.Title>
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
                            onBlur={formik.handleBlur}
                            disabled={formik.isSubmitting}
                            isInvalid={formik.errors.name}
                            ref={inputRef}
                        />
                        <Form.Label>{t('modal.addLabel')}</Form.Label>
                        <Form.Text className="invalid-feedback">
                            {formik.errors.name}
                        </Form.Text>
                    </Form.Floating>
                    <Modal.Footer>
                        <Button variant="secondary" type="button" onClick={onHide}>
                            {t('modal.cancelButton')}
                        </Button>
                        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                            {t('modal.addButton')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>

        </>
    )
}

export default AddChannelModal
