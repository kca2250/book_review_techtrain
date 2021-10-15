import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { AuthContext } from '../contexts/Auth/AuthContext';

import Login from '../components/Pages/Login';
import SignUp from '../components/Pages/SignUp';
import Top from '../components/Pages/Top';

const Routing: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Switch>
			<Route
				exact
				path='/'
				render={() => (!isAuthenticated ? <Redirect to='/login' /> : <Top />)}
			/>

			<Route
				path='/login'
				render={() => (isAuthenticated ? <Redirect exact to='/' /> : <Login />)}
			/>

			<Route
				path='/signup'
				render={() =>
					isAuthenticated ? <Redirect exact to='/' /> : <SignUp />
				}
			/>
		</Switch>
	);
};

export default Routing;