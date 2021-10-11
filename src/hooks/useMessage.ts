import { useToast } from '@chakra-ui/react';

type toastType = {
	title: string;
};

export const useMessage = () => {
	const toast = useToast();

	const successMessage = (props: toastType) => {
		const { title } = props;

		toast({
			position: 'top',
			title: title,
			status: 'success',
			duration: 3000,
			isClosable: true,
			variant: 'subtle',
		});
	};

	const errorMessage = (props: toastType) => {
		const { title } = props;

		toast({
			position: 'top',
			title: title,
			status: 'error',
			duration: 3000,
			isClosable: true,
			variant: 'subtle',
		});
	};

	const warningMessage = (props: toastType) => {
		const { title } = props;

		toast({
			position: 'top',
			title: title,
			status: 'warning',
			duration: 3000,
			isClosable: true,
			variant: 'subtle',
		});
	};

	const infoMessage = (props: toastType) => {
		const { title } = props;

		toast({
			position: 'top',
			title: title,
			status: 'info',
			duration: 3000,
			isClosable: true,
			variant: 'subtle',
		});
	};

	return { successMessage, errorMessage, warningMessage, infoMessage };
};
