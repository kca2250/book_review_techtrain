import React from 'react';
import { Box } from '@chakra-ui/layout';
import { Link, useLocation } from 'react-router-dom';

import Btn from '../Button';
import LogoTitle from './LogoTitle';

const Header: React.VFC = () => {
	const location = useLocation();

	return (
		<header>
			<Box
				marginTop='12px'
				display='flex'
				alignItems='center'
				justifyContent='space-between'>
				<LogoTitle />
				{location.pathname !== '/signup' ? (
					location.pathname !== '/login' ? (
						<Link to='/signup'>
							<Btn
								type='button'
								text='signup'
								size='sm'
								colorScheme='blue'
								variant='ghost'
							/>
						</Link>
					) : (
						''
					)
				) : (
					''
				)}
			</Box>
		</header>
	);
};

export default Header;
