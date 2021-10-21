import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import SignInForm from '../Form/SignInForm';

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
			<SignInForm />
		</Container>
	);
};

export default Login;
