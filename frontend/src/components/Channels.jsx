import React from 'react';
import {
    Button, Nav, Dropdown
} from 'react-bootstrap';



const Channels = () => {
    return (
        <div className="d-flex flex-column h-100">
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
            <Nav
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
            </Nav>

        </div>
    )
}

export default Channels