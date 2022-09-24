import TCategory from "interfaces/ECategory";
import useSWR from "swr";

function useCategory() {
	return useSWR<TCategory[]>(`/categories?with-number-of-services=true`);
}

const categoryApi = {
	useCategory,
};

export default categoryApi;
