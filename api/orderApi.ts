import api from "api";
import TOrder from "interfaces/EOrder";
import queryString from "query-string";
import useSWR from "swr";
import { toast } from "react-toastify";

export interface IGetOrder {
	page: number;
	limit: number;
}

function useOrderJob(params: IGetOrder) {
	const { data, error } = useSWR<TOrder[]>(
		`/order?${queryString.stringify(params)}`
	);
	return {
		order: data?.filter((item) => item.type === "job"),
		isLoading: !error && !data,
		isError: error,
	};
}

function useOrderService(params: IGetOrder) {
	const { data, error } = useSWR<TOrder[]>(
		`/order?${queryString.stringify(params)}`
	);
	return {
		order: data,
		isLoading: !error && !data,
		isError: error,
	};
}

function getOrderById(jobOrderId: string) {
	const { data, error } = useSWR<TOrder>(`/order/${jobOrderId}`);
	return {
		order: data,
		isLoading: !error && !data,
		isError: error,
	};
}

const cancelOrder = (jobOrderId: string, cancel_note: string) => {
	return api.post(`/order/cancel/${jobOrderId}`, { cancel_note });
};

const confirmOrder = (jobOrderId: string | undefined) => {
	return jobOrderId ? api.post(`/order/confirm/${jobOrderId}`) : null;
};

const finishMentorOrder = (jobOrderId: string | undefined) => {
	return jobOrderId ? api.post(`/order/finishMentor/${jobOrderId}`) : null;
};

const completeOrder = (jobOrderId: string | undefined) => {
	return jobOrderId
		? api
				.post(`/order/complete/${jobOrderId}`)
				.then(() => {
					toast.success("Thành công!");
				})
				.catch((err) => {
					toast.error(err?.response?.data?.message);
				})
		: null;
};

const complainOrder = (jobOrderId: string, note: string) => {
	return api.post(`/order/complain/${jobOrderId}`, { note });
};

export interface IRequestService {
	service_id: string;
	price: number;
	note: string;
}

const request = ({ service_id, price, note }: IRequestService) => {
	api.post(`/order/request/${service_id}`, { price, note })
		.then(() => {
			toast.success("Gửi yêu cầu thành công!");
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};

const orderApi = {
	getOrderById,
	finishMentorOrder,
	useOrderJob,
	useOrderService,
	request,
	cancelOrder,
	confirmOrder,
	completeOrder,
	complainOrder,
};

export default orderApi;
