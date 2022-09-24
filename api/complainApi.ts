import TOrderComplain from "interfaces/EOrderComplain";
import useSWR from "swr";
import queryString from 'query-string';

export interface GetComplainList {
	page: number;
	limit: number;
	select?: string;
	status?: string;
}

const useComplainList = (params: GetComplainList) => {
	const { data, error } = useSWR<{
		data: TOrderComplain[];
		paginationInfo: { page: number; total: number };
	}>("/orderComplain/my?" + queryString.stringify(params, {
		skipEmptyString: true,
		skipNull: true,
	}));
	return {
		complains: data?.data,
		pagination: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
};

const complainApi = {
	useComplainList,
};

export default complainApi;
