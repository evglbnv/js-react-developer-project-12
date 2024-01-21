/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { BsArrowRightSquare } from 'react-icons/bs';
import { useFormik } from 'formik';
import useAuth from "../hooks/useAuth";
import * as Yup from 'yup';
const MessageForm = () => {
    const auth = useAuth();

    const formik = useFormik({
        initialValues: {
            body: '',
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