import * as Yup from "yup";
import TCategory from "./ECategory";

export const skillSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	name: Yup.string().default(""),
	description: Yup.string().default(""),
	image: Yup.string().default(""),
	slug: Yup.string().default(""),
});

export type TSkill = Omit<TCategory, "parent_category">;

export default TSkill;
