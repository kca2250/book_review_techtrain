import axios from 'axios';
import { useContext, useState } from 'react';
import { LoginType, SignUpType } from '../components/Form/type';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const { setIsAuthenticated } = useContext(AuthContext);
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
			setIsAuthenticated(true);
			return;
		} catch (error) {
			console.log(error);
			showMessage({ title: 'エラーが発生しました', status: 'error' });
			setIsAuthenticated(false);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (props: LoginType): Promise<void> => {
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
				setIsAuthenticated(true);
			})
			.catch((err) => {
				console.log(err);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
				setIsAuthenticated(false);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const logout = () => {
		const result: boolean = window.confirm('ログアウトしますか？');
		if (result) {
			localStorage.removeItem('auth_token');
			showMessage({ title: 'ログアウトが完了しました', status: 'info' });
			setIsAuthenticated(false);
			return;
		}
	};

	return { isLoading, signup, login, logout };
};
