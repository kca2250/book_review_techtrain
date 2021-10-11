import React from 'react';
import { Button } from '@chakra-ui/button';
import { PropsType } from './type';

const Btn: React.VFC<PropsType> = (props) => {
	const { type, text, size, colorScheme, variant, isLoading } = props;
	return (
		<Button
			role='button'
			type={type}
			size={size}
			colorScheme={colorScheme}
			variant={variant}
			isLoading={isLoading}>
			{text}
		</Button>
	);
};

export default Btn;
