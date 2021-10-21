import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Link, Progress } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { BookType } from '../Books/type';

const BookDetails: React.VFC = () => {
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

	console.log(apiData?.isMine);
	return (
		<>
			{isLoading ? (
				<Progress size='xs' isIndeterminate />
			) : (
				<>
					<Text as='h2' fontWeight='bold'>
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
							<Text color='blackAlpha.700'>{apiData?.reviewer}</Text>
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
