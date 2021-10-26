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
import { LoginType } from './type';
import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import Btn from '../Button';
import { Redirect } from 'react-router';

const LoginForm: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);
	const { isLoading, login } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: LoginType) => {
		login({ ...data });
		reset();
	};

	return (
		<>
			{isAuthenticated ? (
				<Redirect to='/' />
			) : (
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl isInvalid={errors.email || errors.password}>
						<FormLabel
							mb='5'
							role='contentinfo'
							fontSize='sm'
							fontWeight='bold'>
							メールアドレスとパスワードを入力してください
						</FormLabel>
						<SimpleGrid role='grid' spacing='5'>
							<Input
								role='form'
								id='email'
								variant='filled'
								autoComplete='off'
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
								text='ログイン'
								colorScheme='blue'
								size='sm'
								variant='outline'
								isLoading={isLoading}
							/>
							<FormErrorMessage fontSize='sm' color='red.600'>
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

export default LoginForm;
