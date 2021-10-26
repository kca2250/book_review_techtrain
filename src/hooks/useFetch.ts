import axios from 'axios';
import * as H from 'history';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BookType } from '../components/BookCard/type';
import { AuthContext } from '../contexts/Auth/AuthContext';

export const useFetch = (url: string) => {
	const history: H.History = useHistory();
	const [apiData, setApiData] = useState<BookType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { authToken } = useContext(AuthContext);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await axios.get(url, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});
				const data: BookType[] = await res.data;
				setApiData(data);
				setIsLoading(false);
				return;
			} catch (error) {
				setIsLoading(false);
				if (axios.isAxiosError(error) && error.response?.status === 401) {
					console.log('認証がされていません');
					localStorage.removeItem('auth_token');
					history.push('/signup');
					return;
				}
			}
		};

		fetchData();
	}, [authToken, history, url]);

	return { apiData, isLoading };
};
