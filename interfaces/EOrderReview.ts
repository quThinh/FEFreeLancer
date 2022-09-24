import * as Yup from "yup";
export const orderReviewSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	order_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	content: Yup.string().default(""),
	rate: Yup.number().default(0),
	status: Yup.bool().default(false),
});

type TOrderReview = Yup.InferType<typeof orderReviewSchema>;

export default TOrderReview;
