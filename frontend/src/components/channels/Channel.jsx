/* eslint-disable no-unused-vars */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Nav } from 'react-bootstrap';

const Channel = () => {
    const dispatch = useDispatch();

    return (
        <li className="nav-item w-100">
            <Button
                variant="secondary"
                className="btn w-100 rounded-0 text-start">
                #general
            </Button>
        </li>
    )
}

export default Channel