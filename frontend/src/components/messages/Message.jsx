/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

const Message = () => {
    const { user: { currentUser } } = useAuth()

    const author = (
        <div className="small text-dark">
            <b>Admin</b>
        </div>
    )

    return (
        <div className="d-flex mb-2 justify-content-start">
            <div>
                Admin
                <div className="p-3 py-2 text-break">
                    сообщение
                </div>
            </div>
        </div>
    )

}

export default Message