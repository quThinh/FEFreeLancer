import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
	initialPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {
	const [page, setPage] = React.useState(props.initialPage - 1);
	return (
		<ul className="min-w-[866px] h-[72px] rounded-md flex items-center justify-center">
			<li
				className="p-3 mr-3 flex items-center text-sm font-normal text-neutral-100 leading-8"
				role="button"
				onClick={() => setPage(page - 1)}>
				<HiOutlineChevronLeft className="text-xl mr-1" />
				<span>Đầu tiên</span>
			</li>
			{props.totalPages + page > 5
				? [0, 1, 2, 3, 4].map((item, index) => (
						<PaginationItem
							key={index}
							isActive={page === index}
							content={item + Math.floor(page / 5) + 1}
							id={index}
							setPage={setPage}
						/>
				  ))
				: [0, 1, 2, 3, 4].slice(0, props.totalPages).map((item, index) => (
						<PaginationItem
							key={index}
							isActive={page === index}
							content={item + page + 1}
							id={index}
							setPage={setPage}
						/>
				  ))}
			<li
				className="p-3 ml-3 flex items-center text-sm font-normal text-neutral-100 leading-8"
				role="button"
				onClick={() => {
					setPage(page + 1);
					props.onPageChange(page + 1);
				}}>
				<span>Tiếp theo</span>
				<HiOutlineChevronRight className="text-xl mr-1" />
			</li>
		</ul>
	);
}

export default Pagination;
