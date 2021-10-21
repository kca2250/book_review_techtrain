import React, { useEffect, useState } from 'react';

import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Box, SimpleGrid } from '@chakra-ui/layout';
import { FormErrorMessage, Input, Progress } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { BookType, ReviewType } from '../Books/type';
import Btn from '../Button';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { useEdit } from '../../hooks/useEdit';

const EditReviewForm: React.VFC = () => {
	const history = useHistory();
	const params = useParams<{ id: string }>();
	const token = localStorage.getItem('auth_token');
	const { editReview } = useEdit();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [apiData, setApiData] = useState<BookType>();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: ReviewType) => {
		editReview({
			id: params.id,
			title: data.title,
			url: data.url,
			detail: data.detail,
			review: data.review,
		});
		reset();
		history.goBack();
	};

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
									variant='filled'
									placeholder={apiData?.title}
									{...register('title', {
										required: '必須の項目です',
									})}
								/>
							</Box>

							<Box>
								<FormLabel>詳細</FormLabel>
								<Input
									role='form'
									id='name'
									autoComplete='off'
									variant='filled'
									placeholder={apiData?.detail}
									{...register('detail', {
										required: '必須の項目です',
									})}
								/>
							</Box>
							<Box>
								<FormLabel>レビュー内容</FormLabel>
								<Input
									role='form'
									id='name'
									autoComplete='off'
									variant='filled'
									placeholder={apiData?.review}
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
									{...register('url', {
										required: '必須の項目です',
									})}
								/>
							</Box>
							<Btn
								type='submit'
								text='投稿する'
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
