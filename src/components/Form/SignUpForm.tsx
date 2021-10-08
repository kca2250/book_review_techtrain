import React from 'react';
import {
	Divider,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	SimpleGrid,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { SignUpType } from './type';
import Btn from '../Button';
import axios from 'axios';
import { useHistory } from 'react-router';

const SignUpForm: React.VFC = () => {
	const history = useHistory();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: SignUpType) => {
		axios
			.post(
				'https://api-for-missions-and-railways.herokuapp.com/users',
				{
					name: data.name,
					email: data.email,
					password: data.password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
				}
			)
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					alert('ユーザー登録が完了しました');
					history.push('/');
				} else if (res.status === 500) {
					alert('サーバーで問題が起きたようです');
					reset();
				} else {
					alert('ユーザー登録に失敗しました');
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.email || errors.password || errors.name}>
				<FormLabel mb='5' role='contentinfo' fontSize='sm' fontWeight='bold'>
					以下のフォームすべてに入力してください
				</FormLabel>
				<SimpleGrid role='grid' spacing='5'>
					<Input
						role='form'
						id='name'
						autoComplete='off'
						variant='filled'
						placeholder='ユーザーネーム'
						{...register('name', {
							required: 'ユーザーネームを入力してください',
						})}
					/>
					<Input
						role='form'
						id='email'
						autoComplete='off'
						variant='filled'
						placeholder='メールアドレス'
						{...register('email', {
							required: 'メールアドレスを入力してください',
							pattern: {
								value:
									/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
								message: 'メールアドレスの形式ではありません',
							},
						})}
					/>

					<Input
						role='form'
						type='password'
						id='password'
						autoComplete='off'
						variant='filled'
						placeholder='パスワード'
						{...register('password', {
							required: 'パスワードを入力してください',
							minLength: { value: 8, message: '8文字以上で入力してください' },
						})}
					/>

					<Btn
						type='submit'
						text='新規登録'
						colorScheme='blue'
						size='sm'
						variant='outline'
					/>
					<FormErrorMessage fontSize='sm' color='red.600'>
						{errors.name && errors.user_name.message}
						<br />
						{errors.email && errors.email.message}
						<br />
						{errors.password && errors.password.message}
					</FormErrorMessage>
					<Divider />
				</SimpleGrid>
			</FormControl>
		</form>
	);
};

export default SignUpForm;
