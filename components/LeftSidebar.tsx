import authApi from "@/api/authApi";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { IconType } from "react-icons";
import { FaAngleDown } from "react-icons/fa";
import {
	HiCheckCircle,
	HiOutlineBell,
	HiOutlineBriefcase,
	HiOutlineGift,
	HiOutlinePencilAlt,
	HiOutlineSpeakerphone,
	HiOutlineSupport,
	HiOutlineUser,
	HiOutlineViewGrid,
} from "react-icons/hi";

interface IDropdownAccount {
	verify?: boolean;
	name?: string;
	avatar?: string;
}

type menuUserItem = {
	label?: string;
	icon?: IconType;
	link?: string;
	gap?: boolean;
	id: string;
	children?: menuUserItem[];
	custom?: () => ReactElement;
};

const menuUser: menuUserItem[] = [
	{
		id: "dashboard",
		label: "Tổng quan",
		icon: HiOutlineViewGrid,
		link: "/user/dashboard",
	},
	{
		id: "profile",
		label: "Trang cá nhân",
		icon: HiOutlineUser,
		link: "/user/profile",
	},
	{
		id: "edit-profile",
		label: "Chỉnh sửa trang cá nhân",
		icon: HiOutlinePencilAlt,
		link: "/user/edit-profile",
		gap: true,
	},
	{
		id: "notifications",
		label: "Thông báo",
		icon: HiOutlineBell,
		link: "/user/notifications",
	},
	{
		id: "service-managament",
		label: "Quản lý dịch vụ",
		icon: HiOutlineBriefcase,
		children: [
			{
				id: "services",
				label: "Dịch vụ của tôi",
				link: "/user/services",
			},
			{
				id: "service-history",
				label: "Lịch sử được tư vấn",
				link: "/user/services/service-history",
			},
			{
				id: "make-service-history",
				label: "Lịch sử tư vấn",
				link: "/user/services/make-service-history",
			},
		],
	},
	{
		id: "request-management",
		label: "Quản lý yêu cầu",
		icon: HiOutlineBriefcase,
		children: [
			{
				id: "requests",
				label: "Yêu cầu của tôi",
				link: "/user/requests",
			},
			{
				id: "request-history",
				label: "Lịch sử được tư vấn",
				link: "/user/requests/request-history",
			},
			{
				id: "make-request-history",
				label: "Lịch sử tư vấn",
				link: "/user/requests/make-request-history",
			},
		],
		gap: true,
	},
	{
		id: "wallet-management",
		label: "Quản lý ví",
		icon: HiOutlineBriefcase,
		children: [
			{
				id: "wallet",
				label: "Chi tiết",
				link: "/user/wallet",
			},
			{
				id: "deposit",
				label: "Nạp tiền",
				link: "/user/wallet/deposit",
			},
			{
				id: "withdraw",
				label: "Rút tiền",
				link: "/user/wallet/withdraw",
			},
		],
	},
	{
		id: "advertisement",
		label: "Quảng cáo",
		icon: HiOutlineSpeakerphone,
		link: "/user/advertisement",
	},
	{
		id: "recommend",
		label: "Giới thiệu",
		icon: HiOutlineGift,
		link: "/user/recommend",
	},
	{
		id: "complaint",
		label: "Khiếu nại",
		icon: HiOutlineSupport,
		link: "/user/complaint",
		gap: true,
	},
	{
		id: "verify-user",
		custom: () => (
			<div className="p-3">
				<div className="mb-4 text-xs">
					{" "}
					Hãy xác thực tài khoản để sử dụng được nhiều tính năng hơn
					nhé
				</div>
				<Link href="/user/verify">
					<a className="btn btn-sm btn-primary w-full">
						<HiCheckCircle className="text-status-green mr-1" />
						Xác thực ngay
					</a>
				</Link>
			</div>
		),
	},
	{
		id: "setting",
		label: "Cài đặt tài khoản",
		link: "/user/setting",
	},
	{
		id: "logout",
		label: "Đăng xuất",
		link: "/user/logout",
	},
];

function LeftSidebar(props: IDropdownAccount) {
	const router = useRouter();
	const [selected, setSelected] = useState<string>(router.pathname);
	return (
		<div className="min-w-[272px] sticky text-base text-neutral-60 font-medium devide-[##EFF0F6]-1 self-start bg-white top-0 p-4 w-[272px] max-w-[272px] flex-initial">
			{menuUser.map((item, index) => {
				const Icon = item.icon;
				if (item.custom) {
					const Custom = item.custom;
					return <Custom key={item.id} />
				}
				if (item.children) {
					return (
						<div key={item.id}>
							<Disclosure
								defaultOpen={
									item.children.filter(
										(child) => child.link === selected
									).length > 0
								}>
								{({ open }) => (
									<>
										<Disclosure.Button
											as="div"
											className="cursor-pointer"
											onClick={() => {
												setSelected(item.id as string);
											}}>
											<div
												className={`flex items-center p-3 ${
													open
														? "bg-brand-tertiary text-brand-primary"
														: "hover:bg-brand-tertiary hover:text-brand-primary"
												}`}>
												{Icon && (
													<Icon className="mr-2 w-5 h-5" />
												)}
												{item.label}
												<FaAngleDown
													className={`ml-auto w-5 h-5 ${
														open
															? "transform rotate-180"
															: ""
													}`}
												/>
											</div>
										</Disclosure.Button>
										<Disclosure.Panel>
											{item.children &&
												item.children.map(
													(child, childIndex) => (
														<div
															key={child.id}
															className="flex cursor-pointer items-center pl-6 py-3"
															onClick={() => {
																setSelected(
																	child.link as string
																);
																router.push(
																	child.link as string
																);
															}}>
															<div
																className={`px-3 ${
																	selected ===
																	child.link
																		? "border-brand-primary text-brand-primary font-semibold border-l-2"
																		: ""
																}`}>
																{child.label}
															</div>
														</div>
													)
												)}
										</Disclosure.Panel>
									</>
								)}
							</Disclosure>
							{item.gap && (
								<div className="w-full h-[0.05rem] my-1 bg-[#EFF0F6]" />
							)}
						</div>
					);
				}
				return (
					<div key={item.id}>
						<div
							className={`${
								selected === item.link
									? "bg-brand-tertiary text-brand-primary"
									: "hover:bg-brand-tertiary hover:text-brand-primary"
							}`}
							onClick={() => setSelected(item.link as string)}>
							<Link href={item.link as string}>
								<a>
									<div className="flex items-center p-3">
										{Icon && (
											<Icon className="mr-2 w-5 h-5" />
										)}
										{item.label}
									</div>
								</a>
							</Link>
						</div>
						{item.gap && (
							<div className="w-full h-[0.05rem] my-1 bg-[#EFF0F6]" />
						)}
					</div>
				);
			})}
		</div>
	);
}
export default LeftSidebar;
