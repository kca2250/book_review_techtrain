import React, { useState, useEffect } from 'react';
import '../assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { authContext } from '../contexts/authContext';
import Header from '../components/header';
import Routing from '../Routes';

const App: React.VFC = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	useEffect(() => {
		const token: string | null = localStorage.getItem('auth_token');
		token ? setIsAuthenticated(true) : setIsAuthenticated(false);
	}, [isAuthenticated]);

	return (
		<BrowserRouter>
			<authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
				<Container>
					<Header />
					<main style={{ margin: '15px 0px' }}>
						<Routing />
					</main>
				</Container>
			</authContext.Provider>
		</BrowserRouter>
	);
};

export default App;
