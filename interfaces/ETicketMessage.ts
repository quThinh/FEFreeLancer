import * as Yup from "yup";

export const ticketMessageSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	ticket_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	content: Yup.string().default(""),
	attachment: Yup.string().default(""),
	create_time: Yup.string().default(""),
});

type TTicketMessage = Yup.InferType<typeof ticketMessageSchema>;

export default TTicketMessage;
