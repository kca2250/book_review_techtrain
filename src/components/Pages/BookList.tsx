import React from 'react';
import { Progress, Grid } from '@chakra-ui/react';
import { useFetch } from '../../hooks/useFetch';
import BookCard from '../BookCard';
import Btn from '../Button';
import { useHistory } from 'react-router';

const BookList: React.VFC = () => {
	const history = useHistory();
	const { apiData, isLoading } = useFetch(
		'https://api-for-missions-and-railways.herokuapp.com/books'
	);

	return (
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
	);
};

export default BookList;