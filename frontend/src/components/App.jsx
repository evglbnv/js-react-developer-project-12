/* eslint-disable react/prop-types */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import useAuth from "./hooks/useAuth";

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


    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
                    <Route path="/" element={<PrivateRoute>≈<ChatPage /></PrivateRoute>} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    )
};

export default App;