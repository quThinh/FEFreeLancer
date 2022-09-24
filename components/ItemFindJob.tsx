import TJob from "interfaces/EJob";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BadgeReputation from "./BadgeReputation";
import BadgeVerify from "./BadgeVerify";
import PriceTag from "./PriceTag";

interface IItemFindJob {
	job: TJob;
}

function ItemFindJob(props: IItemFindJob) {
	const route = useRouter();
	const [isShow, setIsShow] = useState(false);
	function handleShow() {
		setIsShow(!isShow);
	}
	return (
		<div className="border p-6 w-[100%] bg-white">
			<div className="w-[100%] flex lg:items-center lg:flex-row flex-col gap-3 mb-2 items-start">
				<span className="font-[400] text-base text-brand-primary">
					{props?.job.name}
				</span>
				<span className="bg-status-green text-white text-[10px] font-[600] lg:ml-2 px-0.5">
					BÁN THỜI GIAN
				</span>
				<span className="lg:ml-auto text-base text-neutral-100 font-[700]">
					<PriceTag
						price={`${props?.job.lower_bound_fee} - ${props?.job.upper_bound_fee}`}
					/>
				</span>
			</div>
			<div className="bg-grey-light gap-3 lg:gap-0 flex-col lg:flex-row py-3 flex lg:items-center mb-2">
				<div className="h-[38px] flex mr-3">
					<div className="mr-2">
						<Image
							src="/icons/default-avatar.svg"
							alt="media"
							className="rounded-[50%]"
							width={36}
							height={36}
						/>
					</div>
					<div className="flex items-start flex-col">
						<p className="text-neutral-80 font-[400] m-0">
							{props?.job?.user_id?.fullname}
						</p>
						<div className="text-center p-0.5 text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
							TOP RATE
						</div>
					</div>
				</div>
				<span className="px-3 border-r border-l font-[500] text-[14]">
					Toàn quốc
				</span>
				<span className="ml-3">Hạn nhận hồ sơ: 22/05/2022</span>
			</div>
			<div className="flex lg:items-center lg:justify-between lg:flex-row flex-col gap-3">
				<div className="pr-3 lg:w-2/3 w-full">
					<div>
						<span>
							{isShow ? (
								<p>
									Xem sản phẩm, sử dụng sản phẩm, đánh giá xem
									điểm mạnh và điểm yếu, xem mọi thứ trong yêu
									cầu của cá nhân ....
								</p>
							) : (
								<p>
									Xem sản phẩm, sử dụng sản phẩm, đánh giá xem
									điểm mạnh và điểm yếu
								</p>
							)}
						</span>
						<span className="text-base underline text-status-blue ml-3">
							<button onClick={handleShow}>
								{isShow ? "Thu gọn" : "Xem thêm  "}
							</button>
						</span>
					</div>
					<div className="mt-2">
						<BadgeVerify />
						<BadgeReputation />
					</div>
				</div>
				<Link href={`/job/${props.job._id}`}>
					<a className="btn btn-md btn-primary">Gửi báo giá</a>
				</Link>
			</div>
		</div>
	);
}
export default ItemFindJob;
