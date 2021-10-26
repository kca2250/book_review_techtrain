import React from 'react';
import '../assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { AuthProvider } from '../contexts/Auth/AuthContext';
import Header from '../components/header';
import Routing from '../Routes';
import { UserNameProvider } from '../contexts/UserNameContext';

const App: React.VFC = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<UserNameProvider>
					<Container>
						<Header />
						<main style={{ margin: '15px 0px' }}>
							<Routing />
						</main>
					</Container>
				</UserNameProvider>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default App;
