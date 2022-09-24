export default interface List<T> {
	data: T[];
	paginationInfo: {
		page: number;
		total: number;
		limit: number;
	};
}
