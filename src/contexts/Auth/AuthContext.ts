import React, { createContext } from 'react';

export const AuthContext = createContext(
	{} as {
		token: string;
		isAuthenticated: boolean;
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}
);
