import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Link, Progress } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router';
import { useBookReview } from '../../hooks/useBookReview';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { BookType } from '../BookCard/type';
import Btn from '../Button';

const BookDetails: React.VFC = () => {
	const history = useHistory();
	const { deleteBookReview } = useBookReview();
	const { authToken } = useContext(AuthContext);
	const [apiData, setApiData] = useState<BookType>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const params = useParams<{ id: string }>();

	const deleteHandler = () => {
		const result = window.confirm('投稿を削除しますか？');
		result && deleteBookReview(params.id);
		return;
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await axios
				.get(
					`https://api-for-missions-and-railways.herokuapp.com/books/${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
					}
				)
				.then((res) => setApiData(res.data))
				.catch((e) => console.log(e.preview))
				.finally(() => setIsLoading(false));
		};
		fetchData();
	}, [authToken, params.id]);

	return (
		<>
			{isLoading ? (
				<Progress size='xs' isIndeterminate />
			) : (
				<>
					<Text
						paddingLeft='5px'
						borderLeft='6px solid #6088c4 '
						as='h2'
						fontWeight='bold'>
						レビュー書籍詳細
					</Text>
					<Box mt='5' as='article' role='article'>
						<Box
							mb='3'
							display='flex'
							alignContent='center'
							justifyContent='space-between'>
							<Link role='link' href={apiData?.url}>
								<Text fontSize='larger' as='h3' fontWeight='bold'>
									{apiData?.title}
								</Text>
							</Link>
							{apiData?.isMine !== true ? (
								<Text color='blackAlpha.700'>{apiData?.reviewer}</Text>
							) : (
								<Box display='grid' gridGap='4' gridTemplateColumns='auto auto'>
									<Btn
										text='編集'
										size='sm'
										type='button'
										colorScheme='blue'
										variant='outline'
										onClick={() => history.push(`/edit/${params.id}`)}
									/>
									<Btn
										text='削除'
										size='sm'
										type='button'
										colorScheme='red'
										variant='outline'
										onClick={deleteHandler}
									/>
								</Box>
							)}
						</Box>
						<Text color='blackAlpha.500'>{`書籍詳細  :  ${apiData?.detail}`}</Text>
						<Box mt='4' p='5' backgroundColor='whitesmoke' borderRadius='sm'>
							<Text color='blackAlpha.700'>{apiData?.review}</Text>
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default BookDetails;
