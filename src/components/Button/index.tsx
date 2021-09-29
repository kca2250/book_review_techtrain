import { Button } from '@chakra-ui/button';
import React from 'react';
import { PropsType } from './type';

const Btn: React.VFC<PropsType> = (props) => {
	const { text, size, colorScheme, variant } = props;
	return (
		<Button size={size} colorScheme={colorScheme} variant={variant}>
			{text}
		</Button>
	);
};

export default Btn;
