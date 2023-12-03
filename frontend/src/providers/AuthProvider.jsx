/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'))

    const logIn = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const getAuthHeader = useCallback(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            return {
                headers: { Authorization: `Bearer ${user.token}` }
            }
        }
        return {}
    }, [])

    console.log(getAuthHeader)

    const value = React.useMemo(() => ({ loggedIn, logIn, getAuthHeader }), [loggedIn, logIn])

    console.log(value)

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider