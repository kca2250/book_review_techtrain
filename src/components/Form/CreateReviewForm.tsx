import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateReveiwType } from '../Books/type';
import Btn from '../Button';

const CreateReviewForm: React.VFC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const token = localStorage.getItem('auth_token');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: CreateReveiwType) => {
		postBook(data);
		reset();
	};

	const postBook = async (props: CreateReveiwType) => {
		setIsLoading(true);
		const { title, url, detail, review } = props;
		await axios
			.post(
				'https://api-for-missions-and-railways.herokuapp.com/books',
				{
					title,
					url,
					detail,
					review,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err))
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl mt='5' isInvalid={errors.name}>
					<FormLabel role='contentinfo' fontSize='small'>
						必要事項を入力してください
					</FormLabel>

					<SimpleGrid spacing='4'>
						<Input
							role='form'
							id='name'
							autoComplete='off'
							variant='filled'
							placeholder='書籍タイトル'
							{...register('title', {
								required: '必須の項目です',
							})}
						/>
						<Input
							role='form'
							id='name'
							autoComplete='off'
							variant='filled'
							placeholder='書籍リンク'
							{...register('url', {
								required: '必須の項目です',
							})}
						/>
						<Input
							role='form'
							id='name'
							autoComplete='off'
							variant='filled'
							placeholder='書籍詳細'
							{...register('detail', {
								required: '必須の項目です',
							})}
						/>
						<Input
							role='form'
							id='name'
							autoComplete='off'
							variant='filled'
							placeholder='レビュー内容'
							{...register('review', {
								required: '必須の項目です',
							})}
						/>
						<Btn
							type='submit'
							text='投稿する'
							colorScheme='blue'
							size='sm'
							variant='outline'
							isLoading={isLoading}
						/>
					</SimpleGrid>

					<FormErrorMessage fontSize='sm' color='red.600'>
						{errors.new_username && errors.new_username.message}
					</FormErrorMessage>
				</FormControl>
			</form>
		</>
	);
};

export default CreateReviewForm;
