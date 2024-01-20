/* eslint-disable no-unused-vars */
import {io} from 'socket.io-client'
import {store} from '../store/index'
import { addMessage } from '../store/messagesSlice';

const socket = io();

socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload))
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

    return {sendMessage}
}
