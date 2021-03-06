import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { UserNameContext } from '../contexts/UserNameContext';
import { useMessage } from './useMessage';

export const useEdit = () => {
	const { setUserName } = useContext(UserNameContext);
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { authToken } = useContext(AuthContext);

	const editUser = async (name: string) => {
		setIsLoading(true);

		await axios
			.put(
				'https://api-for-missions-and-railways.herokuapp.com/users',
				{
					name,
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then(() => {
				showMessage({
					title: `ユーザー名を ${name} に変更しました`,
					status: 'info',
				});
				setUserName(name);
			})
			.catch((error) => {
				console.log(error);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return { isLoading, editUser };
};
