import React from 'react';
import { Button } from '@chakra-ui/button';
import { ButtonType } from './type';

const Btn: React.VFC<ButtonType> = (props) => {
	const { type, text, size, colorScheme, variant, isLoading, onClick } = props;
	return (
		<Button
			role='button'
			type={type}
			size={size}
			colorScheme={colorScheme}
			variant={variant}
			isLoading={isLoading}
			onClick={onClick}>
			{text}
		</Button>
	);
};

export default Btn;
