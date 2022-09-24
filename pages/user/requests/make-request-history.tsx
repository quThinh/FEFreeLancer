import orderApi from "@/api/orderApi";
import MakeOrderTable from "@/components/MakeOrderTable";
import UserLayout from "@/layouts/UserLayout";
import { Tab } from "@headlessui/react";
import Head from "next/head";
import { Fragment, ReactElement, useState } from "react";
// import order from "service-history/order";
export default function RequestManagement() {
	const [active, setActive] = useState(0);
	const [filter, setFilter] = useState<{
		role: string;
		page: number;
		limit: number;
	}>({
		role: "provider",
		page: 1,
		limit: 20,
	});
	const { order, isLoading, isError } = orderApi.useOrderJob(filter);
	if (isError) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;
	return (
		<div className="bg-white">
			<Head>
				<title>Lịch sử tư vấn</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="lg:px-8 py-3">
				<span className="text-2xl font-semibold">Lịch sử tư vấn</span>
			</div>
			<div>
				<Tab.Group>
					<Tab.List className="overflow-x-auto flex gap-10 lg:px-8 text-base font-semibold text-neutral-60 border-b">
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										onClick={() => setActive(0)}
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
										onClick={() => setActive(1)}
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
										onClick={() => setActive(2)}
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
										onClick={() => setActive(3)}
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
										onClick={() => setActive(4)}
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
															item.status === 3
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
										onClick={() => setActive(5)}
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
					<MakeOrderTable
						order={order?.filter((item) => {
							if (active === 0) return item;
							if (active === 1) return item.status === 1;
							if (active === 2) return item.status === 2;
							if (active === 3) return item.status === 5;
							if (active === 4) return item.status === 3;
							if (active === 5)
								return (
									item.status === 4 ||
									item.status === 6 ||
									item.status === 7
								);
						})}
						filter={filter}
					/>
				</Tab.Group>
			</div>
		</div>
	);
}
RequestManagement.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
