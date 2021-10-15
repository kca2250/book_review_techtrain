import React, { useContext } from 'react';
import { Box } from '@chakra-ui/layout';

import LogoTitle from './LogoTitle';
import Btn from '../Button';
import { AuthContext } from '../../contexts/Auth/AuthContext';

const Header: React.VFC = () => {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<header>
			<Box
				marginTop='12px'
				display='flex'
				alignItems='center'
				justifyContent='space-between'>
				<LogoTitle />
				{isAuthenticated === true && (
					<Btn
						text='プロフィール'
						type='button'
						size='sm'
						colorScheme='blue'
						variant='ghost'
					/>
				)}
			</Box>
		</header>
	);
};

export default Header;
