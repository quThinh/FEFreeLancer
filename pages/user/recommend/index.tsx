import UserLayout from "@/layouts/UserLayout";
import { ReactElement } from "react";
import { Tab } from "@headlessui/react";
import Button from "@/components/Button";
import WalletTable from "@/components/WalletTable";
import { HiOutlineInformationCircle, HiUserGroup } from "react-icons/hi";
import Head from "next/head";

export default function Recommend() {
	return (
		<div className="sm:p-8 mt-8 sm:mt-[unset] min-h-full bg-white">
			<Head>
				<title>Giới thiệu nhận hoa hồng</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="body-1-semibold">Giới thiệu nhận hoa hồng</div>
			<div className="mt-8">
				<Tab.Group>
					<Tab.List className="flex gap-4 border-b">
						<Tab
							className={({ selected }) =>
								`${
									selected
										? "border-b border-status-blue"
										: ""
								} pb-2`
							}>
							Thông tin giới thiệu
						</Tab>
						<Tab
							className={({ selected }) =>
								`${
									selected
										? "border-b border-status-blue"
										: ""
								} pb-2`
							}>
							Lịch sử nhận hoa hồng
						</Tab>
						<Tab
							className={({ selected }) =>
								`${
									selected
										? "border-b border-status-blue"
										: ""
								} pb-2`
							}>
							Thể lệ
						</Tab>
					</Tab.List>

					<Tab.Panels>
						<Tab.Panel className="flex flex-col gap-6">
							<div className="body-4-semibold mt-4 text-neutral-80">
								Link giới thiệu của bạn
							</div>
							<div className="body-5">
								Mời bạn bè đăng ký thông qua đường link dưới đây
								để được hưởng hoa hồng
							</div>
							<div className="flex gap-4 w-full sm:w-[unset] justify-around sm:justify-start">
								<div className="p-4 text-brand-primary border body-4-semibold">
									GTN102831730131
								</div>
								<Button
									md
									primary
									onClick={() =>
										navigator.clipboard.writeText(
											"GTN102831730131"
										)
									}>
									Sao chép
								</Button>
							</div>
							<div className="flex gap-8 flex-wrap mb-8 sm:mb-[unset] mt-6 sm:mt-[unset]">
								<div className="flex w-full sm:w-[unset] justify-around sm:justify-start gap-4 p-4 bg-white shadow-md">
									<div className="w-10 h-10 p-2 bg-status-blue text-white rounded-full">
										<HiUserGroup className="w-full h-full" />
									</div>
									<div>
										<div className="text-neutral-60 body-5-semibold text-sm">
											Số người đã giới thiệu
											<span className="ml-2">
												<HiOutlineInformationCircle className="inline-block" />
											</span>
										</div>
										<div className="body-1-semibold text-neutral-100">
											857
										</div>
									</div>
								</div>
								<div className="flex w-full sm:w-[unset] justify-around sm:justify-start gap-4 p-4 bg-white shadow-md">
									<div className="w-10 h-10 p-2 bg-status-blue text-white rounded-full">
										<HiUserGroup className="w-full h-full" />
									</div>
									<div>
										<div className="text-neutral-60 body-5-semibold text-sm">
											Hoa Hồng
											<span className="ml-2">
												<HiOutlineInformationCircle className="inline-block" />
											</span>
										</div>
										<div className="body-1-semibold text-neutral-100">
											857
										</div>
									</div>
								</div>
								<div className="flex w-full sm:w-[unset] justify-around sm:justify-start gap-4 p-4 bg-white shadow-md">
									<div className="w-10 h-10 p-2 bg-status-blue text-white rounded-full">
										<HiUserGroup className="w-full h-full" />
									</div>
									<div>
										<div className="text-neutral-60 body-5-semibold text-sm">
											Số người đã giới thiệu
											<span className="ml-2">
												<HiOutlineInformationCircle className="inline-block" />
											</span>
										</div>
										<div className="body-1-semibold text-neutral-100">
											857
										</div>
									</div>
								</div>
							</div>
						</Tab.Panel>
						<Tab.Panel className={"overflow-x-auto"}>
							<WalletTable />
						</Tab.Panel>
						<Tab.Panel></Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}
Recommend.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
