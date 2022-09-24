import * as Yup from "yup";
import { userSchema } from "./EUser";

export const reviewSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	order_id: Yup.string().default(""),
	product_id: Yup.string().default(""),
	reviewer_id: userSchema,
	being_reviewed_user_id: Yup.string().default(""),
	rate: Yup.number().default(0),
	content: Yup.string().default(""),
	status: Yup.boolean(),
});

type TReview = Yup.InferType<typeof reviewSchema>;

export default TReview;
