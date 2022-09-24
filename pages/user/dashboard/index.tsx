import ItemStats from "@/components/ItemStats";
import UserLayout from "@/layouts/UserLayout";
import { ReactElement } from "react";
import WalletTable from "@/components/WalletTable";
import { FaAngleDown } from "react-icons/fa";
import Head from "next/head";

export default function Dashboard() {
	const stats = [
		{
			title: "Total Orders",
			stats: {
				value: 2345,
				trend: "up",
				percentage: 12.7,
			},
			subtitle: "Last month",
		},
		{
			title: "Total Sales",
			stats: {
				value: 654,
				trend: "down",
				percentage: 2.2,
			},
			subtitle: "Last month",
		},
		{
			title: "Total Tickets",
			stats: {
				value: 234,
				trend: "up",
				percentage: 2.2,
			},
			subtitle: "Last month",
		},
	];
	return (
		<div>
			<Head>
				<title>Tổng quan</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="grid sm:grid-cols-3 gap-8">
				{stats.map((stat, index) => (
					<div key={index} className="px-8 py-4 bg-white grow">
						<ItemStats {...stat} />
					</div>
				))}
			</div>
			<div className="bg-white mt-8">
				<div className="flex lg:px-8 items-center justify-between border-b py-4">
					<div className="body-1-semibold text-neutral-100">
						Lịch sử rút tiền 
					</div>
					<div>
						<p className="text-base text-neutral-60 flex items-center">
							<span className="mr-3">Xếp theo: </span>
							<span className="text-neutral-100 cursor-pointer inline-flex items-center">
								Mới cập nhật <FaAngleDown className="ml-3" />
							</span>
						</p>
					</div>
				</div>
				<div className="overflow-x-auto scroll-m-1">
					<WalletTable />
				</div>
			</div>
		</div>
	);
}

Dashboard.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
