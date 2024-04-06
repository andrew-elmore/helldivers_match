import React, { createContext, useContext, useState } from 'react';
import Parse from 'parse';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(Parse.User.current());

    const signUp = (username, email, password) => {
        const user = new Parse.User();
        user.setUsername(username); 
        user.setEmail(email);
        user.setPassword(password);
        
        return user.signUp().then((user) => {
            setCurrentUser(user);
            return user;
        });
    };

    const logIn = (username, password) => {
        return Parse.User.logIn(username, password).then((user) => {
            setCurrentUser(user);
            return user;
        });
    };

    const logOut = () => {
        return Parse.User.logOut().then(() => {
            setCurrentUser(null);
        });
    };

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
