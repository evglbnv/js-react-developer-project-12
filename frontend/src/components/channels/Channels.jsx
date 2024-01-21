/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusSquare } from "react-icons/bs";
import { Col, Button, Nav } from "react-bootstrap";
import Channel from "./Channel";

const Channels = () => {
    const dispatch = useDispatch();

    return (
        <>
            <Col className="border-end px-0 bg-light flex-column h-100 d-flex">
                <div className="d-flex mt-1 justify-content-between mb-2 ps-4 p-4">
                    <b>Каналы</b>
                    <Button
                        variant="group-vertical"
                        className="p-0 text-primary">
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
                    <Channel />
                </Nav>

            </Col>
        </>
    )
}
export default Channels;