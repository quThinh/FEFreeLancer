import * as Yup from "yup";

export enum EOrderComplainStatus {
	PENDING = "PENDING",
	RESOLVED = "RESOLVED",
}

export const orderComplainSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	order_id: Yup.mixed(),
	client_id: Yup.mixed(),
	complain: Yup.string().default(""),
	images: Yup.array().of(Yup.string()).default([]),
	status: Yup.string()
		.oneOf([EOrderComplainStatus.PENDING, EOrderComplainStatus.RESOLVED])
		.default(EOrderComplainStatus.PENDING),
	admin_id: Yup.mixed(),
	create_time: Yup.string().default(""),
});

type TOrderComplain = Yup.InferType<typeof orderComplainSchema>;

export default TOrderComplain;
