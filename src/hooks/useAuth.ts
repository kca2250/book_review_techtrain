import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { SignInType, SignUpType } from '../components/Form/type';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const history = useHistory();
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState(false);

	const signup = async (props: SignUpType): Promise<void> => {
		const { name, email, password } = props;
		setIsLoading(true);

		await axios
			.post('https://api-for-missions-and-railways.herokuapp.com/users', {
				name,
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem('auth_token', res.data.token);
				showMessage({ title: 'ユーザーを登録しました', status: 'info' });
			})
			.catch((err) => {
				console.log(err);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
				history.push('/');
			});
	};

	const login = async (props: SignInType): Promise<void> => {
		const { email, password } = props;
		setIsLoading(true);

		await axios
			.post('https://api-for-missions-and-railways.herokuapp.com/signin', {
				email,
				password,
			})
			.then((res) => {
				localStorage.setItem('auth_token', res.data.token);
				showMessage({ title: 'ログインしました', status: 'info' });
			})
			.catch((err) => {
				console.log(err);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
				history.push('/');
			});
	};

	return { isLoading, signup, login };
};
