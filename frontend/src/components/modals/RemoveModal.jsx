/* eslint-disable no-unused-vars */
import React from "react";

import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { modalSelectors } from "../../store/modalSlice";
import { webSocket } from "../../webSocket";

const RemoveChannel = () => {

    const { removeChannel } = webSocket()
    const { id } = useSelector(modalSelectors.getData)

    const handleRemoveChannel = async (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Вы точно хотите удалить?</p>
                <Modal.Footer>
                    <Button variant="secondary" type="button">Отменить</Button>
                    <Button variant="danger" type="button" >Удалить</Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    )
}

export default RemoveChannel