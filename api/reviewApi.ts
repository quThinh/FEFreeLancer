import useSWR from "swr";
import queryString from "query-string";
import api from ".";
import List from "interfaces/List";
import TReview from "interfaces/EReview";
import { toast } from "react-toastify";

export interface IGetReviewsOfService {
	serviceId: string;
	page: number;
	limit: number;
	sort?: string;
}

const useReviewsOfServices = (params: IGetReviewsOfService | null) => {
	const { data, error } = useSWR<List<TReview>>(
		params
			? `/review/service/${params.serviceId}?${queryString.stringify({
					page: params.page,
					limit: params.limit,
					sort: params.sort,
			  })}`
			: null
	);
	return {
		data: data?.data,
		paginationInfo: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
};

export interface IGetReviewsOfClient {
	user_id: string;
	page: number;
	limit: number;
	sort?: string;
}

const useReviewsOfUser = (params: IGetReviewsOfClient | null) => {
	const { data, error } = useSWR<List<TReview>>(
		params
			? `/review/user/${params.user_id}?${queryString.stringify({
					page: params.page,
					limit: params.limit,
					sort: params.sort,
			  })}`
			: null
	);
	return {
		data: data?.data,
		isLoading: !error && !data,
		paginationInfo: data?.paginationInfo,
		isError: error,
	};
};

export interface ICreateReview {
	orderId: string;
	rate: number;
	content: string;
}

const createOrderReview = async ({ orderId, rate, content }: ICreateReview) => {
	await api.post(`/review/${orderId}`, {
		rate,
		content,
	})
	.then(() => {
		toast.success("Đã Review thành công")
	})
	.catch(() => {
		toast.error("Bạn đã review cho dịch vụ này rồi")
	})
	;
};

const deleteReview = async (reviewId: string) => {
	await api.delete(`/review/${reviewId}`);
};

const reviewApi = {
	useReviewsOfServices,
	useReviewsOfUser,
	createOrderReview,
	deleteReview,
};

export default reviewApi;
