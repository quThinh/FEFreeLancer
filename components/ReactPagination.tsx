import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Pagination from "react-paginate";
interface ReactPaginationInterface {
	pageCount: number;
	initialPage: number;
	onPageChange: (page: number) => void;
}
export default function ReactPagination({
	pageCount,
	initialPage = 0,
	onPageChange,
}: ReactPaginationInterface) {
	return (
		<Pagination
			forcePage={initialPage}
			pageCount={pageCount}
			renderOnZeroPageCount={() => null}
			pageLinkClassName="inline-block px-3.5 py-2 w-10 text-center cursor-pointer body-5-semibold"
			pageRangeDisplayed={5}
			onPageChange={(data) => {
				onPageChange(data.selected + 1);
			}}
			containerClassName={
				"rounded-md flex flex-wrap items-center justify-center"
			}
			activeClassName={"text-white bg-brand-primary font-semibold"}
			nextLabel={
				<div className="p-3 ml-3 gap-3 flex items-center text-sm font-normal text-neutral-100 leading-8">
					<span>Tiếp theo</span>
					<HiOutlineChevronRight className="text-xl" />
				</div>
			}
			previousLabel={
				<div className="p-3 mr-3 flex items-center gap-3 text-sm font-normal text-neutral-100 leading-8">
					<HiOutlineChevronLeft className="text-xl" />
					<span>Trước</span>
				</div>
			}
		/>
	);
}
