import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './Auth/AuthContext';

export const UserNameContext = createContext(
	{} as {
		userName: string;
		setUserName: React.Dispatch<React.SetStateAction<string>>;
	}
);

export const UserNameProvider: React.FC = ({ children }) => {
	const [userName, setUserName] = useState<string>('');
	const { authToken } = useContext(AuthContext);

	useEffect(() => {
		const fetchUserData = async () => {
			await axios
				.get('https://api-for-missions-and-railways.herokuapp.com/users', {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res) => {
					setUserName(res.data.name);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		fetchUserData();
	}, [authToken]);

	return (
		<UserNameContext.Provider value={{ userName, setUserName }}>
			{children}
		</UserNameContext.Provider>
	);
};
