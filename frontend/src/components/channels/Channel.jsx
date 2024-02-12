/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { channelsSelectors } from "../../store/channelsSlice";
import useAuth from "../hooks/useAuth";
import { fetchChannels } from "../../api/fetchApi";
import { fetchInitialData } from "../../store/channelsSlice";
import { actions as channelsSlice } from "../../store/channelsSlice"
import { actions as messagesSlice } from "../../store/messagesSlice"
import { selectCurrentChannelId } from "../../store/channelsSlice"
import { modalActions } from "../../store/modalSlice";

const Channel = ({ channel }) => {

    const dispatch = useDispatch();
    const { id, name, removable } = channel

    const currentChannelId = useSelector(selectCurrentChannelId)

    const handleChooseChannel = (channelID) => {
        dispatch(channelsSlice.setCurrentChannel(channelID))
        dispatch(messagesSlice.addCurrentChannelMessages(channelID))
    }

    const handleDeleteChannelModal = () => dispatch(
        modalActions.showModal({ type: 'renameChannel', data: { id, name } })
    )

    if (removable) {
        return (
            <Nav.Item key={id} as="li" className="w-100">
                <Dropdown className="d-flex btn-group">
                    <Button
                        variant={id === currentChannelId ? 'secondary' : 'light'}
                        onClick={() => handleChooseChannel(id)}
                    >
                        {name}
                    </Button>
                    <Dropdown.Toggle
                        className="flex-grow-0 dropdown-toggle-split"
                    >
                        <span className="visually-hidden">Управление каналом</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            Удалить
                        </Dropdown.Item>
                        <Dropdown.Item>
                            Переименовать
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav.Item>
        )
    }

    return (
        <li className="nav-item w-100">
            <Button
                variant={id === currentChannelId ? 'secondary' : 'light'}
                className="btn w-100 rounded-0 text-start"
                onClick={() => handleChooseChannel(id)}
            >
                {name}
            </Button>
        </li>
    )
}

export default Channel