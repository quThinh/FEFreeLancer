import * as Yup from "yup";
import TProduct, { productSchema } from "./EProduct";

export const jobSchema = productSchema.shape({
	required_level: Yup.array().of(Yup.string()).default([]),
	payment_method: Yup.string().default(""),
});

export enum JobRequiredLevel {
	FRESHER = "fresher",
	SPECIALIST = "specialist",
	EXPERT = "expert",
}

export enum JobPaymentMethod {
	PAY_PER_HOUR = "pay-per-hour",
	PAY_PER_PROJECT = "pay-per-project",
}

type TJob = TProduct & {
	required_level: JobRequiredLevel[];
	payment_method: JobPaymentMethod;
};

export default TJob;
