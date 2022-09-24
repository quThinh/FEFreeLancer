import api from "api";
import TJob from "interfaces/EJob";
import TSkill from "interfaces/ESkill";
import queryString from "query-string";
import {toast} from "react-toastify";
import useSWR from "swr";
import convertToHTMLDate from "../utils/convertToHTMLDate";

function useItemPublicJob(id: string | undefined) {
	const { data, error } = useSWR<TJob>(
		id ? `/jobs/others/detail/${id}` : null
	);
	return {
		job: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export interface IGetUserJobList {
	page: number;
	limit: number;
	status: string;
	sort: string;
}

export interface IGetPublicJobList {
	category?: string;
	page: number;
	required_level?: string;
	limit: number;
	status?: number;
	address?: string;
	user_id?: string;
	name?: string;
	providing_method?: string;
	fee_range?: string;
	sort?: string;
	select?: string;
}

function usePublicJobs(params: IGetPublicJobList | null) {
	const { data, error } = useSWR<{
		data: TJob[];
		paginationInfo: { page: number; total: number };
	}>(params ? `/jobs?${queryString.stringify(params, {
		skipEmptyString: true,
		skipNull: true,
	})}` : null);
	return {
		jobs: data?.data,
		isLoading: !error && !data,
		pagination: data?.paginationInfo,
		isError: error,
	};
}

function useItemUserJob(id: string | null): {
	job?: TJob;
	isLoading: boolean;
	isError: boolean;
} {
	const { data, error } = useSWR<TJob>(
		id ? `/jobs/myJob/detail/${id}` : null
	);
	return {
		job: data
			? {
					...data,
					expiration_time: convertToHTMLDate(data?.expiration_time),
			  }
			: undefined,
		isLoading: !error && !data,
		isError: error,
	};
}

function useUserJobs(params: IGetUserJobList | null) {
	const { data, error } = useSWR<{
		data: TJob[];
		paginationInfo: { page: number; total: number };
	}>(params ? `/jobs/myJob?${queryString.stringify(params)}` : null);
	return {
		jobs: data?.data,
		isLoading: !error && !data,
		pagination: data?.paginationInfo,
		isError: error,
	};
}

export interface IUpdateRequest {
	id: string;
	name: string;
	category?: string[];
	skill?: TSkill[];
	description?: string;
	providing_method: string[];
	finish_estimated_time: number;
	lower_bound_fee: number;
	upper_bound_fee: number;
	image: string[];
	payment_method: string;
	required_level: string[] | undefined;
	expiration_time: string;
}

const updateJob = async ({ id, ...request }: IUpdateRequest) => {
	try {
		await api.put(`/jobs/${id}`, request);
		toast.success("Cập nhật thành công");
	} catch (e) {
		toast.error("Cập nhật thất bại");
	}
};

export interface ICreateJob {
	name: string;
	category?: string[];
	skill?: TSkill[];
	description?: string;
	providing_method: string[];
	finish_estimated_time: number;
	lower_bound_fee: number;
	upper_bound_fee: number;
	image: string[];
	payment_method: string;
	required_level: string[] | undefined;
	expiration_time: string;
}

const createJob = async (data: ICreateJob) => {
	return await api
		.post("/jobs", data)
		.then(() => {
			toast.success("Đăng tuyển thành công");
		})
		.catch((error) => {
			toast.error(`Đăng tuyển thất bại: ${error?.response?.data?.message}`);
		});
};

const deleteJob = async (request_id: string) => {
	return await api
		.delete(`/jobs/${request_id}`)
		.then(() => {
			toast.success("Xóa thành công");
		})
		.catch((error) => {
			toast.error(`Xóa thất bại: ${error?.response?.data?.message}`);
		});
};

const jobProductApi = {
	useItemPublicJob,
	usePublicJobs,
	useItemUserJob,
	useUserJobs,
	updateJob,
	createJob,
	deleteJob,
};

export default jobProductApi;
