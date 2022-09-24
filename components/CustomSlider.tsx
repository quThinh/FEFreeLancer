import { ReactElement } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Slider, { Settings } from "react-slick";

function PrevArrow({ onClick }: any) {
	return (
		<div
			onClick={onClick}
			role="button"
			className="z-10 top-1/2 rounded-[50%] absolute w-10 h-10 bg-white -left-0 -translate-x-[50%] -translate-y-5 shadow-md opacity-80 hover:opacity-100">
			<FaAngleLeft className="w-6 h-6 mx-auto translate-y-2" />
		</div>
	);
}
function NextArrow({ onClick }: any) {
	return (
		<div
			onClick={onClick}
			role="button"
			className="w-10 z-10 top-1/2 -translate-y-1/2 rounded-[50%] absolute h-10 bg-white -right-0 shadow-md opacity-80 hover:opacity-100 translate-x-[50%]">
			<FaAngleRight className="w-6 h-6 mx-auto translate-y-2" />
		</div>
	);
}

export default function CustomSlider({
	children,
	settings,
}: {
	children: ReactElement | ReactElement[];
	settings: Settings;
}) {
	return (
		<Slider
			{...settings}
			prevArrow={<PrevArrow />}
			nextArrow={<NextArrow />}>
			{children}
		</Slider>
	);
}
