import * as Yup from "yup";
import TCategory from "./ECategory";
import TUser from "./EUser";

export enum ENewsStatus {
	DRAFT = "DRAFT",
	PUBLISHED = "PUBLISHED",
	DELETED = "DELETED",
}

export const newsSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	title: Yup.string().default(""),
	category: Yup.mixed(),
	thumbnail: Yup.string().default(""),
	content: Yup.string().default(""),
	status: Yup.mixed().oneOf(Object.values(ENewsStatus)),
	priority: Yup.number().default(0),
	create_time: Yup.string().default(""),
});

export enum NewsStatus {
	Draft,
	Published,
	Deleted,
}
type TNews = {
	_id: string;
	user_id: Partial<TUser>;
	title: string;
	category: TCategory[];
	thumbnail: string;
	content: string;
	status: NewsStatus;
	priority: number;
	create_time: string;
};


export default TNews;
