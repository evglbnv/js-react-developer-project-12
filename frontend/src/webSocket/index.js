/* eslint-disable no-unused-vars */
import {io} from 'socket.io-client'
import store from '../store/index'
import { actions as messagesSlice } from '../store/messagesSlice';
import { actions as channelsSlice} from '../store/channelsSlice'

const socket = io();

socket.on('newMessage', (payload) => {
    store.dispatch(messagesSlice.sendMessage(payload))
})

socket.on('newChannel', (payload) => {
    store.dispatch(channelsSlice.addChannel(payload))
})

socket.on('removeChannel', (payload) => {
    store.dispatch(channelsSlice.deleteChannel(payload))
})

socket.on('renameChannel', (payload) => {
    console.log(payload)
    store.dispatch(channelsSlice.renameChannel({
      payload
    }))
})

const webSocket = () => {

    const sendMessage = (message) => {
        socket.timeout(3000).emit('newMessage', message, (err,response) => {
            if (err) {
                console.log(err)
            }
            console.log(response)
        })
    }

    const createChannel = (channel) => {
        socket.timeout(3000).emit('newChannel', channel, (err,response) => {
            if (err) {
                console.log(err)
            }
            const {status, data} = response
            console.log(status)
            console.log(data)

        } )
  
    }

    const removeChannel = (id) => {
        socket.timeout(3000).emit('removeChannel', id, (err, response) => {
            if (err) {
                console.log(err)
            } else {
                console.log(response.status)
            }
        })
    }

    const renameChannel = (channel) => {
        socket.timeout(3000).emit('renameChannel', channel, (err, response) => {
            if (err) {
                console.log(err)
            }
            const {status, data} = response
            console.log(status)
            console.log(data)
        })
    }

    return { sendMessage, createChannel, removeChannel, renameChannel }
}
