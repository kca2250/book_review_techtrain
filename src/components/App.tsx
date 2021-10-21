import React, { useState, useEffect } from 'react';
import '../assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import Header from '../components/header';
import Routing from '../Routes';
import { useAuth } from '../hooks/useAuth';

const App: React.VFC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const token = localStorage.getItem('auth_token');
	const { fetchUserData, userName } = useAuth();

	useEffect(() => {
		token ? setIsAuthenticated(true) : setIsAuthenticated(false);
		fetchUserData();
	}, [fetchUserData, isAuthenticated, token]);

	return (
		<BrowserRouter>
			<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
				<Container>
					<Header userName={userName} />
					<main style={{ margin: '15px 0px' }}>
						<Routing />
					</main>
				</Container>
			</AuthContext.Provider>
		</BrowserRouter>
	);
};

export default App;
