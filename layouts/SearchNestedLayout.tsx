import ReactPagination from "@/components/ReactPagination";
import { ReactElement, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import Filter from "../components/Filter";

export default function SearchNestedLayout({
	children,
	title,
	entity,
}: {
	children: ReactElement;
	title?: string;
	entity?: "service" | "request" | "senior";
}) {
	const [filter, setFilter] = useState<{
		category: string;
		page: number;
		limit: number;
	}>({ category: "", page: 1, limit: 10 });
	return (
		<div className="container py-4">
			<div className="flex">
				<div>
					<Filter
						setFilter={(values) =>
							setFilter({
								...filter,
							})
						}
					/>
				</div>
				<div className="grow">
					<div className="flex items-center w-full justify-between">
						<div>
							<p className="text-2xl font-semibold text-neutral-100">
								{title || "Tìm kiếm"}
							</p>
							<p className="text-base font-normal text-neutral-100">
								Tìm thấy{" "}
								<span className="font-semibold text-brand-primary">
									499 kết quả
								</span>{" "}
								phù hợp với yêu cầu của bạn.
							</p>
						</div>
						<div>
							<p className="text-base text-neutral-60 flex items-center">
								<span className="mr-3">Xếp theo: </span>
								<span className="text-neutral-100 cursor-pointer inline-flex items-center">
									Mới cập nhật{" "}
									<FaAngleDown className="ml-3" />
								</span>
							</p>
						</div>
					</div>
					<div className="mt-8">{children}</div>
					<div className="mt-8">
						<ReactPagination
							pageCount={6}
							initialPage={1}
							onPageChange={(page) => {
								console.log(page);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
