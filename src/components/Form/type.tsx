export type LoginType = {
	email: string;
	password: string;
};

export type SignUpType = {
	name: string;
	email: string;
	password: string;
};

export type EditUserType = {
	name: string;
};

export type EditBookReviewType = {
	id: string;
	title: string;
	detail: string;
	review: string;
	url: string;
};
