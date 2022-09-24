import TClient from "interfaces/EClient";
import queryString from "query-string";
import useSWR from "swr";

function useItemClient(id?: string) {
	const { data, error } = useSWR<TClient>(id ? `/clients/${id}` : null);
	return {
		client: data,
		isLoading: !error && !data,
		isError: error,
	};
}

export interface IGetClientList {
	page: number;
	limit: number;
	name?: string;
	category?: string;
	address?: string;
	select?: string;
}

function useClientList(params: IGetClientList | null) {
	const { data, error } = useSWR<{
		data: TClient[];
		paginationInfo: { page: number; total: number };
	}>(params ? `/clients?${queryString.stringify(params)}` : null);
	return {
		clients: data?.data,
		isLoading: !error && !data,
		pagination: data?.paginationInfo,
		isError: error,
	};
}

const clientApi = {
	useItemClient,
	useClientList,
};

export default clientApi;
