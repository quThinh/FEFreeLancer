/* This example requires Tailwind CSS v2.0+ */
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { FaAngleRight } from "react-icons/fa";
import CategoryIcon from "../public/icons/Category.svg";

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

interface CategoryBoardDropdownProps {
	position?:
		| "left"
		| "right"
		| "center"
		| "bottom"
		| "top-right"
		| "top-left"
		| "bottom-right"
		| "bottom-left";
}

export default function CategoryBoardDropdown(
	props: CategoryBoardDropdownProps
) {
	const data = {
		service: {
			title: "Dịch vụ Niubi cung cấp cho bạn",
			items: [
				{
					title: "Tìm dịch vụ",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					description: "Bạn có dịch vụ muốn mọi người tìm dịch vụ",
					href: "/services",
				},
				{
					title: "Tìm tiền bối",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					description:
						"Niubi - Nơi hội tụ các tiền bối chuyên nghiệp nhất",
					href: "/seniors",
				},
				{
					title: "Yêu cầu",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					href: "/jobs",
					description: "Để Freelancer sẽ chủ động liên hệ với bạn",
				},
			],
		},
		post: {
			title: "Các bài đọc nổi bật",
			items: [
				{
					title: "Ngăn chặn vi phạm dữ liệu",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					description:
						"Bảo vệ dữ liệu nhạy cảm của bạn khỏi các vi phạm",
					href: "/news",
				},
				{
					title: "Quản lý bảo mật",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					href: "/",
					description: "Quản lý bảo mật là gì",
				},
				{
					title: "Quản lý rủi ro nhà cung cấp",
					icon: (
						<Image
							alt="icon"
							src={CategoryIcon}
							width={40}
							height={40}
						/>
					),
					description: "Quản lý rủi ro nhà cung cấp là gì",
					href: "/",
				},
			],
			button: {
				title: "Xem tất cả bài đăng trên Blog",
				href: "/",
			},
		},
	};

	return (
		<Menu as="div" className="relative z-50 inline-block text-left">
			<div>
				<Menu.Button as="div" className="text-base font-normal">
					Danh mục
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items
					className={`origin-top-left ${props.position === "center" ? "-translate-x-1/2" : ""} absolute left-28 lg:left-[unset] focus:outline-none top-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
					<div>
						<div className="w-screen max-w-xl relative">
							<div className="border-b-[18px] border-t-transparent border-r-[18px] border-b-white border-l-[18px] border-r-transparent border-l-transparent w-0 h-0 -top-[16px] lg:left-[25px] absolute"></div>
							<div className="flex bg-white flex-row rounded-lg">
								<div className="lg:flex-50 lg:max-w-[50%]">
									<div className="text-right font-[500] text-neutral-80 px-[16px] py-[13px] border-b">
										{data.service.title}
									</div>
									<div className="p-[16px]">
										{data.service.items.map(
											(item, index) => (
												<Menu.Item key={index}>
													{({ active }) => (
														<div>
															<Link
																href={
																	item.href
																}>
																<a>
																	<div
																		className={`flex p-[8px] gap-3 items-center ${
																			active
																				? "bg-grey rounded"
																				: ""
																		}`}>
																		<div
																			style={{
																				flex: "0 0 2.5rem",
																			}}>
																			{
																				item.icon
																			}
																		</div>
																		<div className="text-left">
																			<p className="font-[600] text-neutral-100">
																				{
																					item.title
																				}
																			</p>
																			<p
																				className={`${
																					active
																						? "text-status-blue"
																						: "text-neutral-80"
																				}`}>
																				{
																					item.description
																				}
																			</p>
																		</div>
																	</div>
																</a>
															</Link>
														</div>
													)}
												</Menu.Item>
											)
										)}
									</div>
								</div>
								<div className="flex-50 max-w-[50%]">
									<div className="text-left font-[500] text-neutral-80 px-[16px] py-[13px] border-b">
										{data.post.title}
									</div>
									<div className="flex flex-col border-l">
										<div className="p-4">
											{data.post.items.map(
												(item, index) => (
													<Menu.Item key={index}>
														{({ active }) => (
															<div>
																<Link
																	href={
																		item.href
																	}>
																	<a>
																		<div
																			className={`flex p-[8px] gap-3 items-center ${
																				active
																					? "bg-grey rounded"
																					: ""
																			}`}>
																			<div
																				style={{
																					flex: "0 0 2.5rem",
																				}}>
																				{
																					item.icon
																				}
																			</div>
																			<div className="text-left">
																				<p className="font-[600] text-neutral-100">
																					{
																						item.title
																					}
																				</p>
																				<p
																					className={`${
																						active
																							? "text-status-blue"
																							: "text-neutral-80"
																					}`}>
																					{
																						item.description
																					}
																				</p>
																			</div>
																		</div>
																	</a>
																</Link>
															</div>
														)}
													</Menu.Item>
												)
											)}
										</div>
										<button className="rounded-br-lg text-sm p-3 inline-flex justify-center items-center font-normal btn text-status-blue bg-grey align-self-end w-100">
											{data.post.button.title}
											<FaAngleRight className="ml-3" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
