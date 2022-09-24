import queryString from "query-string";
import TInternalTransaction from "interfaces/EInternalTrans";
import useSWR from "swr";
import TExternalTransaction from "interfaces/EExternalTrans";
import TTransaction from "interfaces/ETransaction";

interface IGetInternalTransaction {
	page: number;
	limit: number;
	select?: string;
}
const useInternalTransaction = (params: IGetInternalTransaction) => {
	const { data, error } = useSWR<{
		data: TInternalTransaction[];
		paginationInfo: { page: number; total: number };
	}>(`/internal-transactions?${queryString.stringify(params)}`);
	return {
		transactions: data?.data,
		pagination: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
};

const useExternalTransaction = (params: IGetInternalTransaction) => {
	const { data, error } = useSWR<TExternalTransaction[]>(`/transaction/external?${queryString.stringify(params)}`);
	return {
		transactions: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const useGetAllTransaction = (params: IGetInternalTransaction) => {
	const { data, error } = useSWR<{
		data: TTransaction[];
		paginationInfo: { page: number; total: number };
	}>(`/transaction?${queryString.stringify(params)}`);
	return {
		transactions: data?.data,
		pagination: data?.paginationInfo,
		isLoading: !error && !data,
		isError: error,
	};
};

const useItemTransaction = (transactionId: string) => {
	const { data, error } = useSWR<TTransaction>(
		`/transactions/${transactionId}`
	);
	return {
		transaction: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const useTransactionByOrderId = (orderId: string) => {
	const { data, error } = useSWR<TTransaction>(
		`/transactions/order/${orderId}`
	);
	return {
		transaction: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const transactionApi = {
	useInternalTransaction,
	useExternalTransaction,
	useGetAllTransaction,
	useItemTransaction,
	useTransactionByOrderId,
};

export default transactionApi;
