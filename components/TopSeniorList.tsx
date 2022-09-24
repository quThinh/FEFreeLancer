import TClient from "interfaces/EClient";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa";
import CustomSlider from "./CustomSlider";
import ItemTopSenior from "./ItemTopSenior";

interface TopSeniorListProps {
	seniors: TClient[];
}

export default function TopSeniorList(props: TopSeniorListProps) {
	return (
		<div>
			<div className="font-[600] text-2xl mb-8 flex flex-col md:flex-row items-center">
				<span className="truncate">Tiền bối nổi bật</span>
				<span className="md:ml-auto text-brand-primary text-base font-semibold">
					<Link href="/seniors">
						<a>Xem thêm tiền bồi</a>
					</Link>
					<FaAngleRight className="inline-block ml-2" />
				</span>
			</div>
			<CustomSlider
				settings={{
					className: "custom-slider",
					accessibility: true,
					slidesToShow: 5,
					infinite: false,
					rows: 1,
					responsive: [
						{
							breakpoint: 1920,
							settings: {
								slidesToShow: 5,
							},
						},
						{
							breakpoint: 1280,
							settings: {
								slidesToShow: 4,
							},
						},
						{
							breakpoint: 1024,
							settings: {
								slidesToShow: 3,
							},
						},
						{
							breakpoint: 600,
							settings: {
								slidesToShow: 2,
							},
						},
						{
							breakpoint: 320,
							settings: {
								slidesToShow: 1,
							},
						},
					],
				}}>
				{props.seniors.map((item, index) => {
					return (
						<ItemTopSenior
							index={index + 1}
							key={index}
							name={item.fullname}
							id={item._id}
							numOfServices={0}
						/>
					);
				})}
			</CustomSlider>
		</div>
	);
}
