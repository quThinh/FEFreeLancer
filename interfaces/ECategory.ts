import * as Yup from "yup";

export const categorySchema = Yup.object().shape({
	_id: Yup.string().default(""),
	name: Yup.string().default(""),
	description: Yup.string().default(""),
	image: Yup.string().default(""),
	slug: Yup.string().default(""),
	number_of_service: Yup.number().default(0),
	parent_category: Yup.mixed().default(null),
	priority: Yup.number().default(0),
});

type TCategory = {
	_id: string;
	name: string;
	parent_category?: TCategory | null;
	number_of_service?: number;
	slug: string;
	image: string;
	priority: number;
};

export default TCategory;
