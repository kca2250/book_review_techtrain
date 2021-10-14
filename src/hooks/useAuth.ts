import axios from 'axios';
import { useState } from 'react';
import { SignInType, SignUpType } from '../components/Form/type';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const { successMessage, warningMessage, errorMessage } = useMessage();
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
				switch (res.status) {
					case 200:
						localStorage.setItem('auth_token', res.data.token);
						successMessage({ title: 'ユーザーを登録しました' });
						setIsLoading(false);
						break;
					case 500:
						warningMessage({ title: 'サーバーで問題が起きました' });
						setIsLoading(false);
						break;
					default:
						errorMessage({ title: 'エラーが発生しました' });
						setIsLoading(false);
						break;
				}
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
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
				switch (res.status) {
					case 200:
						localStorage.setItem('auth_token', res.data.token);
						successMessage({ title: 'ログインしました' });
						setIsLoading(false);
						break;
					case 500:
						warningMessage({ title: 'サーバーで問題が起きました' });
						setIsLoading(false);
						break;
					default:
						errorMessage({ title: 'エラーが発生しました' });
						setIsLoading(false);
						break;
				}
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	};

	return { isLoading, signup, login };
};
