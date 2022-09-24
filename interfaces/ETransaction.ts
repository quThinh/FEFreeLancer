import * as Yup from "yup";

export enum ETransactionDirection {
	INCOMING,
	OUTGOING,
}

export enum ETransactionType {
	INTERNAL,
	EXTERNAL,
}

export enum ETransactionStatus {
	PENDING,
	CONFIRMED,
	FAILED,
}

export const transactionSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	wallet_id: Yup.mixed(),
	direction: Yup.mixed().oneOf(Object.values(ETransactionDirection)),
	type: Yup.mixed().oneOf(Object.values(ETransactionType)),
	amount: Yup.number().default(0),
	fee: Yup.number().default(0),
	content: Yup.string().default(""),
	status: Yup.mixed().oneOf(Object.values(ETransactionStatus)),
	transaction_time: Yup.string().default(""),
	admin_id: Yup.mixed(),
});

type TTransaction = {
    _id: string,
    wallet_id: string,
    direction: 0 | 1,
    type: 0 | 1;
    amount: number
    fee: number
    content: string
    status: number
    transaction_time: Date,
    admin_id: string,
}

export default TTransaction;
