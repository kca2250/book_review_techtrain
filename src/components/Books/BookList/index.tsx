import React, { useContext } from 'react';
import { Progress, Grid } from '@chakra-ui/react';

import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { useFetch } from '../../../hooks/useFetch';
import BookCard from '../BookCard';

const BookList: React.VFC = () => {
	const { token } = useContext(AuthContext);
	const url: string =
		'https://api-for-missions-and-railways.herokuapp.com/books';

	const { apiData, isLoading } = useFetch(url, token);

	return (
		<>
			{isLoading && <Progress size='xs' isIndeterminate />}
			<Grid overflow='hidden' templateColumns='repeat(4, 1fr)'>
				{apiData?.map((data) => {
					return (
						<BookCard
							id={data.id}
							title={data.title}
							detail={data.detail}
							url={data.url}
							review={data.review}
							reviewer={data.reviewer}
							isMine={data.isMine}
						/>
					);
				})}
			</Grid>
		</>
	);
};

export default BookList;
