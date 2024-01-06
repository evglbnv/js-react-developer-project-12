import React from "react";
import useAuth from '../components/hooks/useAuth';
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Channels from "./Channels";

const ChatPage = () => {

    const { getAuthHeader } = useAuth();
    const authHeader = getAuthHeader();
    console.log(authHeader)

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white">
                <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
                    <Channels />
                </Col>
                <Col className="h-100 p-0">
                    {/* <Messages /> */}
                </Col>
            </Row>
        </Container>
    );
};


export default ChatPage