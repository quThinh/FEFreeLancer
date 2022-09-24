import * as Yup from "yup";

export enum EWalletStatus {
	NEW = "new",
	ACTIVATED = "activated",
	LOCKED = "locked",
}

export const walletSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	balance: Yup.number().default(0),
	available_balance: Yup.number().default(0),
	status: Yup.mixed().oneOf(Object.values(EWalletStatus)),
	create_time: Yup.string().default(""),
});

type TWallet = {
	_id: string;
	user_id: string;
	balance: number;
	available_balance: number;
	status: number;
	create_time: Date;
}


export default TWallet;
