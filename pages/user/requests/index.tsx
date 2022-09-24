import jobProductApi, { IGetUserJobList } from "@/api/jobProductApi";
import JobTable from "@/components/JobTable";
import MyListBox from "@/components/MyListBox";
import UserLayout from "@/layouts/UserLayout";
import { Tab } from "@headlessui/react";
import userApi from "api/userApi";
import Head from "next/head";
import queryString from "query-string";
import { Fragment, ReactElement, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

export default function RequestManagement() {
	const { user, isLoading, isError } = userApi.useUser();
	const [filter, setFilter] = useState<IGetUserJobList>({
		page: 1,
		limit: 10,
		status: "",
		sort: ""
	});
	const [sort, setSort] = useState<string>("-create_time");
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "-create_time", label: "Mới nhất"},
		{ value: "create_time", label: "Cũ nhất"},
		{ value: "lower_bound_fee", label: "Giá tối thiểu tăng dần"},
		{ value: "-lower_bound_fee", label: "Giá tối thiểu giảm dần"},
		{ value: "name", label: "Tên từ A -> Z"},
	]);
	const param = queryString.stringify(filter);
	const { jobs: allJob, pagination } = jobProductApi.useUserJobs(filter);
	const tabs = [
		{
			label: "Tất cả",
			onSelected: () => setFilter({ ...filter ,status: ""}),
		},
		{
			label: "Đang tư vấn",
			onSelected: () => setFilter({ ...filter, status: "1" }),
		},
		{
			label: "Đã tư vấn",
			onSelected: () => setFilter({ ...filter, status: "2" }),
		},
		{
			label: "Thành công",
			onSelected: () => setFilter({ ...filter, status: "3" }),
		},
		{
			label: "Không thành công",
			onSelected: () => setFilter({ ...filter, status: "4,5,6,7" }),
		},
	];
	return (
		<div className="bg-white">
			<Head>
				<title>Quản lý yêu cầu</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="px-8 py-3 flex justify-between items-center">
				<span className="text-2xl font-semibold">Quản lý yêu cầu</span>
					<div className="flex gap-2 mt-3">
						<MyListBox
							containerClassName="self-center"
							icon={FaAngleDown}
							buttonClassName="px-2 font-semibold text-base"
							items={sortOptions}
							onChange={(value) => {
								setSort(value.value);
								setFilter({...filter, sort: value.value});
							}}
							value={
								sortOptions.find((item) => {
									return item.value === sort;
								}) || sortOptions[0]
							}
						/>
				</div>
			</div>
			<div>
				<Tab.Group>
					<Tab.List className="flex gap-10 px-8 text-base font-semibold text-neutral-60 border-b">
						{tabs.map((tab, index) => (
							<Tab as={Fragment} key={index}>
								{({ selected }) => {
									return (
										<div
											onClick={() => tab.onSelected()}
											className={`cursor-pointer focus:outline-none ${
												selected
													? "border-b text-neutral-100 border-brand-primary"
													: ""
											}`}>
											{tab.label}
										</div>
									);
								}}
							</Tab>
						))}
					</Tab.List>
					<JobTable param={param} jobs={allJob} />
				</Tab.Group>
			</div>
		</div>
	);
}
RequestManagement.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
