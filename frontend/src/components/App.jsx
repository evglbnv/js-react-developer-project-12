/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import NotFoundPage from "./NotFoundPage";
import { useAuth } from "./hooks/useAuth";

import axios from 'axios';
import Header from "./Header";

const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    // const location = useLocation();
    return (
        auth.loggedIn ? children : <Navigate to="/login" />
    )
}

const AuthRoute = ({ children }) => {
    const { loggedIn } = useAuth()
    return (
        loggedIn ? <Navigate to='/' /> : children
    )
}

const App = () => {

    // useEffect(() => {
    //     axios.post('/api/v1/signup', { username: 'evglbnv', password: '141414' }).then((response) => {
    //         console.log(response.data); // => { token: ..., username: 'newuser' }
    //     });
    // })

    // const { getAuthHeader } = useAuth();
    // const authHeader = getAuthHeader();
    // console.log(authHeader)

    // const auth = useAuth()
    // console.log(auth)

    // const authHeader = auth.getAuthHeader()
    // console.log(authHeader)

    // useEffect(() => {
    //     axios.get('/api/v1/data', {
    //         headers: {
    //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjYxNDY1OH0.-vpvWuQwcMISxUYNn3PdXkSxJwLHGpSDa0Rkj6nBFxE`,
    //         },
    //     }).then((response) => {
    //         console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
    //     })
    // }, [])

    // useEffect(() => {
    //     axios.get('/api/v1/messages', {
    //         headers: {
    //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjYxNDY1OH0.-vpvWuQwcMISxUYNn3PdXkSxJwLHGpSDa0Rkj6nBFxE`,
    //         },
    //     }).then((response) => {
    //         console.log(response.data); // => { channels: [...], currentChannelId: 1, messages: [] }
    //     })
    // }, [])

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    )
};

export default App;