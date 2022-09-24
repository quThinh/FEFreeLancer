import TUser, { userSchema } from "./EUser";
import Yup from "yup";
import { categorySchema } from "./ECategory";
import TSkill from "./ESkill";

export const clientSchema = userSchema.shape({
	category: Yup.array().of(categorySchema).default([]),
	skill: Yup.mixed(),
	successful_rate: Yup.number().default(0),
	introduction: Yup.string().default(""),
	sold_time: Yup.number().default(0),
	rate_star: Yup.number().default(0),
	rate_number: Yup.number().default(0),
	social_media_contact: Yup.mixed(),
	create_time: Yup.string().default(""),
});

export const clientSchemaDefault = clientSchema.getDefault();

type TClient = TUser & {
	create_time: string;
	category: {
		_id: string;
		name: string;
		slug: string;
		image: string;
		priority: number;
		status: number;
	}[];
	skill: TSkill[];
	successful_rate: number;
	sold_time: number;
	rate_star: number;
	rate_number: number;
	social_media_contact: { link: string; logo?: string }[];
};

export default TClient;
