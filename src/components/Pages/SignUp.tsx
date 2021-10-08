import React from 'react';
import { Text, Container } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import SignUpForm from '../Form/SignUpForm';

const SignUp: React.VFC = () => {
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
				新規登録
			</Text>

			{/* フォーム */}
			<SignUpForm />
			<Link to='/login'>
				<Text mt='2' textAlign='right' fontSize='sm' color='blue.400'>
					ログインはこちらから
				</Text>
			</Link>
		</Container>
	);
};

export default SignUp;
