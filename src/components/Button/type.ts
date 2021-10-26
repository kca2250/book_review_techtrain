export type ButtonType = {
	type: 'button' | 'submit';
	text: string;
	size: 'sm' | 'md';
	colorScheme: 'blue' | 'red';
	variant: 'outline' | 'ghost';
	isLoading?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
