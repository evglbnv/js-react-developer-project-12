/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dropdown, Nav } from 'react-bootstrap';
import { channelsSelectors } from "../../store/channelsSlice";
import useAuth from "../hooks/useAuth";
import { fetchChannels } from "../../api/fetchApi";
import { fetchInitialData } from "../../store/channelsSlice";

const Channel = ({ channel }) => {

    const { id, name, removable } = channel


    return (
        <li className="nav-item w-100">
            <Button
                variant="secondary"
                className="btn w-100 rounded-0 text-start">
                {name}
            </Button>
        </li>
    )
}

export default Channel