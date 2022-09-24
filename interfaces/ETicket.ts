import * as Yup from "yup";

enum ETicketType {
	CAMPAIGN = "campaign",
	INVOICE = "invoice",
	BILL = "bill",
	ORDER = "order",
	OTHER = "other",
}

export const ticketSchema = Yup.object().shape({
	_id: Yup.string().default(""),
	ticket_id: Yup.string().default(""),
	user_id: Yup.mixed(),
	title: Yup.string().default(""),
	type: Yup.mixed()
		.oneOf(Object.values(ETicketType))
		.default(ETicketType.OTHER),
	object: Yup.string().default(""),
	content: Yup.string().default(""),
	attachment: Yup.string().default(""),
	status: Yup.string().default(""),
	create_time: Yup.string().default(""),
	close_time: Yup.string().default(""),
});

type TTicket = {
	_id: string;
	ticket_id: string;
	user_id: string;
	title: string;
	type: string;
	object: string;
	content: string;
	attachment: string;
	status: string;
	create_time: string;
	icon: string;
};

export default TTicket;
