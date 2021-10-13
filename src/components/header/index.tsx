import React from 'react';
import { Box } from '@chakra-ui/layout';

import LogoTitle from './LogoTitle';

const Header: React.VFC = () => {
	return (
		<header>
			<Box
				marginTop='12px'
				display='flex'
				alignItems='center'
				justifyContent='space-between'>
				<LogoTitle />
			</Box>
		</header>
	);
};

export default Header;
