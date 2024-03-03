/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'

import { Container, Row, Col, Card, Image, Form, Button } from 'react-bootstrap';

import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from './hooks/useAuth';
import * as Yup from 'yup';
import axios from 'axios';
import SignUp from '../images/SignUp.jpg'
import { useTranslation } from 'react-i18next';

const SignUpPage = () => {

    const navigate = useNavigate()
    const auth = useAuth()
    const { logIn } = useAuth();
    const [error, setError] = useState(false)
    const inputRef = useRef(null)
    const { t } = useTranslation();
    const userNameRef = useRef()

    useEffect(() => {
        userNameRef.current.focus()
    }, [])

    const validationSchema = Yup.object({
        username: Yup
            .string()
            .trim()
            .required(t('valid.required'))
            .min(3, t('valid.min'))
            .max(20, t('valid.max')),
        password: Yup
            .string()
            .trim()
            .required(t('valid.required'))
            .min(6, t('valid.minPass')),
        confirmPassword: Yup
            .string()
            .test('confirm password', 'passwords does not match', (
                value, context) => value === context.parent.password
            ),
    })

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post('/api/v1/signup', {
                    user: values.user,
                    password: values.password
                })
            } catch (e) {
                if (e.response?.status === 409) {
                    setError(true)
                }
            }
        }
    })

    return (
        <Container fluid className='h-100'>
            <Row className='justify-content-center align-content-center h-100'>
                <Col className='col-12 col-md-8 col-xxl-6'>
                    <Card className='shadow-sm'>
                        <Card.Body className='d-flex flex-column flex-md-row justify-content-around align-items-center p-5'>
                            <Image roundedCircle="true" alt="Registration" src={SignUp} />
                            <Form className='w-50' onSubmit={formik.handleSubmit}>
                                <h1 className='text-center mb-4'>Registration</h1>
                                <Form.Floating className='mb-3'>
                                    <Form.Control
                                        id="username"
                                        name="user"
                                        autoComplete='username'
                                        placeholder='username'
                                        type='text'
                                        value={formik.values.user}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={formik.errors.user || error}
                                        ref={userNameRef}
                                    />
                                    <Form.Label htmlFor='username'>
                                        Username
                                    </Form.Label>
                                    <Form.Text className='invalid-tooltip'>
                                        {formik.errors.username || null}
                                    </Form.Text>
                                </Form.Floating>
                                <Form.Floating className='mb-3'>
                                    <Form.Control
                                        id="password"
                                        name="password"
                                        autoComplete="password"
                                        placeholder='Password'
                                        type="password"
                                        value={formik.values.password}
                                        disabled={formik.isSubmitting}
                                        isInvalid={formik.errors.password || error}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <Form.Label htmlFor="password">
                                        Password
                                    </Form.Label>
                                    <Form.Text className='invalid-tooltip'>
                                        {formik.errors.password}
                                    </Form.Text>
                                </Form.Floating>
                                <Form.Floating className='mb-3'>
                                    <Form.Control
                                        id='confirmPassword'
                                        name="confirmPassword"
                                        autoComplete='confirmPassword'
                                        placeholder='confirmPassword'
                                        type="password"
                                        value={formik.values.confirmPassword}
                                        disabled={formik.isSubmitting}
                                        isInvalid={formik.errors.confirmPassword || error}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <Form.Label htmlFor="confirmPassword">
                                        Confirm Password
                                    </Form.Label>
                                    <Form.Text className='invalid-tooltip'>
                                        {formik.errors.confirmPassword}
                                    </Form.Text>
                                </Form.Floating>
                                <Button type="submit" variant="outline-primary" className='w-100' disabled={formik.isSubmitting}>
                                    Register
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

}
export default SignUpPage
