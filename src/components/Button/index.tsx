import React from 'react';
import { Button } from '@chakra-ui/button';
import { PropsType } from './type';

const Btn: React.VFC<PropsType> = (props) => {
	const { type, text, size, colorScheme, variant } = props;
	return (
		<Button
			role='button'
			type={type}
			size={size}
			colorScheme={colorScheme}
			variant={variant}>
			{text}
		</Button>
	);
};

export default Btn;
