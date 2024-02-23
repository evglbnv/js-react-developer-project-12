/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { modalSelectors } from "../../store/modalSlice";
import { webSocket } from "../../webSocket";
import { useBackendApi } from "../hooks/useAuth";
import { actions as channelsSlice } from "../../store/channelsSlice"
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { fetchChannels } from "../../store/channelsSlice";

const RemoveChannel = ({ onHide }) => {

    // const { removeChannel } = webSocket()
    const { removeChannel } = useBackendApi();
    const { id } = useSelector(modalSelectors.getData)
    const dispatch = useDispatch()
    const { getAuthHeader } = useAuth()

    const handleRemoveChannel = async (e) => {
        e.preventDefault()

        try {
            await removeChannel({ id })
            console.log('SUCCESS')
            const header = getAuthHeader();
            dispatch(fetchChannels(header))
            onHide()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <Modal.Header closeButton onHide={onHide}>
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