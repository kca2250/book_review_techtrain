import React from 'react';
import { Box, Text, Tag, GridItem } from '@chakra-ui/react';
import { BookType } from '../type';
import { useHistory } from 'react-router';

const BookCard: React.VFC<BookType> = (props) => {
	const history = useHistory();
	const { index, id, title, detail, review, reviewer, isMine } = props;

	return (
		<GridItem
			onClick={() => history.push(`/detail/${id}`)}
			h='auto'
			border='1px solid #f0f0f0'
			borderRadius='md'
			margin='1'
			colSpan={2}
			p='5'
			id={id}
			key={index}>
			<Box alignItems='baseline' mb='2'>
				<Text fontSize='large' fontWeight='bold' mb='0.5'>
					{title}
				</Text>
				<Text
					overflow='hidden'
					textOverflow='ellipsis'
					whiteSpace='nowrap'
					fontWeight='light'
					fontSize='sm'
					color='blackAlpha.500'>
					{detail}
				</Text>
			</Box>

			<Text
				mb='3'
				overflow='hidden'
				textOverflow='ellipsis'
				whiteSpace='nowrap'>
				{review}
			</Text>

			{!isMine && <Tag>{reviewer}</Tag>}
		</GridItem>
	);
};

export default BookCard;
