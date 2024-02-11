/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import AddChannelModal from "./AddChannel"

import { modalActions, modalSelectors } from "../../store/modalSlice";

const modals = {
    addChannel: AddChannelModal,
}

const ChannelsModal = () => {
    const dispatch = useDispatch()

    const isOpened = useSelector(modalSelectors.isOpen)
    const type = useSelector(modalSelectors.getType)

    const hideModal = () => dispatch(modalActions.hideModal())

    const Component = modals[type]

    return (
        <Modal show={isOpened} centered onHide={hideModal}>
            {Component ? <Component onHide={hideModal} /> : null}
        </Modal>
    )
}

export default ChannelsModal