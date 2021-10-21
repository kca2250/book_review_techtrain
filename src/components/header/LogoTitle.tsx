import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LogoSvg from '../../assets/img/book_review_app_logo.svg';

const LogoTitle: React.VFC = () => {
	return (
		<Box>
			<Link
				to='/'
				style={{
					display: 'flex',
					alignItems: 'center',
				}}>
				<img
					src={LogoSvg}
					alt='ロゴタイトル'
					style={{ width: '30px', height: 'auto' }}
				/>
				<Text
					className='title'
					ml='1'
					as='h1'
					fontSize='x-large'
					fontWeight='extrabold'>
					B.R.A
				</Text>
				<Text ml='3' fontSize='xs'>
					書籍レビューアプリ
				</Text>
			</Link>
		</Box>
	);
};

export default LogoTitle;
