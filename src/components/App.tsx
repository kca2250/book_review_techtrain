import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import Header from './header';
import Top from '../components/Pages/Top';
import SignUp from '../components/Pages/SignUp';
import Login from './Pages/Login';

const App: React.VFC = () => {
	return (
		<BrowserRouter>
			<Container>
				<Header />
				<main style={{ margin: '15px 0px' }}>
					{/* ルーティング */}
					<Switch>
						<Route exact path='/' component={Top} />
						<Route path='/signup' component={SignUp} />
						<Route path='/login' component={Login} />
					</Switch>
				</main>
			</Container>
		</BrowserRouter>
	);
};

export default App;
