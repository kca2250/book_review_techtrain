export type PropsType = {
	type: 'button' | 'submit';
	text: string;
	size: 'sm' | 'md';
	colorScheme: 'blue' | 'red';
	variant: 'outline' | 'ghost';
	isLoading?: boolean;
};
