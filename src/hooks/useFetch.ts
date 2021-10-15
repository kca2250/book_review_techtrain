import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = (url: string, token: string) => {
	const [apiData, setApiData] = useState<string[] | null>([]);
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
				const data = await res?.data;

				setApiData(data);
				setIsLoading(false);
			} catch (err) {
				setError(err);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [token, url]);

	return { apiData, error, isLoading };
};
