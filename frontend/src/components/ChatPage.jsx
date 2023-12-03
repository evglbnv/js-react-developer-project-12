import React from "react";
import useAuth from '../components/hooks/useAuth';

const ChatPage = () => {

    const { getAuthHeader } = useAuth();
    const authHeader = getAuthHeader();
    console.log(authHeader)

    return (
        <div>
            <h1>Hexlet Chat</h1>
        </div>
    )
}

export default ChatPage