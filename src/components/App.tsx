import React, { useState, useEffect } from 'react';
import '../assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import Header from '../components/header';
import Routing from '../Routes';

const App: React.VFC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const token = localStorage.getItem('auth_token') as string;

	useEffect(() => {
		token && setIsAuthenticated(true);
		console.log('render');
	}, [isAuthenticated, token]);

	return (
		<BrowserRouter>
			<AuthContext.Provider
				value={{ token, isAuthenticated, setIsAuthenticated }}>
				<Container>
					<Header />
					<main style={{ margin: '15px 0px' }}>
						<Routing />
					</main>
				</Container>
			</AuthContext.Provider>
		</BrowserRouter>
	);
};

export default App;
