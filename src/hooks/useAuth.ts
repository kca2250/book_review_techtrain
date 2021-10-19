import axios from 'axios';
import { useState } from 'react';
import { SignInType, SignUpType } from '../components/Form/type';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState(false);
	const [userName, setUserName] = useState<string>('');
	const token = localStorage.getItem('auth_token');

	const fetchUserData = async () => {
		setIsLoading(true);
		await axios
			.get('https://api-for-missions-and-railways.herokuapp.com/users', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUserName(res.data.name);
			})
			.catch((err) => console.log(err));
	};

	const signup = async (props: SignUpType): Promise<void> => {
		const { name, email, password } = props;
		setIsLoading(true);
		const res = await axios.post(
			'https://api-for-missions-and-railways.herokuapp.com/users',
			{
				name,
				email,
				password,
			}
		);

		try {
			localStorage.setItem('auth_token', res.data.token);
			showMessage({ title: 'ユーザーを登録しました', status: 'info' });
			return;
		} catch (error) {
			console.log(error);
			showMessage({ title: 'エラーが発生しました', status: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (props: SignInType): Promise<void> => {
		const { email, password } = props;
		setIsLoading(true);
		const res = await axios.post(
			'https://api-for-missions-and-railways.herokuapp.com/signin',
			{
				email,
				password,
			}
		);

		try {
			localStorage.setItem('auth_token', res.data.token);
			showMessage({ title: 'ログインしました', status: 'info' });
			return;
		} catch (error) {
			console.log(error);
			showMessage({ title: 'エラーが発生しました', status: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, userName, fetchUserData, signup, login };
};
