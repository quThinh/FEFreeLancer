import * as Yup from "yup";
import TCategory, { categorySchema } from "./ECategory";
import TClient from "./EClient";
import TSkill, { skillSchema } from "./ESkill";
import TUser from "./EUser";

export enum EProductStatus {
	NEW,
	ACTIVE,
	NOT_VISIBLE,
	INACTIVE,
}

export enum EProductType {
	SERVICE="service",
		JOB="job"
}

export enum ProductProvidingMethod {
	REMOTE = "remote",
	ONLINE = "online",
	OFFLINE = "offline",
	CONTRACT = "contract",
	OTHER = "other",
}

export const productSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	name: Yup.string().default(""),
	category: Yup.array().of(categorySchema).default([]),
	skill: Yup.array().of(skillSchema).default([]),
	description: Yup.string().default(""),
	providing_method: Yup.array().of(Yup.string()).default([]),
	finish_estimated_time: Yup.number().default(0),
	lower_bound_fee: Yup.number().default(0),
	upper_bound_fee: Yup.number().default(0),
	status: Yup.mixed()
		.oneOf(Object.values(EProductStatus))
		.default(EProductStatus.NEW),
	type: Yup.mixed()
		.oneOf(Object.values(EProductType))
		.default(EProductType.SERVICE),
	create_time: Yup.string().default(""),
	expiration_time: Yup.string().default(""),
});


type TProduct = {
	_id: string;
	user_id?: TClient;
	name: string;
	slug: string;
	skill: TSkill[];
	category: TCategory[];
	image: string[];
	description: string;
	providing_method: ProductProvidingMethod[];
	finish_estimated_time: number;
	lower_bound_fee: number;
	upper_bound_fee: number;
	status: number;
	create_time: string;
	expiration_time: string;
};

export default TProduct;
