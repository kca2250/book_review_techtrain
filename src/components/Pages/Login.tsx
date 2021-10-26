import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import LoginForm from '../Form/LoginForm';

const Login: React.VFC = () => {
	return (
		<Container p='7' mt='8' maxW='sm'>
			<Text
				mb='4'
				pb='3'
				as='h2'
				textAlign='center'
				fontSize='lg'
				fontWeight='bold'
				borderBottom='1px solid #E6EDFA'>
				ログイン
			</Text>

			{/* フォーム */}
			<LoginForm />
		</Container>
	);
};

export default Login;
