import serviceProductApi, {
	IGetPublicServiceList,
} from "@/api/serviceProductApi";
import userApi from "@/api/userApi";
import Avatars from "@/components/Avatars";
import BadgeReputation from "@/components/BadgeReputation";
import BadgeVerify from "@/components/BadgeVerify";
import ItemUserStatics from "@/components/ItemUserStatics";
import ReactPagination from "@/components/ReactPagination";
import ServiceGrid from "@/components/ServiceGrid";
import UserLayout from "@/layouts/UserLayout";
import { Listbox } from "@headlessui/react";
import Head from "next/head";
import Link from "next/link";
import { Fragment, ReactElement, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import {
	HiOutlineFire,
	HiOutlinePencilAlt,
	HiOutlineThumbUp,
	HiOutlineUsers,
} from "react-icons/hi";

export default function UserProfile() {
	const { user, isLoading, isError } = userApi.useUser();
	const [filter, setFilter] = useState<IGetPublicServiceList>({
		page: 1,
		limit: 12,
	});
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "name", label: "Tên dịch vụ A-Z" },
		{ value: "-name", label: "Tên dịch vụ Z-A" },
	]);
	const { userService = [], paginationInfo } =
		serviceProductApi.useUserServices(filter);
	if (isError) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	return (
		<>
			<Head>
				<title> Trang cá nhân</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="flex gap-6 flex-col bg-white h-full w-full sm:p-8 mt-8 sm:mt-[unset]">
				<div className="pb-6 border-b">
					<div className="flex flex-wrap sm:flex-nowrap justify-center gap-6">
						<div>
							<Avatars />
						</div>
						<div className="grow">
							<div className="flex justify-between">
								<div>
									<h1 className="text-3xl font-semibold">
										{user?.fullname}
									</h1>
								</div>
								<div>
									<Link href="/user/edit-profile">
										<a className="btn btn-sm btn-secondary">
											<HiOutlinePencilAlt /> Sửa hồ sơ
										</a>
									</Link>
								</div>
							</div>
							<div className="mt-2 sm:mt-[unset]">
								<BadgeVerify />
								<BadgeReputation />
							</div>
							<div className="flex flex-wrap gap-10 mt-4">
								<ItemUserStatics
									icon={HiOutlineFire}
									label="Dịch vụ"
									value={paginationInfo?.total}
								/>
								<ItemUserStatics
									icon={HiOutlineUsers}
									label="Số người đã mua"
									value={"40+"}
								/>
								<ItemUserStatics
									icon={HiOutlineThumbUp}
									label=" Đánh giá"
									value={user?.rate_star}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="p-6 flex flex-col gap-4">
					<div className="flex items-center justify-between">
						<div className="body-1-semibold text-neutral-100">
							Dịch vụ cung cấp ({paginationInfo?.total})
						</div>
						<div>
							<Listbox
								as="div"
								className="relative w-64"
								value={filter.sort}
								onChange={(value) =>
									setFilter({
										...filter,
										sort: value,
									})
								}>
								<Listbox.Button className="w-full text-base text-neutral-60 flex items-center">
									<div className="lg:ml-auto">
										<span className="mr-3">Xếp theo: </span>
										<span className="text-neutral-100 body-4-medium cursor-pointer inline-flex items-center">
											{sortOptions.find(
												(item) =>
													item.value === filter.sort
											)?.label || "Chọn xếp theo"}
											<FaAngleDown className="ml-3" />
										</span>
									</div>
								</Listbox.Button>
								<Listbox.Options className="absolute mt-3 right-0 focus:ring-grey focus:outline-none shadow-md text-base text-neutral-80 bg-white w-full z-10">
									{sortOptions.map((option) => (
										<Listbox.Option
											as={Fragment}
											key={option.value}
											value={option.value}>
											{({ selected, active }) => (
												<div
													className={`px-6 py-3 pl-8 ${
														selected
															? "bg-brand-tertiary text-brand-primary"
															: ""
													} cursor-pointer`}>
													{option.label}
												</div>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Listbox>
						</div>
					</div>
					<div className="">
						<ServiceGrid
							className="xl:grid-cols-4 lg:grid-cols-3"
							services={userService.map((item) => ({
								...item,
								user_id: user,
							}))}
						/>
					</div>
					<ReactPagination
						pageCount={
							paginationInfo?.total
								? Math.ceil(
										paginationInfo?.total / filter.limit
								  )
								: 0
						}
						initialPage={filter.page - 1}
						onPageChange={(page) => {
							setFilter({ ...filter, page });
						}}
					/>
				</div>
			</div>
		</>
	);
}

UserProfile.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
