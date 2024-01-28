/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

const Message = (props) => {
    const { username, body } = props

    const author = (
        <div className="small text-dark">
            <b>Admin</b>
        </div>
    )

    return (
        <div className="d-flex mb-2 justify-content-start">
            <div>
                {username}
                <div className="p-3 py-2 text-break">
                    {body}
                </div>
            </div>
        </div>
    )

}

export default Message