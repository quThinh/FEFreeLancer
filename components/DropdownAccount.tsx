import authApi from "@/api/authApi";
import userApi from "@/api/userApi";
import walletApi from "@/api/walletApi";
import convertNumberToAppreviation from "@/utils/convertNumberToAppre";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import {
	HiBadgeCheck,
	HiOutlineBriefcase,
	HiOutlineCash,
	HiOutlineClipboardList,
	HiOutlineGift,
	HiOutlinePencilAlt,
	HiOutlineSpeakerphone,
	HiOutlineUser,
} from "react-icons/hi";
import { RiFileCopyLine } from "react-icons/ri";
import BIcon from "../public/icons/B.svg";

interface IDropdownAccount {}
function DropdownAccount(props: IDropdownAccount) {
	const { user, isLoading, isError } = userApi.useUser();
	const { myWallet } = walletApi.useMyWallet();
	if (isLoading) return <div>Đang tải</div>;

	return (
		<Menu as="div" className="relative z-50 inline-block text-left">
			<div>
				<Menu.Button as="div">
					<div className="flex relative items-center cursor-pointer">
						<div className="w-12 h-12 sm:w-[52px] sm:h-[52px] relative md:mr-[12px]">
							<Image
								className="w-[100%] h-[100%] rounded-[50%] object-cover"
								src={
									user?.avatar || "/icons/default-avatar.svg"
								}
								alt="avatar"
								layout="fill"
							/>
							{
								<HiBadgeCheck className="absolute bottom-0 right-0 text-status-green" />
							}
						</div>
						<div className="text-base font-[500] grow hidden md:block">
							<div className="text-left hidden md:block">
								{user?.fullname || "Không xác định"}
							</div>
							<div className="flex items-center gap-1">
								<Image
									src={BIcon}
									alt="Bi-icon"
									className="hidden md:inline-block"
								/>
								<span className="font-[600] text-lg text-[#FF9E10]">
									{convertNumberToAppreviation(
										myWallet?.available_balance
									) || 0}
								</span>
								<FaCaretDown className="ml-auto w-6 h-6" />
							</div>
						</div>
					</div>
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
				<Menu.Items className="origin-top-left -right-3 w-[272px] absolute top-10 mt-5 shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="flex flex-col divide-y divide-gray-1 p-4 text-base text-neutral-80 font-medium">
						<div className="pb-3">
							<div className="px-3 mb-3">
								<div className="font-semibold text-neutral-100 text-lg">
									Mã giới thiệu
								</div>
								<div className="flex items-center justify-between">
									<span>GTN102831730131</span>
									<span
										role="button"
										onClick={() =>
											navigator.clipboard.writeText(
												"GTN102831730131"
											)
										}>
										<RiFileCopyLine className="text-lg text-brand-primary" />
									</span>
								</div>
							</div>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/profile">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineUser className="mr-2 w-5 h-5" />
													Trang cá nhân
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/edit-profile">
											<a>
												<div className="flex items-center p-3">
													<HiOutlinePencilAlt className="mr-2 w-5 h-5" />
													Chỉnh sửa cá nhân
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
						</div>
						<div className="py-3">
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/services">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineBriefcase className="mr-2 w-5 h-5" />
													Dịch vụ của tôi
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/requests">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineClipboardList className="mr-2 w-5 h-5" />
													Quản lý yêu cầu
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
						</div>
						<div className="py-3">
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/wallet">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineCash className="mr-2 w-5 h-5" />
													Ví của tôi
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/advertisement">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineSpeakerphone className="mr-2 w-5 h-5" />
													Quảng cáo
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/recommend">
											<a>
												<div className="flex items-center p-3">
													<HiOutlineGift className="mr-2 w-5 h-5" />
													Giới thiệu
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
						</div>
						<div className="pt-3">
							<Menu.Item>
								{({ active }) => (
									<div
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<Link href="/user/setting">
											<a>
												<div className="p-3">
													Cài đặt tài khoản
												</div>
											</a>
										</Link>
									</div>
								)}
							</Menu.Item>
							<Menu.Item as="div">
								{({ active }) => (
									<div
										role="button"
										onClick={() => {
											authApi.logout();
										}}
										className={`${
											active
												? "bg-brand-tertiary text-brand-primary"
												: ""
										}`}>
										<div className="p-3">Đăng xuất</div>
									</div>
								)}
							</Menu.Item>
						</div>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
export default DropdownAccount;
