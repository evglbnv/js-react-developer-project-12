/* eslint-disable no-unused-vars */
import {io} from 'socket.io-client'
import store from '../store/index'
import { actions as messagesSlice } from '../store/messagesSlice';

const socket = io();

socket.on('newMessage', (payload) => {
    store.dispatch(messagesSlice.sendMessage(payload))
})

export const webSocket = () => {

    const sendMessage = (message) => {
        socket.timeout(3000).emit('newMessage', message, (err,response) => {
            if (err) {
                console.log(err)
            }
            console.log(response)
        })
    }

    return { sendMessage }
}
