/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { BackendApiContext } from "./AuthContext";

import { actions as messagesSlice } from '../store/messagesSlice';
import { actions as channelsSlice } from '../store/channelsSlice'

const BackendApiProvider = ({ children, socket }) => {
    const TIMEOUT = 5000

    const dispatch = useDispatch()

    const values = useMemo(() => {
        const connectBackend = () => {
            socket.connect();

            socket.on('newMessage', (payload) => {
                dispatch(messagesSlice.sendMessage(payload))
            })

            socket.on('newChannel', (payload) => {
                dispatch(channelsSlice.addChannel(payload))
            })

            socket.on('removeChannel', (payload) => {
                dispatch(channelsSlice.deleteChannel(payload))
            })

            socket.on('renameChannel', (payload) => {
                console.log(payload)
                dispatch(channelsSlice.renameChannel({
                    payload
                }))
            })
        }

        const disconnectBackend = () => {
            socket.removeAllListeners();
            socket.disconnect();
        }

        const newMessage = async (message) => {
            await socket.timeout(TIMEOUT).emitWithAck('newMessage', message);
        };

        const newChannel = async (channelName) => {
            await socket.timeout(TIMEOUT).emitWithAck('newChannel', channelName);
        };

        const removeChannel = async (channelId) => {
            await socket.timeout(TIMEOUT).emitWithAck('removeChannel', channelId);
        };

        const renameChannel = async (channel) => {
            await socket.timeout(TIMEOUT).emitWithAck('renameChannel', channel);
        };

        return {
            connectBackend,
            disconnectBackend,
            newMessage,
            newChannel,
            removeChannel,
            renameChannel,
        };

    }, [dispatch, socket])

    return (
        <BackendApiContext.Provider value={values}>
            {children}
        </BackendApiContext.Provider>
    )
}

export default BackendApiProvider