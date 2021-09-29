import React from 'react';
import './App.css';

import { Container } from '@chakra-ui/react';
import Header from './header';

const App: React.VFC = () => {
	return (
		<Container>
			<Header />
		</Container>
	);
};

export default App;
