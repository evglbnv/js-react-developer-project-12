/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack'
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import loginImage from '../images/login-image.jpg'
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";



const FormContainer = ({ children }) => {
    return (
        <Container fluid className="h-100">
            <Row className="justify-content-center align-content-center h-100">
                <Col>
                    <Card>
                        <Card.Body className="p-5">
                            <Row>
                                <Col>
                                    <Image src={loginImage} roundedCircle thumbnail />
                                </Col>
                                <Col>
                                    {children}
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="p-4">
                            <div className="text-center">
                                <span>Нет аккаунта?</span>
                                <Link to="/">Регистрация</Link>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

const validationSchema = Yup.object().shape({
    username: Yup.string().trim()
        .min(3, 'From 3 to 20 characters')
        .max(20, 'From 3 to 20 characters')
        .required('Required field'),
    password: Yup.string().trim()
        .required('Required field'),
});

// const inputRef = useRef();
// useEffect(() => {
//     inputRef.current?.focus();
// }, []);

const useSubmit = () => {

}


const LoginPage = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: useSubmit(),
    })

    return (
        <div>
            <h1>Login Page</h1>
            <FormContainer>
                <Form onSubmit={formik.handleSubmit}>
                    <h1 className="text-center mb-4">Войти</h1>
                    <fieldset>
                        <Stack gap={4}>
                            <FloatingLabel controlId="floatingUsername" label="Ваш ник" className="position-relative">
                                <Form.Control
                                    name="username"
                                    placeholder="Ваш ник"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.username}
                                />
                                <Form.Control.Feedback type="invalid" tooltip >
                                    {formik.errors.username}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Ваш пароль" className="position-relative">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Ваш ник"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    isInvalid={formik.errors.password}
                                />
                                <Form.Control.Feedback type="invalid" tooltip >
                                    {formik.errors.password}
                                </Form.Control.Feedback>
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid" tooltip className="position-absolute top-0 start-100">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                            <Button type="submit" variant="outline-primary">Войти</Button>
                        </Stack>
                    </fieldset>
                </Form>
            </FormContainer>
        </div>
    )

}


export default LoginPage