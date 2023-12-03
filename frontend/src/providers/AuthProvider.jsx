/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import AuthContext from '../contexts/AuthContext.js';

const AuthProvider = ({ children }) => {

    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'))

    const logIn = useCallback(() => {
        setLoggedIn(true);
    }, []);

    const value = React.useMemo(() => ({ loggedIn, logIn }), [loggedIn, logIn])

    console.log(value)

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider