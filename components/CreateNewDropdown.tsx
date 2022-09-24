import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import CategoryIcon from "../public/icons/Category.svg";
import { HiArrowRight, HiOutlinePlus } from "react-icons/hi";
export default function CreateNewDropdown() {
	const items = [
		{
			title: "Tạo dịch vụ",
			icon: (
				<Image alt="icon" src={CategoryIcon} width={40} height={40} />
			),
			description: "Bạn có dịch vụ muốn mọi người tìm dịch vụ",
			href: "/user/services/create",
		},
		{
			title: "Tạo yêu cầu",
			icon: (
				<Image alt="icon" src={CategoryIcon} width={40} height={40} />
			),
			description: "Để Freelancer chủ động ứng tuyển",
			href: "/user/requests/create",
		},
	];
	return (
		<div>
			<Menu as="div" className="relative inline-block">
				<Menu.Button className="btn btn-primary btn-sm">
					<HiOutlinePlus className="text-base mr-2" />
					Tạo mới
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95">
					<Menu.Items className="origin-top-left w-[350px] right-0 absolute focus:outline-none top-10 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
						<div className="p-[16px]">
							{items.map((item, index) => (
								<Menu.Item key={index}>
									{({ active }) => (
										<div>
											<Link href={item.href}>
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
															{item.icon}
														</div>
														<div className="text-left">
															<p className="font-[600] text-neutral-100">
																{item.title}
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
														<div
															style={{
																flex: "0 0 2.5rem",
															}}>
															<HiArrowRight className="text-neutral-60" />
														</div>
													</div>
												</a>
											</Link>
										</div>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
