/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { Button, Container, ButtonGroup, ToggleButton, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header = () => {

    const { logOut, user } = useAuth()

    return (
        <Navbar variant="light" bg="white" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
                {!!user && <Button onClick={logOut} >Выйти</Button>}
            </Container>
        </Navbar>
    )
}

export default Header