import api from "api";
import TTicket from "interfaces/ETicket";
import TTicketMessage from "interfaces/ETicketMessage";
import queryString from "query-string";
import useSWR from "swr";
import { toast } from "react-toastify";

export interface IGetTicketList {
	page: number;
	limit: number;
	ticketID?: string;
	type?: string;
	status?: string;
	fields?: string;
}

function useTicketList(params: IGetTicketList) {
	const { data, error } = useSWR<{
		data: TTicket[];
		paginationInfo: { page: number; total: number };
	}>(`/tickets?${queryString.stringify(params)}`);
	return {
		tickets: data?.data,
		pagination: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
}

interface IGetItemTicket {
	id: string;
}

function useItemTicket(params: IGetItemTicket | null) {
	const { data, error } = useSWR<TTicket>(
		params ? `/tickets/${params.id}` : null
	);
	return {
		ticket: data,
		isLoading: !error && !data,
		isError: error,
	};
}

interface IGetTicketAttachment {
	id: string;
}

function useTicketAttachment(params: IGetTicketAttachment) {
	const { data, error } = useSWR<{
		data: string;
	}>(`/tickets/${params.id}/attachment`);
	return {
		attachment: data?.data,
		isLoading: !error && !data,
		isError: error,
	};
}

function useMessageTicketList(id: string | null) {
	const { data, error } = useSWR<{
		data: TTicketMessage[];
	}>(id ? `/tickets/message/${id}` : null);
	return {
		messages: data?.data,
		isLoading: !error && !data,
		isError: error,
	};
}

export interface ICreateTicket {
	type: "order" | "transaction" | "other";
	object: string;
	content: string;
	title: string;
}

const createTicket = (data: ICreateTicket) => {
	api.post(`/tickets`, data)
		.then(() => {
			toast.success("Tạo thành công!");
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};

const closeTicket = (id: string) => {
	api.patch(`/tickets/close${id}/`)
		.then(() => {
			toast.success("Xóa thành công!");
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};

interface ICreateTicketMessage {
	id: string;
	message: string;
}

const createTicketMessage = ({ id, message }: ICreateTicketMessage) => {
	api.post(`/tickets/message/create`, { ticket_id: id, message })
		.then(() => {
			{
			}
		})
		.catch((err) => {});
};

const ticketApi = {
	useTicketList,
	createTicket,
	useTicketAttachment,
	useMessageTicketList,
	useItemTicket,
	closeTicket,
	createTicketMessage,
};

export default ticketApi;
