/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    Button
} from 'react-bootstrap';
import useAuth from "./hooks/useAuth";
import { fetchChannels } from '../api/fetchApi';




const Channels = () => {

    const { channels, currentChannelId } = useSelector(state => state.channelsReducer);
    const dispatch = useDispatch();
    const auth = useAuth();

    useEffect(() => {
        dispatch(fetchChannels(auth.getAuthHeader()));
    }, [auth, dispatch])

    console.log(channels)

    return (
        <div className="d-flex flex-column h-100"
            style={{ overflowY: 'auto', maxHeight: '650px' }}
        >
            <div className="d-flex justify-content-between px-3 mb-3">
                <h2 className="h4 m-0">Каналы</h2>
                <Button
                    className="d-flex align-items-center"
                    variant="outline-primary"
                    size="sm"
                // onClick={ }
                >
                    +
                </Button>


            </div>

            {channels.map(channel => <div className="w-100 d-flex justify-content-between" key={channel.id}>
                <button
                    className={currentChannelId === channel.id ? "w-100 rounded-0 text-center btn btn-secondary" : "w-100 rounded-0 text-center btn btn-light"}>
                    <span className="text-break">{channel.name}</span>
                </button>
            </div>)
            }
            {/* <Nav
                as="ul"
                fill
                variant="pills"
                className="flex-row overflow-auto flex-grow-1 flex-nowrap"
            >
                <Nav.Item
                    as="li"
                    key={1}
                    className="w-100 flex-grow-0 flex-shrink-0 w-100"
                >
                    <Dropdown
                        // as={ButtonGroup}
                        className="d-flex"
                    >
                        <Button title='Канал' className="w-100 rounded-0 text-start px-3 text-truncate">
                            # Канал
                        </Button>
                    </Dropdown>
                </Nav.Item>
            </Nav> */}

        </div >
    )
}

export default Channels