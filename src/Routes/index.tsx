import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { AuthContext } from '../contexts/Auth/AuthContext';

import Login from '../components/Pages/Login';
import SignUp from '../components/Pages/SignUp';
import User from '../components/Pages/User';
import BookList from '../components/Pages/BookList';
import BookDetail from '../components/Pages/BookDetail';
import CreateBookReview from '../components/Pages/CreateBookReview';
import EditReviewForm from '../components/Form/EditReviewForm';

const Routing: React.VFC = () => {
	const history = useHistory();
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		isAuthenticated === true ? history.push('/') : history.push('/signup');
	}, [history, isAuthenticated]);

	return (
		<Switch>
			<Route exact path='/' component={BookList} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={SignUp} />
			<Route path='/profile' component={User} />
			<Route path='/detail/:id' component={BookDetail} />
			<Route path='/new' component={CreateBookReview} />
			<Route path='/edit/:id' component={EditReviewForm} />
		</Switch>
	);
};

export default Routing;
