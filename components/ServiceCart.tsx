import userApi from "@/api/userApi";
import AuthUtils from "@/utils/authUtils";
import TService from "interfaces/EService";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { HiOutlineBookmark, HiOutlineCheckCircle } from "react-icons/hi";
import Button from "../components/Button";
import BookServiceDialog from "./BookServiceDialog";

export default function ServiceCart(props: { service?: TService }) {
	const { user } = userApi.useUser();
	const router = useRouter();
	const { t } = useTranslation();
	const features = [
		`Thời gian dự kiến hoàn thành: ${props?.service?.finish_estimated_time} ngày`,
		`Phương thức : ${props?.service?.providing_method
			.map((item) => t(item))
			.join(", ")}`,
	];
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className="w-full bg-white ring-2 ring-grey shadow-md">
				<div className="border-b h-[70px] flex items-center justify-center">
					<div className="flex items-center gap-2 text-2xl font-semibold text-status-yellow">
						<Image
							src="/icons/B.svg"
							width={20}
							height={20}
							alt="Bicoin-icon"
						/>
						{props.service?.lower_bound_fee} -{" "}
						{props.service?.upper_bound_fee}
					</div>
				</div>
				<div className="p-8">
					<ul className="list-none flex flex-col gap-2">
						{features.map((feature, index) => (
							<li
								key={index}
								className="flex items-center gap-3 text-neutral-80 text-base font-normal">
								<HiOutlineCheckCircle className="text-brand-primary" />
								{feature}
							</li>
						))}
					</ul>
					<div className="mt-6">
						{!AuthUtils.isLoggedIn() ||
						user?._id !== props.service?.user_id?._id ? (
							<Button
								block
								md
								primary
								onClick={() => setIsOpen(true)}>
								Đăng kí tư vấn
							</Button>
						) : (
							<Button
								block
								md
								secondary
								onClick={() =>
									router.push(
										`/user/services/edit?id=${props?.service?._id}`
									)
								}>
								Chỉnh sửa dịch vụ
							</Button>
						)}
						<div className="flex mt-2 gap-2">
							<Button
								className="flex-1 text-base px-3 py-2 font-semibold"
								plain>
								<HiOutlineBookmark /> Lưu tư vấn sau
							</Button>
							<Button
								plain
								className="bg-grey px-3 py-2 text-base font-semibold flex-1">
								Gửi tin nhắn
							</Button>
						</div>
						<div className="text-center text-sm font-semibold text-neutral-100 px-3 mt-2">
							NIUBI HOÀN 100 TIỀN NẾU KHÔNG HÀI LÒNG VỚI DỊCH VỤ
							SAU 24H
						</div>
					</div>
				</div>
			</div>
			<BookServiceDialog
				service={props.service}
				onClose={() => setIsOpen(false)}
				isOpen={isOpen}
			/>
		</>
	);
}
