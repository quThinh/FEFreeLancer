import api from "api";
import TService from "interfaces/EService";
import TSkill from "interfaces/ESkill";
import queryString from "query-string";
import { toast } from "react-toastify";
import useSWR from "swr";
import convertToHTMLDate from "../utils/convertToHTMLDate";
import i18next from "utils/i18n";

function useItemPublicService(id: string | null) {
	const { data, error } = useSWR<TService>(
		id ? `/services/others/detail/${id}` : null
	);
	return {
		service: data
			? {
					...data,
					rate: data.rate ? Number(data.rate.toFixed(1)) : 0,
					expiration_time: convertToHTMLDate(data?.expiration_time),
			  }
			: undefined,
		isLoading: !error && !data,
		isError: error,
	};
}

export interface IGetPublicServiceList {
	category?: string;
	page: number;
	limit: number;
	address?: string;
	user_id?: string;
	providing_method?: string;
	fee_range?: string;
	sort?: string;
	name?: string;
	select?: string;
}

function usePublicServices(params: IGetPublicServiceList | null) {
	const { data, error } = useSWR<{
		data: TService[];
		paginationInfo: { page: number; total: number };
	}>(
		params
			? `/services?${queryString.stringify(params, {
					skipEmptyString: true,
			  })}`
			: null
	);
	return {
		services: data?.data,
		isLoading: !error && !data,
		pagination: data?.paginationInfo,
		isError: error,
	};
}

function useItemUserService(id: string | null) {
	const { data, error } = useSWR<TService>(
		id ? `/services/myService/detail/${id}` : null
	);
	return {
		service: {
			...data,
			expiration_time: convertToHTMLDate(data?.expiration_time),
			providing_method: data?.providing_method
				? data?.providing_method.map((item) =>
						item === "remote" ? "online" : item
				  )
				: [],
		},
		isLoading: !error && !data,
		isError: error,
	};
}

function useUserServices(params: IGetPublicServiceList) {
	const { data, error } = useSWR<{
		data: TService[];
		paginationInfo: { page: number; total: number };
	}>(`/services/myService?${queryString.stringify(params)}`);
	return {
		userService: data?.data,
		paginationInfo: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
}

type IUpdateService = {
	id: string;
	name: string;
	category?: string[];
	skill?: TSkill[];
	description: string;
	providing_method: string[];
	finish_estimated_time: number;
	lower_bound_fee: number;
	upper_bound_fee: number;
	image: string[];
	expiration_time: string;
};

const updateService = async ({ id, ...service }: IUpdateService) => {
	try {
		await api.put(`/services/${id}`, service);
		toast.success("B???n ???? c???p nh???t d???ch v??? th??nh c??ng");
	} catch (e) {
		toast.error("C???p nh???t d???ch v??? th???t b???i");
	}
};

export interface ICreateService {
	name: string;
	category?: string[];
	skill?: TSkill[];
	description: string;
	providing_method: string[];
	finish_estimated_time: number;
	lower_bound_fee: number;
	upper_bound_fee: number;
	image: string[];
	expiration_time: string;
}

const createService = async (
	data: ICreateService,
	onSuccess?: () => void,
	onFailed?: () => void
) => {
	return await api
		.post("/services", data)
		.then(() => {
			if (onSuccess) onSuccess();
			toast.success("B???n ???? t???o d???ch v??? th??nh c??ng");
		})
		.catch((error) => {
			if (onFailed) onFailed();
			toast.error(
				"T???o d???ch v??? th???t b???i: " +
					i18next.t(error?.response?.data?.message)
			);
		});
};

const updateServiceStatus = async (service_id: string) => {
	return await api
		.patch(`/services/toggle/${service_id}`, {
			service_id,
		})
		.then(() => {
			toast.success("B???n ???? c???p nh???t tr???ng th??i d???ch v??? th??nh c??ng");
		})
		.catch((error: unknown) => {
			toast.error("C???p nh???t tr???ng th??i d???ch v??? th???t b???i");
		});
};

const deleteService = async (service_id: string) => {
	return await api
		.delete(`/services/${service_id}`)
		.then(() => {
			toast.success("B???n ???? x??a d???ch v??? th??nh c??ng");
		})
		.catch((error: unknown) => {
			toast.error("X??a d???ch v??? th???t b???i");
		});
};

const serviceProductApi = {
	useItemPublicService,
	usePublicServices,
	useItemUserService,
	useUserServices,
	updateService,
	createService,
	updateServiceStatus,
	deleteService,
};

export default serviceProductApi;
