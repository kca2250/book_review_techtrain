import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { BookType } from '../components/Books/type';

export const useFetch = (url: string, token: string | null) => {
	const history = useHistory();
	const [apiData, setApiData] = useState<BookType[]>([]);
	const [error, setError] = useState<unknown>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
			} catch (err) {
				setError(err);
				setIsLoading(false);
				history.push('/login');
			}
		};

		fetchData();
	}, [history, token, url]);

	return { apiData, error, isLoading };
};
