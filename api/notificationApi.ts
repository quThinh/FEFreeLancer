import useSWR from "swr";

export interface TNotification {
	notification: string;
}

function useNotification() {
	return useSWR<TNotification[]>("/notification");
}
const notificationApi = {
	useNotification,
};
export default notificationApi;
