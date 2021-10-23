import axios from 'axios';
import * as H from 'history';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BookType } from '../components/Books/type';

export const useFetch = (url: string) => {
	const history: H.History = useHistory();
	const [apiData, setApiData] = useState<BookType[]>([]);
	const [error, setError] = useState<unknown>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const token = localStorage.getItem('auth_token');

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data: BookType[] = await res.data;
				setApiData(data);
				setIsLoading(false);
				return;
			} catch (error) {
				setError(error);
				setIsLoading(false);
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.log('認証がされていません');
					localStorage.removeItem('auth_token');
					return;
				}
			}
		};

		fetchData();
	}, [history, token, url]);

	return { apiData, error, isLoading };
};
