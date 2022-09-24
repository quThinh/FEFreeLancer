import * as Yup from "yup";
import { EProductType } from "./EProduct";

export enum EOrderStatus {
	PENDING,
	ACCEPTED,
	FINISHED,
	PAID,
	COMPLAINING,
	CANCELED,
	DENIED,
	CLOSED,
}
export const orderSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	product_id: Yup.string().default(""),
	provider_id: Yup.string().default(""),
	client_id: Yup.string().default(""),
	type: Yup.mixed().oneOf(Object.values(EProductType)),
	price: Yup.number().default(0),
	status: Yup.mixed().oneOf(Object.values(EOrderStatus)),
	note: Yup.string().default(""),
	estimated_time: Yup.number().default(0),
	create_time: Yup.string().default(""),
	cancel_note: Yup.string().default(""),
});

export type providerid = {
	_id: string;
	fullname: string;
	type: string;
};
export type productid = {
	_id: string;
	name: string;
};

export type history = {
	update_day: string;
	cancel_day: string;
};

type TOrder = {
	_id: string;
	provider_id: providerid;
	product_id: productid;
	client_id: {
		_id: string;
		fullname: string;
		type: string;
	};
	type: string;
	price: number;
	status: EOrderStatus;
	note: string;
	estimated_time: number;
	create_time: string;
	__v: number;
	history: history;
};

export default TOrder;
