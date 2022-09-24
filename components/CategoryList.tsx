import TCategory from "interfaces/ECategory";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import ItemCategory from "../components/ItemCategory";

interface CategoryListProps {
	all?: boolean;
	categories?: TCategory[];
}

export default function CategoryList({
	all,
	categories = [],
}: CategoryListProps) {
	return (
		<div className="py-8 bg-grey">
			<div className="container">
				<div className="flex md:flex-row flex-col items-center">
					<p className="text-2xl font-semibold text-neutral-100">
						Danh mục dịch vụ
					</p>
					{!all && (
						<span className="md:ml-auto text-brand-primary text-base font-semibold">
							<Link href="/categories">
								<a>Xem thêm</a>
							</Link>
							<FaAngleRight className="inline-block ml-2" />
						</span>
					)}
				</div>
				<div className="grid 2xl:grid-cols-6 xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
					{categories.map((item, index) => {
						return (
							<ItemCategory
								key={index}
								category={item}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}
