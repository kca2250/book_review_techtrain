import axios from 'axios';
import { useContext, useState } from 'react';
import { ReviewType } from '../components/Books/type';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useMessage } from './useMessage';

export const useEdit = () => {
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
			})
			.catch((error) => {
				console.log(error);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const editReview = async ({ id, title, url, detail, review }: ReviewType) => {
		setIsLoading(true);

		await axios
			.put(
				`https://api-for-missions-and-railways.herokuapp.com/books/${id}`,
				{
					title,
					url,
					detail,
					review,
				},
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then((res) => {
				showMessage({
					title: `レビュー内容を変更しました`,
					status: 'info',
				});
			})
			.catch((error) => {
				console.log(error);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return { isLoading, editUser, editReview };
};
