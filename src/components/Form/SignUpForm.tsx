import React, { useContext } from 'react';
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
import { useAuth } from '../../hooks/useAuth';
import { Redirect } from 'react-router';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import Btn from '../Button';

const SignUpForm: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const { signup, isLoading } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: SignUpType) => {
		signup({ ...data });
		reset();
	};

	return (
		<>
			{isAuthenticated ? (
				<Redirect to='/' />
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl
						isInvalid={errors.email || errors.password || errors.name}>
						<FormLabel
							mb='5'
							role='contentinfo'
							fontSize='sm'
							fontWeight='bold'>
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
									minLength: {
										value: 8,
										message: '8文字以上で入力してください',
									},
								})}
							/>

							<Btn
								type='submit'
								text='新規登録'
								colorScheme='blue'
								size='sm'
								variant='outline'
								isLoading={isLoading}
							/>
							<FormErrorMessage fontSize='sm' color='red.600'>
								{errors.name && errors.name.message}
								<br />
								{errors.email && errors.email.message}
								<br />
								{errors.password && errors.password.message}
							</FormErrorMessage>
							<Divider />
						</SimpleGrid>
					</FormControl>
				</form>
			)}
		</>
	);
};

export default SignUpForm;
