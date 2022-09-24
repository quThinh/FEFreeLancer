import TOffer from "interfaces/EOffer";
import { toast } from "react-toastify";
import useSWR from "swr";
import api from ".";
import queryString from "query-string";

export interface IGetOfferList {
	page: number;
	limit: number;
}

function useOfferList(filter: IGetOfferList, id: string) {
	const { data, error } = useSWR<TOffer[]>(
		`/offers/${id}?${queryString.stringify(filter)}`
	);
	return {
		offerList: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export interface IOfferJob {
	jobId: string | undefined;
	offer_price: number;
	offer_finish_estimated_time: number;
	introduction: string;
}

const offer = async ({
	jobId,
	offer_price,
	offer_finish_estimated_time,
	introduction,
}: IOfferJob) => {
	return await api
		.post(`/offers/${jobId}`, {
			offer_price,
			offer_finish_estimated_time,
			introduction,
		})
		.then(() => {
			toast.success("Đã gửi báo giá");
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};
const acceptOffer = async (note: string, offerId: string) => {
	return await api
		.post(`/order/acceptOffer/${offerId}`, {
			note,
		})
		.then(() => {
			toast.success("Đã chấp nhận báo giá");
		})
		.catch((err) => {
			toast.error(err?.response?.data?.message);
		});
};
const OfferJob = {
	offer,
	acceptOffer,
	useOfferList,
};
export default OfferJob;
