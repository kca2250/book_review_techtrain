import React from 'react';
import { Container, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import InputForm from '../Form/InputForm';

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
			<InputForm text='ログイン' />

			<Link to='/signup'>
				<Text mt='2' fontSize='sm' color='blue.400'>
					新規登録はこちらから
				</Text>
			</Link>
		</Container>
	);
};

export default Login;
