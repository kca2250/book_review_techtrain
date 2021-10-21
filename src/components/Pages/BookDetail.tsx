import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Link, Progress } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router';
import { BookType } from '../Books/type';
import Btn from '../Button';

const BookDetails: React.VFC = () => {
	const history = useHistory();
	const [apiData, setApiData] = useState<BookType>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const params = useParams<{ id: string }>();
	const token = localStorage.getItem('auth_token');

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await axios
				.get(
					`https://api-for-missions-and-railways.herokuapp.com/books/${params.id}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				.then((res) => setApiData(res.data))
				.catch((e) => console.log(e.preview))
				.finally(() => setIsLoading(false));
		};
		fetchData();
	}, [params.id, token]);

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
								<Btn
									text='編集'
									size='sm'
									type='button'
									colorScheme='blue'
									variant='outline'
									onClick={() => history.push(`/edit/${params.id}`)}
								/>
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
