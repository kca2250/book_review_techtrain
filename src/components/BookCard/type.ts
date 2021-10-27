export type BookType = {
	readonly index?: number;
	readonly id: string;
	title: string;
	detail: string;
	url?: string;
	review: string;
	reviewer: string;
	readonly isMine: boolean;
};
