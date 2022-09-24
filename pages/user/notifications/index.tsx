import UserLayout from "@/layouts/UserLayout";
import { ReactElement } from "react";
import { FaAngleDown, FaComment } from "react-icons/fa";
import Image from "next/image";
import { HiThumbUp } from "react-icons/hi";
import { MdAssessment, MdPayment } from "react-icons/md";
import Head from "next/head";

const solutions = [
	{
		name: "Insights",
		description: "Measure actions your users take",
		href: "##",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		type: "comment",
		time: "2 days ago",
		seen: false,
	},
	{
		name: "Automations",
		description: "Create your own targeted content",
		href: "##",
		image: "/icons/default-avatar.svg",
		user_name: "John Doe",
		type: "like",
		time: "2 days ago",
		seen: false,
	},
	{
		name: "Reports",
		description: "Keep track of your growth",
		href: "##",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		time: "2 days ago",
		type: "payment",
		seen: true,
	},
	{
		name: "Reports",
		description: "Keep track of your growth",
		href: "##",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		time: "2 days ago",
		type: "rating",
		seen: true,
	},
];

export default function Notifications() {
	return (
		<div className="sm:p-8 mt-8 sm:mt-[unset] bg-white min-h-full">
			<Head>
				<title>Thông báo</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="flex items-center flex-wrap sm:flex-nowrap w-full justify-between">
				<div>
					<p className="text-2xl font-semibold text-neutral-100 mb-2">
						{"Danh sách thông báo"}
					</p>
					<p className="text-base font-normal text-neutral-100">
						Tìm thấy{" "}
						<span className="font-semibold text-brand-primary">
							499 kết quả
						</span>{" "}
						phù hợp với yêu cầu của bạn.
					</p>
				</div>
				<div className="mt-2 sm:mt-[unset]">
					<p className="text-base text-neutral-60 flex items-center">
						<span className="mr-3">Xếp theo: </span>
						<span className="text-neutral-100 cursor-pointer inline-flex items-center">
							Mới cập nhật <FaAngleDown className="ml-3" />
						</span>
					</p>
				</div>
			</div>
			<div>
				{solutions.map((item) => (
					<a
						key={item.name}
						href={item.href}
						className="my-6 sm:my-3 flex bg-grey-light items-center rounded-lg sm:p-4 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
						<div className="relative flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
							<Image
								src={item.image}
								width={48}
								height={48}
								className="rounded-full"
								alt="avatar"
							/>
							<div className="absolute border-white border-2 rounded-full translate-x-1 translate-y-1 z-10 w-6 h-6 overflow-hidden bottom-0 right-0">
								{item.type === "comment" && (
									<FaComment className="h-full w-full bg-status-blue p-1" />
								)}

								{item.type === "like" && (
									<HiThumbUp className="h-full w-full bg-status-red p-1" />
								)}
								{item.type === "payment" && (
									<MdPayment className="h-full w-full bg-status-green p-1" />
								)}
								{item.type === "rating" && (
									<MdAssessment className="h-full w-full bg-status-yellow p-1" />
								)}
							</div>
						</div>
						<div className="ml-4">
							<p className="body-4-semibold text-neutral-100 mb-2">
								{item.name}
								<span className="text-sm text-neutral-40 font-normal ml-2">
									@{item.user_name}
								</span>
							</p>
							<p className="text-sm font-semibold text-neutral-100">
								{item.type === "like" && (
									<span className="font-normal">Thích </span>
								)}
								{item.type === "comment" && (
									<span className="font-normal">
										{" "}
										Bình luận{" "}
									</span>
								)}
								{item.type === "rating" && (
									<span className="font-normal">
										{" "}
										Đánh giá{" "}
									</span>
								)}
								{item.type === "payment" && (
									<span className="font-normal">
										Thanh toán{" "}
									</span>
								)}
								{item.description}
							</p>
						</div>
						<div className="text-sm ml-auto flex items-center gap-2 text-neutral-40">
							<span>{item.time}</span>
							{!item.seen && (
								<span className="text-2xl text-status-blue">
									&bull;
								</span>
							)}
						</div>
					</a>
				))}
			</div>
		</div>
	);
}
Notifications.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
