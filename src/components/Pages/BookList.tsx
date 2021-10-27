import React, { useContext, useState, useEffect } from 'react';
import { Progress, Grid } from '@chakra-ui/react';
import { Redirect, useHistory } from 'react-router';
import BookCard from '../BookCard';
import Btn from '../Button';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { BookType } from '../BookCard/type';
import axios from 'axios';

const BookList: React.VFC = () => {
	const history = useHistory();
	const { authToken, isAuthenticated, setIsAuthenticated } =
		useContext(AuthContext);
	const [apiData, setApiData] = useState<BookType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			await axios
				.get('https://api-for-missions-and-railways.herokuapp.com/books', {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				})
				.then((res) => {
					setApiData(res.data);
					console.log('render');
				})
				.catch((err) => {
					if (axios.isAxiosError(err) && err.response?.status === 401) {
						localStorage.removeItem('auth_token');
						setIsAuthenticated(false);
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
		};

		fetchData();
	}, [authToken, setIsAuthenticated]);

	return (
		<>
			{!isAuthenticated ? (
				<Redirect to='/signup' />
			) : (
				<>
					{isLoading ? (
						<Progress size='xs' isIndeterminate />
					) : (
						<>
							<Btn
								text='新規作成'
								type='button'
								size='md'
								colorScheme='blue'
								variant='ghost'
								onClick={() => history.push('/new')}
							/>
							<Grid overflow='hidden' templateColumns='repeat(4, 1fr)'>
								{apiData.map((data, index) => {
									return (
										<BookCard
											key={index}
											id={data.id}
											title={data.title}
											detail={data.detail}
											review={data.review}
											reviewer={data.reviewer}
											isMine={data.isMine}
										/>
									);
								})}
							</Grid>
						</>
					)}
				</>
			)}
		</>
	);
};

export default BookList;
