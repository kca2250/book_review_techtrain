import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { BookType } from '../components/BookCard/type';
import { AuthContext } from '../contexts/Auth/AuthContext';
import { useMessage } from './useMessage';

export const useBook = () => {
	const history = useHistory();
	const { authToken } = useContext(AuthContext);
	const { showMessage } = useMessage();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createPost = async (data: BookType) => {
		const { title, url, detail, review } = data;
		setIsLoading(true);
		await axios
			.post(
				'https://api-for-missions-and-railways.herokuapp.com/books',
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
			.then(() => {
				showMessage({ title: '投稿しました', status: 'info' });
				history.push('/');
				return;
			})
			.catch((err) => {
				return console.log(err);
			})
			.finally(() => setIsLoading(false));
	};

	const editPost = async (data: BookType) => {
		const { id, title, url, detail, review } = data;
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
			.then(() => {
				showMessage({
					title: `レビュー内容を変更しました`,
					status: 'info',
				});
				history.push(`/edit/${id}`);
				return;
			})
			.catch((error) => {
				console.log(error);
				showMessage({ title: 'エラーが発生しました', status: 'error' });
			})
			.finally(() => setIsLoading(false));
	};

	const deletePost = async (id: string) => {
		setIsLoading(true);
		await axios
			.delete(
				`https://api-for-missions-and-railways.herokuapp.com/books/${id}`,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				showMessage({ title: '削除が完了しました', status: 'info' });
				history.push('/');
			})
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	return { isLoading, createPost, editPost, deletePost };
};
