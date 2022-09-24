import TNews from "interfaces/ENews";
import queryString from "query-string";
import useSWR from "swr";

export interface IGetNewsList {
	page: number;
	limit: number;
	category?: string;
}

function useNews(params: IGetNewsList | null) {
	const { data, error } = useSWR<{
		data: TNews[];
		paginationInfo: { page: number; total: number };
	}>(params ? `/news/public?${queryString.stringify(params)}` : null);
	return {
		news: data?.data,
		isLoading: !error && !data,
		pagination: data?.paginationInfo,
		isError: error,
	};
}

const newsApi = {
	useNews,
};

export default newsApi;
