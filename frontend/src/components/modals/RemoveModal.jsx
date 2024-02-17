/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { modalSelectors } from "../../store/modalSlice";
import { webSocket } from "../../webSocket";

const RemoveChannel = ({ onHide }) => {

    const { removeChannel } = webSocket()
    const { id } = useSelector(modalSelectors.getData)

    const handleRemoveChannel = async (e) => {
        e.preventDefault()

        try {
            await removeChannel({ id })
            onHide()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Удалить канал</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Вы точно хотите удалить?</p>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={onHide}>Отменить</Button>
                    <Button variant="danger" type="button" onClick={handleRemoveChannel}>Удалить</Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    )
}

export default RemoveChannel