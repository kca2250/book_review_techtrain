import React, { createContext } from 'react';

export const authContext = createContext(
	{} as {
		isAuthenticated: boolean;
		setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	}
);
