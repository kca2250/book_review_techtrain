import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(
	{} as {
		authToken: string | null;
		isAuthenticated: boolean;
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}
);

export const AuthProvider: React.FC = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const authToken = localStorage.getItem('auth_token');

	useEffect(() => {
		authToken ? setIsAuthenticated(true) : setIsAuthenticated(false);
	}, [authToken]);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, authToken }}>
			{children}
		</AuthContext.Provider>
	);
};
