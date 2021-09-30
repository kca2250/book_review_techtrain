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
import { InputFormType } from './type';
import Btn from '../Button';

const SignUpForm: React.VFC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: InputFormType) => {
		console.log({ data });
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl isInvalid={errors.email || errors.password}>
				<FormLabel mb='5' role='contentinfo' fontSize='sm' fontWeight='bold'>
					メールアドレスとパスワードを入力してください
				</FormLabel>
				<SimpleGrid role='grid' spacing='5'>
					<Input
						role='form'
						id='email'
						variant='filled'
						placeholder='メールアドレス'
						{...register('email', {
							required: 'メールアドレスを入力してください',
						})}
					/>

					<Input
						role='form'
						id='password'
						variant='filled'
						placeholder='パスワード'
						{...register('password', {
							required: 'パスワードを入力してください',
							minLength: { value: 8, message: '8文字以上で入力してください' },
						})}
					/>

					<Btn
						type='submit'
						text='登録する'
						colorScheme='blue'
						size='sm'
						variant='outline'
					/>
					<Divider />
					<FormErrorMessage fontSize='sm' color='red.600'>
						{errors.email && errors.email.message}
						<br />
						{errors.password && errors.password.message}
					</FormErrorMessage>
				</SimpleGrid>
			</FormControl>
		</form>
	);
};

export default SignUpForm;
