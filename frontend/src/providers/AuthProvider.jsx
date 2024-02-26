/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
// import { Navigate } from 'react-router-dom';

const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'))

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);


    const logIn = (userData) => {
        setLoggedIn(true);
        setUser(userData)
    }

    const logOut = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    const getAuthHeader = useCallback(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            return {
                headers: { Authorization: `Bearer ${user.token}` }
            }
        }
        return {}
    }, [])

    const value = React.useMemo(() => ({ loggedIn, logIn, getAuthHeader, logOut, user }), [loggedIn, logIn])


    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider