import React, { createContext } from 'react';

export const AuthContext = createContext(
	{} as {
		isAuthenticated: boolean;
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}
);
