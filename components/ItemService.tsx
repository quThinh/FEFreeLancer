import { FaDotCircle } from "react-icons/fa";
import { HiStar } from "react-icons/hi";
import Bicon from "../public/icons/B.svg";
import Image from "next/image";
import work from "../public/work.jpg";
import { useRouter } from "next/router";
import convertNumberToAppreviation from "utils/convertNumberToAppre";
import TService from "interfaces/EService";
import { useState } from "react";
import slug from "slug";

interface IItemServiceProp {
	className?: string;
	service?: TService;
}
function ItemService(props: IItemServiceProp) {
	const route = useRouter();
	const [imageError, setImageError] = useState(false);
	return (
		<div
			className="shadow-lg cursor-pointer"
			onClick={() =>
				route.push(
					`/service/${
						props?.service?.slug || slug(props?.service?.name || "")
					}.${props?.service?._id}`
				)
			}>
			<div className="h-[230px] overflow-hidden">
				<Image
					loading="lazy"
					decoding="async"
					src={
						!imageError &&
						props?.service?.image &&
						props?.service?.image.length > 0
							? props.service?.image[0]
							: "/images/placeholder.webp"
					}
					alt="service"
					width={"100%"}
					objectFit="cover"
					height={"100%"}
					onError={() => setImageError(true)}
					layout="responsive"
				/>
			</div>
			<div className="bg-white w-[100%] h-[156px] p-[16px] flex flex-col gap-[8px]">
				<div className="h-[38px] w-[100%] flex">
					<div className="mr-2 w-9 h-9 ">
						<Image
							src={work}
							alt="media"
							className="rounded-[50%] w-full h-full"
							width={"36px"}
							height={"36px"}
						/>
					</div>
					<div className="flex flex-col items-start">
						<p className="text-neutral-80 font-[400] m-0">
							{props?.service?.user_id?.fullname ||
								"Tên tiền bối"}
						</p>
						<div className="text-center px-1 shrink text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
							TOP RATE
						</div>
					</div>
				</div>
				<p className="text-left text-[15px] font-normal text-neutral-100 line-clamp-2">
					{props?.service?.name || "Tên dịch vụ"}
				</p>
				<div className="flex items-center gap-[8px] mt-auto">
					<HiStar className="w-[24px] text-status-yellow h-[24px] inline-block"></HiStar>
					<span className="text-base text-neutral-100">
						{props?.service?.rate
							? props.service.rate.toFixed(1)
							: 0}
					</span>
					<span className="text-neutral-60 text-[14px]">
						<FaDotCircle className="inline-block" />{" "}
						{props?.service?.sold_time} lượt mua
					</span>
					<div className="ml-auto flex items-center text-status-yellow text-[14px] font-[600]">
						<span className="mr-1">
							{convertNumberToAppreviation(
								props?.service?.lower_bound_fee
							)}
							-
							{convertNumberToAppreviation(
								props?.service?.upper_bound_fee
							)}
						</span>
						<Image src={Bicon} alt="B" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default ItemService;
