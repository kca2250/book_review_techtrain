import axios from 'axios';
import { useState } from 'react';
import { useMessage } from './useMessage';

export const useEdit = () => {
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const token = localStorage.getItem('auth_token');

	const editUser = async (name: string) => {
		setIsLoading(true);

		await axios.put(
			'https://api-for-missions-and-railways.herokuapp.com/users',
			{
				name,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		try {
			setIsLoading(false);
			showMessage({
				title: `ユーザー名を ${name} に変更しました`,
				status: 'info',
			});
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return { isLoading, editUser };
};
