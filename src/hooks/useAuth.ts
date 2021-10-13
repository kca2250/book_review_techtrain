import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { SignInType, SignUpType } from '../components/Form/type';
import { useMessage } from './useMessage';

export const useAuth = () => {
	const history = useHistory();
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
						successMessage({ title: 'ユーザーを登録しました' });
						history.push('/');
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

	const signin = async (props: SignInType) => {
		const { email, password } = props;
		setIsLoading(true);

		await axios
			.post('https://api-for-missions-and-railways.herokuapp.com/signin', {
				email,
				password,
			})
			.then((res) => {
				console.log(res);
				switch (res.status) {
					case 200:
						successMessage({ title: 'ログインが完了しました' });
						history.push('/');
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

	return { isLoading, signup, signin };
};
