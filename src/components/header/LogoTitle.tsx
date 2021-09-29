import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import LogoSvg from '../../assets/book_review_app_logo.svg';

const LogoTitle: React.VFC = () => {
	return (
		<Box
			style={{
				display: 'flex',
				alignItems: 'center',
			}}>
			<img
				src={LogoSvg}
				alt='ロゴタイトル'
				style={{ width: '30px', height: 'auto' }}
			/>
			<Text ml='1' as='h1' fontSize='xl' fontWeight='extrabold'>
				B.R.A
			</Text>
		</Box>
	);
};

export default LogoTitle;
