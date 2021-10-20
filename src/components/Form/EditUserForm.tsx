import React, { useEffect } from 'react';
import {
	Box,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { EditUserType } from './type';
import Btn from '../Button';
import { useEdit } from '../../hooks/useEdit';
import { useAuth } from '../../hooks/useAuth';

const EditUserForm: React.VFC = () => {
	const { isLoading, editUser } = useEdit();
	const { fetchUserData, userName } = useAuth();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({ mode: 'onBlur' });

	const onSubmit = (data: EditUserType) => {
		editUser(data.name);
		reset();
	};

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);
	console.log(userName);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormControl mt='5' isInvalid={errors.name} w='md'>
					<FormLabel role='contentinfo' fontSize='small' fontWeight='bold'>
						新しいユーザーネームを入力してください
					</FormLabel>

					<Box display='grid' gridTemplateColumns='1fr auto' gridGap='5'>
						<Input
							role='form'
							size='sm'
							id='name'
							autoComplete='off'
							variant='filled'
							placeholder={userName}
							{...register('name', {
								required: '必須の項目です',
							})}
						/>

						<Btn
							type='submit'
							text='編集する'
							colorScheme='blue'
							size='sm'
							variant='outline'
							isLoading={isLoading}
						/>
					</Box>

					<FormErrorMessage fontSize='sm' color='red.600'>
						{errors.new_username && errors.new_username.message}
					</FormErrorMessage>
				</FormControl>
			</form>
		</>
	);
};

export default EditUserForm;
