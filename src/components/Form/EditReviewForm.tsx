import React, { useContext, useEffect, useState } from 'react';
import Btn from '../Button';
import axios from 'axios';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, SimpleGrid } from '@chakra-ui/layout';
import { FormErrorMessage, Input, Progress, Textarea } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BookType } from '../BookCard/type';
import { useHistory, useParams } from 'react-router';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useBookReview } from '../../hooks/useBookReview';
import { EditBookReviewType } from './type';

const EditReviewForm: React.VFC = () => {
	const history = useHistory();
	const params = useParams<{ id: string }>();
	const { authToken } = useContext(AuthContext);
	const { editBookReview } = useBookReview();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apiData, setApiData] = useState<BookType>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: EditBookReviewType) => {
		editBookReview({
			id: params.id,
			title: data.title,
			detail: data.detail,
			review: data.review,
			url: data.url,
		});
		history.push(`/detail/${params.id}`);
		reset();
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
	}, [params.id, authToken]);

	return (
		<>
			{isLoading ? (
				<Progress size='xs' isIndeterminate />
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl mt='5' isInvalid={errors.name}>
						<FormLabel role='contentinfo' fontSize='small'>
							必要事項を入力してください
						</FormLabel>

						<SimpleGrid spacing='4'>
							<Box>
								<FormLabel>タイトル</FormLabel>
								<Input
									role='form'
									id='name'
									autoComplete='off'
									placeholder={apiData?.title}
									value={apiData?.title}
									{...register('title', {
										required: '必須の項目です',
									})}
								/>
							</Box>

							<Box>
								<FormLabel>詳細</FormLabel>
								<Textarea
									role='form'
									id='name'
									placeholder={apiData?.detail}
									value={apiData?.detail}
									{...register('detail', {
										required: '必須の項目です',
									})}
								/>
							</Box>
							<Box>
								<FormLabel>レビュー内容</FormLabel>
								<Textarea
									role='form'
									id='name'
									autoComplete='off'
									variant='filled'
									placeholder={apiData?.review}
									value={apiData?.review}
									{...register('review', {
										required: '必須の項目です',
									})}
								/>
							</Box>

							<Box>
								<FormLabel>URL</FormLabel>
								<Input
									role='form'
									id='name'
									autoComplete='off'
									variant='filled'
									placeholder={apiData?.url}
									value={apiData?.url}
									{...register('url', {
										required: '必須の項目です',
									})}
								/>
							</Box>
							<Btn
								type='submit'
								text='編集する'
								colorScheme='blue'
								size='sm'
								variant='outline'
							/>
						</SimpleGrid>

						<FormErrorMessage fontSize='sm' color='red.600'>
							{errors.new_username && errors.new_username.message}
						</FormErrorMessage>
					</FormControl>
				</form>
			)}
		</>
	);
};

export default EditReviewForm;
