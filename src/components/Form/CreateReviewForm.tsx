import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	SimpleGrid,
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BookType } from '../BookCard/type';
import { useBook } from '../../hooks/useBook';
import Btn from '../Button';

const CreateReviewForm: React.VFC = () => {
	const { isLoading, createPost } = useBook();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: BookType) => {
		createPost(data);
		reset();
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
