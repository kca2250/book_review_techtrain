import React from 'react';
import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import EditUserForm from '../Form/EditUserForm';
import Btn from '../Button';
import { useAuth } from '../../hooks/useAuth';

const User: React.VFC = () => {
	const { logout } = useAuth();
	return (
		<SimpleGrid spacing='4'>
			<Text
				mt='10'
				paddingLeft='5px'
				borderLeft='6px solid #6088c4 '
				fontWeight='bold'>
				プロフィール編集
			</Text>

			<EditUserForm />
			<Box w='md'>
				<Btn
					text='ログアウト'
					size='sm'
					type='button'
					colorScheme='red'
					variant='outline'
					onClick={logout}
				/>
			</Box>
		</SimpleGrid>
	);
};

export default User;
