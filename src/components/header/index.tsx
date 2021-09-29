import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { Link, useLocation } from 'react-router-dom';
import Btn from '../Button';
import LogoTitle from './LogoTitle';

const Header: React.VFC = () => {
	const location = useLocation();

	return (
		<header>
			<Box
				style={{
					marginTop: '12px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<LogoTitle />
				{location.pathname !== '/signup' ? (
					<Link to='/signup'>
						<Btn text='signup' size='sm' colorScheme='blue' variant='ghost' />
					</Link>
				) : (
					<Text fontSize='sm' color='blackAlpha.600'>
						新規登録画面
					</Text>
				)}
			</Box>
		</header>
	);
};

export default Header;
