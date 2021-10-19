import React, { useContext } from 'react';
import { Box } from '@chakra-ui/layout';

import LogoTitle from './LogoTitle';
import Btn from '../Button';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useHistory, useLocation } from 'react-router';

const Header: React.VFC<{ userName: string }> = (props) => {
	const history = useHistory();
	const location = useLocation();
	const { isAuthenticated } = useContext(AuthContext);
	const { userName } = props;

	const signupPath = location.pathname === '/signup';
	const loginPath = location.pathname === '/login';

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
						text={`ようこそ ${userName} さん`}
						type='button'
						size='sm'
						colorScheme='blue'
						variant='ghost'
					/>
				)}

				{signupPath && (
					<Btn
						text='ログイン'
						type='button'
						size='sm'
						colorScheme='blue'
						variant='outline'
						onClick={() => history.push('/login')}
					/>
				)}

				{loginPath && (
					<Btn
						text='新規登録'
						type='button'
						size='sm'
						colorScheme='blue'
						variant='outline'
						onClick={() => history.push('/signup')}
					/>
				)}
			</Box>
		</header>
	);
};

export default Header;
