/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { modalSelectors } from "../../store/modalSlice";
import { useBackendApi } from "../hooks/useAuth";
import { actions as channelsSlice } from "../../store/channelsSlice"
import { useDispatch } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import { fetchChannels } from "../../store/channelsSlice";
import { useTranslation } from "react-i18next";

const RemoveChannel = ({ onHide }) => {


    const { removeChannel } = useBackendApi();
    const { id } = useSelector(modalSelectors.getData)
    const dispatch = useDispatch()
    const { getAuthHeader } = useAuth()
    const { t } = useTranslation()

    const handleRemoveChannel = async (e) => {
        e.preventDefault()

        try {
            await removeChannel({ id })
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
                <Modal.Title>{t('modal.removeTitle')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="lead">{t('modal.removeConfirm')}</p>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={onHide}>
                        {t('modal.cancelButton')}
                    </Button>
                    <Button variant="danger" type="button" onClick={handleRemoveChannel}>
                        {t('modal.removeButton')}
                    </Button>
                </Modal.Footer>
            </Modal.Body>
        </>
    )
}

export default RemoveChannel