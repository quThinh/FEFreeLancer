import TService from "interfaces/EService";
import Link from "next/link";
import {FaAngleRight} from "react-icons/fa";
import CustomSlider from "./CustomSlider";
import ItemService from "./ItemService";

interface IServiceListProps {
	title?: string;
	services: TService[];
}

function ServiceList(props: IServiceListProps) {
	return (
		<div className="w-full py-9">
			<div className="font-[600] text-2xl mb-8 flex flex-col md:flex-row items-center">
				<span className="text-center">{props.title}</span>
				<span className="md:ml-auto text-brand-primary text-base font-semibold">
					<Link href="/services">
						<a>Xem thêm dịch vụ</a>
					</Link>
					<FaAngleRight className="inline-block ml-2" />
				</span>
			</div>
			<div className="slider-wrapper">
				<CustomSlider
					settings={{
						className: "custom-slider",
						accessibility: true,
						slidesToShow: 4,
						infinite: false,
						rows: 1,
						responsive: [
							{
								breakpoint: 1920,
								settings: {
									slidesToShow: 4,
								},
							},
							{
								breakpoint: 1280,
								settings: {
									slidesToShow: 3,
								},
							},
							{
								breakpoint: 1024,
								settings: {
									slidesToShow: 2,
								},
							},
							{
								breakpoint: 600,
								settings: {
									slidesToShow: 1,
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
					{props.services.map((service, index) => (
						<ItemService key={index} service={service} />
					))}
				</CustomSlider>
			</div>
		</div>
	);
}
export default ServiceList;
