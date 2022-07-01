// Imports
import React, { useCallback, useContext, useEffect, useState } from "react";

// Context
const AuthContext = React.createContext();

// Remaining time before auto-logout
let logoutTimer;
const getRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const newExpirationTime = new Date(expirationTime).getTime();
	const remainingTime = newExpirationTime - currentTime;
	return remainingTime;
};

// Get token from localStorage
const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem('MS-Authentication-ID');
	const storedExpirationDate = localStorage.getItem('MS-Authentication-ID-Exp-Time');
	const remainingTime = getRemainingTime(storedExpirationDate);
	// 60000 ms = 1 minute
	if (remainingTime <= 60000){
		localStorage.removeItem('MS-Authentication-ID');
		localStorage.removeItem('MS-Authentication-ID-Exp-Time');
		return null;
	}
	// Enough remaining time
	return {
		token:storedToken,
		duration:remainingTime
	};
};

// Provider
const AuthProvider = ({ children }) => {

	// States
	const [token, setToken] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Methods
	/* We add useCallback to logout, then the function won't be rewriting
	by the useEffect at every page refresh... */
	const logout = useCallback(() => {
		setToken(null);
		setIsLoggedIn(false);
		localStorage.removeItem('MS-Authentication-ID');
		localStorage.removeItem('MS-Authentication-ID-Exp-Time');
		if (logoutTimer){
			clearTimeout(logoutTimer);
		}
	},[]);
	const login = (token, expirationTime) => {
		setToken(token);
		setIsLoggedIn(true);
		// Save in localStorage
		// No need to stringify because it's already a string
		localStorage.setItem('MS-Authentication-ID', token);
		localStorage.setItem('MS-Authentication-ID-Exp-Time', expirationTime);
		// Auto-logout
		const remainingTime = getRemainingTime(expirationTime);
		logoutTimer = setTimeout(logout, remainingTime);
	};

	// Is localStorage ?
	const tokenData = retrieveStoredToken();
	useEffect(() => {
		let initialToken;
		if (tokenData){
			console.log(tokenData.duration);
			initialToken = tokenData.token;
			setToken(initialToken);
			setIsLoggedIn(true);
			logoutTimer = setTimeout(logout, tokenData.duration);
		}
	},[tokenData, logout]);

	// Return
	return <AuthContext.Provider value={ {
		token, isLoggedIn, login, logout
	} }>{ children }</AuthContext.Provider>

};

// Custom hooks
export const useAuthContext = () => {
	return useContext(AuthContext);
};

// Provider export
export { AuthProvider };