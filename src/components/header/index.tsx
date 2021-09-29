import { Box } from '@chakra-ui/layout';
import React from 'react';
import Btn from '../Button';
import LogoTitle from './LogoTitle';

const Header: React.VFC = () => {
	return (
		<header>
			<Box
				mt='3'
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<LogoTitle />
				<Btn text='signup' size='sm' colorScheme='blue' variant='ghost' />
			</Box>
		</header>
	);
};

export default Header;
