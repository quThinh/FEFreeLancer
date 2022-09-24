import Button from "@/components/Button";
import UserLayout from "@/layouts/UserLayout";
import Head from "next/head";
import { ReactElement } from "react";
import { HiCheck, HiOutlineInformationCircle } from "react-icons/hi";

export default function Advertisement() {
	return (
		<div className="sm:p-8 mt-8 sm:mt-[unset] bg-white min-h-full">
			<Head>
				<title>Quảng cáo</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="body-1-semibold">Gói quảng cáo</div>
			<div className="py-8 sm:px-20 bg-grey-light flex flex-wrap rounded justify-center mt-8">
				<div className="xl:pr-20 border mb-16 xl:mb-[unset] xl:border-r xl:border-none grow min-h-full">
					<div className="flex flex-col divide-y min-h-full divide-1-grey">
						<div className="px-6 pt-6">
							<div className=" gap-2 flex items-center ">
								<div className="h-8 w-4 bg-status-blue rounded" />
								<span className="text-[20px] font-semibold text-neutral-100">
									Gói thường
								</span>
							</div>
							<div className="text-base py-8 font-semibold text-neutral-60">
								Gói quảng cáo cơ bản
							</div>
						</div>

						<div className="p-6">
							<p className="headline-4 font-bold">
								100.000VND{" "}
								<span className="body-4-semibold text-neutral-60">
									/tháng
								</span>
								<HiOutlineInformationCircle className="inline-block text-base text-neutral-60 ml-2" />
							</p>
						</div>
						<div className="flex flex-col gap-6 p-6">
							{[
								"Gói cơ bản",
								"Công cụ phân tích dữ liệu người dùng",
								"100 mã khuyến mãi",
								"Tối đa 5 dịch vụ tải lên",
							].map((item, index) => (
								<div
									className="flex items-center gap-2 body-4-semibold text-neutral-80"
									key={index}>
									<HiCheck className="inline-block text-status-green" />
									<div>{item}</div>
								</div>
							))}
						</div>
						<div className="p-6 mt-auto pt-20">
							<Button md secondary block>
								Thực hiện
							</Button>
						</div>
					</div>
				</div>
				<div className="xl:pl-20 border xl:border-none grow h-full">
					<div className="flex flex-col divide-y divide-1-grey">
						<div className="px-6 pt-6">
							<div className=" gap-2 flex items-center ">
								<div className="h-8 w-4 bg-status-purple rounded" />
								<span className="text-[20px] font-semibold text-neutral-100">
									Gói Pro
								</span>
								<span className="ml-3 p-2 bg-status-yellow text-xs text-white rounded-3xl">
									Đề xuất
								</span>
							</div>
							<div className="text-base py-8 font-semibold text-neutral-60">
								Quảng cáo không giới hạn thời gian 🔥
							</div>
						</div>

						<div className="p-6">
							<p className="headline-4 font-bold">
								200.000VND{" "}
								<span className="body-4-semibold text-neutral-60">
									/tháng
								</span>
								<HiOutlineInformationCircle className="inline-block text-base text-neutral-60 ml-2" />
							</p>
						</div>
						<div className="flex flex-col gap-6 p-6">
							{[
								"Extended shop profile",
								"Customer communication tools",
								"Unlimited promotion posts",
								"Unlimited product uploads",
								"Special offers promo tool",
								"Analytics and insights",
								"Bulk message to all customers",
							].map((item, index) => (
								<div
									className="flex items-center gap-2 body-4-semibold text-neutral-80"
									key={index}>
									<HiCheck className="inline-block text-status-green" />
									<div>{item}</div>
								</div>
							))}
						</div>
						<div className="p-6 pt-20 mt-auto">
							{" "}
							<Button md primary block>
								Thực hiện
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
Advertisement.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
