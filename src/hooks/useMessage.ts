import { useToast } from '@chakra-ui/react';

type toastType = {
	title: string;
	status: 'info' | 'error' | 'warning';
};

export const useMessage = () => {
	const toast = useToast();

	const showMessage = (props: toastType) => {
		const { title, status } = props;

		toast({
			position: 'top',
			title: title,
			status: status,
			duration: 3000,
			isClosable: true,
		});
	};

	return { showMessage };
};
