import React, { useContext } from 'react';
import { Progress, Grid } from '@chakra-ui/react';
import { useFetch } from '../../hooks/useFetch';
import { Redirect, useHistory } from 'react-router';
import BookCard from '../BookCard';
import Btn from '../Button';
import { AuthContext } from '../../contexts/Auth/AuthContext';

const BookList: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const history = useHistory();
	const { apiData, isLoading } = useFetch(
		'https://api-for-missions-and-railways.herokuapp.com/books'
	);

	return (
		<>
			{!isAuthenticated && <Redirect to='/signup' />}
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
	);
};

export default BookList;
