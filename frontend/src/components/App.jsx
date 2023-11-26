import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from "./ChatPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";

const App = () => {

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<ChatPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </>
    )
};

export default App;