import React from "react";
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div>
            <h1>Not found Page</h1>
            <span>But you can go</span>
            <Link to="/" > to the main page</Link >
        </div >
    )
}

export default NotFoundPage