import React, { useEffect } from "react";
import {
    Container,
    Row,
    Col,
} from 'react-bootstrap';
import Messages from "./messages/Messages";
import Channels from "./channels/Channels";
import { useAuth, useBackendApi } from "../components/hooks/useAuth";
import { useDispatch, } from "react-redux";
import { fetchChannels } from "../../src/store/channelsSlice";

const ChatPage = () => {

    const auth = useAuth();
    console.log(auth)
    const { getAuthHeader } = useAuth()

    const { connectBackend, disconnectBackend } = useBackendApi()

    const dispatch = useDispatch();

    useEffect(
        () => {
            const header = getAuthHeader();
            dispatch(fetchChannels(header));
            connectBackend();
            return () => {
                disconnectBackend()
            };
        }, [dispatch, getAuthHeader, connectBackend, disconnectBackend, auth])

    return (
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
            {/* <AddChannelModal /> */}
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