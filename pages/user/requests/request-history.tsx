import { Tab } from "@headlessui/react";
import { Fragment, ReactElement } from "react";
import UserLayout from "@/layouts/UserLayout";
import { useState } from "react";
import OrderTable from "@/components/OrderTable";
import orderApi from "@/api/orderApi";
import Head from "next/head";
// import order from "service-history/order";
export default function RequestManagement() {
	const [filter, setFilter] = useState<{
		role: string;
		page: number;
		limit: number;
	}>({
		role: "client",
		page: 1,
		limit: 30,
	});
	const { order, isLoading, isError } = orderApi.useOrderJob(filter);
	if (isError) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	return (
		<div className="bg-white">
			<Head>
				<title>Lịch được sử tư vấn</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="lg:px-8 py-3">
				<span className="text-2xl font-semibold">
					Lịch sử được tư vấn
				</span>
			</div>
			<div>
				<Tab.Group>
					<Tab.List className="overflow-x-auto flex gap-10 lg:px-8 text-base font-semibold text-neutral-60 border-b">
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b text-neutral-100 border-brand-primary"
												: ""
										}`}>
										All{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{order?.length}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b border-brand-primary text-neutral-100"
												: ""
										}`}>
										Đang Tư vấn{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{
													order?.filter(
														(item) =>
															item.status === 1
													).length
												}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b border-brand-primary text-neutral-100"
												: ""
										}`}>
										Đã tư vấn{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{
													order?.filter(
														(item) =>
															item.status === 2
													).length
												}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b border-brand-primary text-neutral-100"
												: ""
										}`}>
										Đã từ chối{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{
													order?.filter(
														(item) =>
															item.status === 5
													).length
												}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b border-brand-primary text-neutral-100"
												: ""
										}`}>
										Thành công{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{
													order?.filter(
														(item) =>
															item.status === 2
													).length
												}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										className={`cursor-pointer focus:outline-none ${
											selected
												? "border-b border-brand-primary text-neutral-100"
												: ""
										}`}>
										Không thành công{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{
													order?.filter(
														(item) =>
															item.status === 4 ||
															item.status === 6 ||
															item.status === 7
													).length
												}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
					</Tab.List>
					<OrderTable order={order} />
				</Tab.Group>
			</div>
		</div>
	);
}
RequestManagement.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
