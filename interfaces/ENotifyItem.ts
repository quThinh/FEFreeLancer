import * as Yup from "yup";
export const ENotifyItem = Yup.object().shape({
	_id: Yup.string().default(""),
	noti_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	status: Yup.number().default(0),
	create_time: Yup.string().default(""),
});

type TENotifyItem = Yup.InferType<typeof ENotifyItem>;

export default TENotifyItem;
