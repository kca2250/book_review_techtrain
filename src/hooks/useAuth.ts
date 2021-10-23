import axios from 'axios';
import { useState } from 'react';
import { SignInType, SignUpType } from '../components/Form/type';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState(false);

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
		} catch (error) {
			console.log(error);
			showMessage({ title: 'エラーが発生しました', status: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	const logout = () => {
		const result: boolean = window.confirm('ログアウトしますか？');
		if (result) {
			localStorage.removeItem('auth_token');
			showMessage({ title: '処理が完了しました', status: 'info' });
		}
	};

	return { isLoading, signup, login, logout };
};
