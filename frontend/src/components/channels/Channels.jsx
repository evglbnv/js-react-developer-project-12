/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusSquare } from "react-icons/bs";
import { Col, Button, Nav } from "react-bootstrap";
import Channel from "./Channel";
import { selectChannels, selectCurrentChannelId } from "../../store/channelsSlice";

import axios from "axios";

import { modalActions } from "../../store/modalSlice";
import ChannelsModal from "../modals/ChannelsModal";


const Channels = () => {

    const dispatch = useDispatch();


    const channels = useSelector(selectChannels);
    const currentChannelId = useSelector(selectCurrentChannelId)

    const handleAddChannelModal = () => dispatch(modalActions.showModal({ type: 'addChannel' }))


    // axios.get('/api/v1/data', {
    //     headers: {
    //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwNjM2MTM4M30.ouJSsOdXILDYa9hM63P7ErmgT5s9UP3UwQNQcoO50hA`,
    //     },
    // }).then((response) => {
    //     console.log(response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
    // });

    // console.log(list)

    return (
        <>
            <Col className="border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 p-4">
                    <b>Каналы</b>
                    <Button
                        variant="group-vertical"
                        className="p-0 text-primary"
                        onClick={handleAddChannelModal}
                    >
                        <BsPlusSquare />
                        <span className="visually-hidden">+</span>
                    </Button>
                </div>
                <Nav
                    id="channel-box"
                    variant="pills"
                    fill
                    as="ul"
                    className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
                >
                    {channels.map((channel) => (
                        <Channel key={channel.id} channel={channel} />
                    ))}
                </Nav>
            </Col>
            <ChannelsModal />
        </>
    )
}
export default Channels;