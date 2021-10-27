import React from 'react';
import { Text } from '@chakra-ui/react';
import CreateBookReviewForm from '../Form/CreateBookReviewForm';

const CreateBookReview: React.VFC = () => {
	return (
		<>
			<Text
				mb-='3'
				as='h2'
				fontWeight='bold'
				fontSize='large'
				color='blackAlpha.700'>
				レビュー作成画面
			</Text>

			<CreateBookReviewForm />
		</>
	);
};

export default CreateBookReview;
