import React from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Channels from "./Channels";
import { Messages } from "./Messages";

const ChatPage = () => {

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            <Row className="h-100 bg-white">
                <Col className="border-end pt-5 px-0 bg-light" xs={4} md={2}>
                    <Channels />
                </Col>
                <Col className="h-100 p-0">
                    <Messages />
                </Col>
            </Row>
        </Container>
    );
};


export default ChatPage