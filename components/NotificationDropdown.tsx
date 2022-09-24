import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";
import { FaComments } from "react-icons/fa";
import { HiOutlineBell, HiThumbUp } from "react-icons/hi";
import { MdAssessment, MdPayment } from "react-icons/md";
import Link from "next/link";

const solutions = [
	{
		name: "Insights",
		description: "Measure actions your users take",
		href: "/user/notifications",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		type: "comment",
		time: "2 days ago",
		seen: false,
	},
	{
		name: "Automations",
		description: "Create your own targeted content",
		href: "/user/notifications",
		image: "/icons/default-avatar.svg",
		user_name: "John Doe",
		type: "like",
		time: "2 days ago",
		seen: false,
	},
	{
		name: "Reports",
		description: "Keep track of your growth",
		href: "/user/notifications",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		time: "2 days ago",
		type: "payment",
		seen: true,
	},
	{
		name: "Reports",
		description: "Keep track of your growth",
		href: "/user/notifications",
		user_name: "John Doe",
		image: "/icons/default-avatar.svg",
		time: "2 days ago",
		type: "rating",
		seen: true,
	},
];

export default function NotificationDropdown() {
	return (
		<Popover className="relative">
			{({ open }) => (
				<>
					<Popover.Button
						className={`
                ${open ? "" : "text-opacity-90"}
                `}>
						<div className="w-[56px] h-[48px] relative">
							<HiOutlineBell className="h-[24px] w-[24px] top-[12px] left-[16px] absolute" />
							<div className="text-[12px] text-center rounded-[10px] text-white w-[23px] h-[16px] absolute top-[4px] left-[30px] bg-status-red">
								20
							</div>
						</div>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1">
						<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-lg">
							<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="relative flex flex-col gap-8 bg-white p-7">
									<div className="body-2-semibold text-neutral-100">
										Thông báo
									</div>
									{solutions.map((item) => (
										<a
											key={item.name}
											href={item.href}
											className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
											<div className="relative flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
												<Image
													src={item.image}
													width={48}
													height={48}
													className="rounded-full"
													alt="avatar"
												/>
												<div className="absolute border-white border-2 rounded-full translate-x-1 translate-y-1 z-10 w-6 h-6 overflow-hidden bottom-0 right-0">
													{item.type ===
														"comment" && (
														<FaComments className="h-full w-full bg-status-blue p-1" />
													)}
													{item.type === "like" && (
														<HiThumbUp className="h-full w-full bg-status-red p-1" />
													)}
													{item.type ===
														"payment" && (
														<MdPayment className="h-full w-full bg-status-green p-1" />
													)}
													{item.type === "rating" && (
														<MdAssessment className="h-full w-full bg-status-yellow p-1" />
													)}
												</div>
											</div>
											<div className="ml-4">
												<p className="body-4-semibold text-neutral-100">
													{item.name}
													<span className="text-sm text-neutral-40 font-normal ml-2">
														@{item.user_name}
													</span>
												</p>
												<p className="text-sm font-semibold text-neutral-100">
													{item.type === "like" && (
														<span className="font-normal">
															Thích{" "}
														</span>
													)}
													{item.type ===
														"comment" && (
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
													{item.type ===
														"payment" && (
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
								<div className="bg-gray-50 p-4">
									<Link href="/user/notifications">
										<a className="btn btn-primary w-full btn-sm inline-block">
											Xem thêm thông báo
										</a>
									</Link>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
}
