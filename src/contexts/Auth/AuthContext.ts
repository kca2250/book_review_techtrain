import React, { createContext } from 'react';

export const AuthContext = createContext(
	{} as {
		token: string | null;
		isAuthenticated: boolean;
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}
);
