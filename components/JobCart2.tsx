import orderApi from "@/api/orderApi";
import userApi from "@/api/userApi";
import AuthUtils from "@/utils/authUtils";
import TJob from "interfaces/EJob";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import { HiClipboardCopy, HiOutlineShare } from "react-icons/hi";
import Button from "./Button";
import Tag from "./Tag";

export default function JobCart(props: { job?: TJob; id: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = userApi.useUser();
	const router = useRouter();
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	return (
		<>
			<div className="border">
				<div className="bg-grey p-4">Chi tiết nhà tuyển dụng</div>
				<div className="p-4">
					<div>
						<div className="h-[38px] w-[100%] flex">
							<div className="mr-2 w-[36px] h-[36px] ">
								<Image
									src={"/work.jpg"}
									alt="media"
									className="rounded-[50%] w-full h-full"
									width={"36px"}
									height={"36px"}
								/>
							</div>
							<div>
								<p className="text-neutral-80 font-[400] m-0">
									{props?.job?.user_id?.fullname ||
										"Nhà tuyển dụng"}
								</p>
								<span className="p-1 text-center text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
									TOP RATE
								</span>
							</div>
						</div>
					</div>
					<div className="mt-3">
						<div className="divide-x flex items-center text-sm font-medium">
							<span className="pr-3 text-base inline-flex items-center font-semibold">
								<FaStar className="text-red mr-2" />
								{props?.job?.user_id?.rate_star || 0}
							</span>
							<span className="px-3">
								{props?.job?.user_id?.rate_number || 0} Đánh giá
								&bull; {props?.job?.user_id?.sold_time || 0}{" "}
								lượt mua
							</span>
						</div>
					</div>
				</div>
				<div className="p-4 grid cursor-pointer grid-cols-2 gap-2 border-b">
					<div>ID dự án</div>
					<div
						className={`flex items-center px-1 gap-2 underline decoration-dashed ${
							copied ? "text-status-green" : "text-neutral-80"
						}`}
						onClick={() => {
							navigator.clipboard.writeText(props.id);
							setCopied(true);
						}}>
						<div className="inline-block">
							<div className="line-clamp-1">
								{copied ? "Đã sao chép" : "Sao chép"}
							</div>{" "}
						</div>
						<HiClipboardCopy />
					</div>
					<div>Ngày đăng</div>
					<div>
						{new Date(props.job?.create_time || "").toLocaleString(
							"vi"
						)}
					</div>
					<div>Ngày hết hạn</div>
					<div>
						{new Date(
							new Date(props.job?.create_time || "").getTime() +
								(props?.job?.finish_estimated_time || 0) *
									60 *
									1000
						).toLocaleString("vi")}
					</div>
					<div>Địa điểm</div>
					<div>{props.job?.user_id?.address || "Chưa xác định"}</div>
					<div>Ngân sách</div>
					<div className="flex gap-1 items-end text-base font-semibold text-status-yellow">
						<span>
							{props?.job?.lower_bound_fee} -{" "}
							{props?.job?.upper_bound_fee}
						</span>
						<Image
							src="/icons/B.svg"
							width={20}
							height={20}
							alt="bi-icon"
						/>
					</div>
					<div>Hình thức làm việc</div>
					<div className="flex gap-2 flex-wrap">
						{props.job?.providing_method.map((item, index) => (
							<Tag size="xs" color="green" key={index}>
								{t(item)}
							</Tag>
						))}
					</div>
				</div>
				<div className="px-16 py-4">
					<Button
						md
						block
						disabled={props.job?.status === 3}
						primary={props.job?.status !== 3}
						secondary={props.job?.status === 3}
						onClick={() => orderApi.completeOrder(props.job?._id)}>
						Hoàn thành
					</Button>
					<Button className="mt-2" md block secondary>
						<HiOutlineShare /> Chia sẻ
					</Button>
					<div className="text-xs text-neutral-80 text-center">
						24h Hoàn tiền khi dịch vụ gặp vấn đề
					</div>
				</div>
			</div>
		</>
	);
}
