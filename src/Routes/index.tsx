import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { AuthContext } from '../contexts/Auth/AuthContext';

import Login from '../components/Pages/Login';
import SignUp from '../components/Pages/SignUp';
import Top from '../components/Pages/Top';
import User from '../components/Pages/User';
import BookDetail from '../components/Pages/BookDetail';
import CreateReview from '../components/Pages/CreateReview';
import EditReviewForm from '../components/Form/EditReviewForm';

const Routing: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);

	return (
		<Switch>
			<Route exact path='/'>
				{isAuthenticated ? <Top /> : <Redirect push to='/signup' />}
			</Route>
			<Route path='/login'>
				{!isAuthenticated ? <Login /> : <Redirect push to='/' />}
			</Route>
			<Route path='/signup'>
				{!isAuthenticated ? <SignUp /> : <Redirect push to='/' />}
			</Route>
			<Route path='/profile'>
				{isAuthenticated ? <User /> : <Redirect push to='/' />}
			</Route>

			<Route path='/detail/:id'>
				{isAuthenticated ? <BookDetail /> : <Redirect push to='/' />}
			</Route>

			<Route path='/new' component={CreateReview} />
			<Route path='/edit/:id' component={EditReviewForm} />
		</Switch>
	);
};

export default Routing;
