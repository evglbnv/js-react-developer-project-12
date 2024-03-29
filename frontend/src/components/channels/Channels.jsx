/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusSquare } from "react-icons/bs";
import { Col, Button, Nav } from "react-bootstrap";
import Channel from "./Channel";
import { selectChannels, selectCurrentChannelId } from "../../store/channelsSlice";
import { modalActions } from "../../store/modalSlice";
import ChannelsModal from "../modals/ChannelsModal";
import { useAuth } from "../../components/hooks/useAuth";
import { fetchChannels } from "../../store/channelsSlice";
import { useTranslation } from 'react-i18next';


const Channels = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { getAuthHeader } = useAuth()
    const channels = useSelector(selectChannels);
    const currentChannelId = useSelector(selectCurrentChannelId)

    const handleAddChannelModal = () => dispatch(modalActions.showModal({ type: 'addChannel' }))

    useEffect(
        () => {
            const header = getAuthHeader();
            dispatch(fetchChannels(header));
        }, [dispatch, getAuthHeader])

    return (
        <>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 p-4">
                <b>{t('chat.title')}</b>
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
            <ChannelsModal />
        </>
    )
}
export default Channels;