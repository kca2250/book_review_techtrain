import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { AuthContext } from '../contexts/Auth/AuthContext';

import Login from '../components/Pages/Login';
import SignUp from '../components/Pages/SignUp';
import Top from '../components/Pages/Top';
import User from '../components/Pages/User';
import BookDetail from '../components/Pages/BookDetail';

const Routing: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Switch>
			<Route exact path='/'>
				{isAuthenticated === true ? <Top /> : <Redirect push to='/signup' />}
			</Route>
			<Route path='/login'>
				{isAuthenticated !== true ? <Login /> : <Redirect push to='/' />}
			</Route>
			<Route path='/signup'>
				{isAuthenticated !== true ? <SignUp /> : <Redirect push to='/' />}
			</Route>
			<Route path='/profile'>
				{isAuthenticated === true ? <User /> : <Redirect push to='/' />}
			</Route>

			<Route path='/detail/:id'>
				{isAuthenticated === true ? <BookDetail /> : <Redirect push to='/' />}
			</Route>
		</Switch>
	);
};

export default Routing;
