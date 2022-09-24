import React, { ReactElement } from "react";
import UserLayout from "@/layouts/UserLayout";
import ComplainHistoryTable from "@/components/ComplainHistoryTable";
import Head from "next/head";

export default function ComplainHistory() {
	const [supportId, setSupportId] = React.useState("");
	const [type, setType] = React.useState("");
	const [status, setStatus] = React.useState("");
	return (
		<div className="bg-white">
			<Head>
				<title>Lịch sử khiếu nại</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="body-1-semibold text-neutral-100 sm:px-4 py-8 border-b">
				Lịch sử khiếu nại
			</div>

			<div className="sm:p-8 mt-8 sm:mt-[unset]">
				<h1 className="text-lg font-medium">Tìm kiếm khiếu nại</h1>
				<div className="bg-slate-100 mt-2 px-4 py-5 flex flex-wrap justify-between sm:justify-start">
					<input
						value={supportId}
						className="p-2 text-black placeholder:text-[#333] outline-none w-full sm:w-[30%] mb-4 sm:mb-[unset]"
						type="text"
						placeholder="Mã khiếu nại"
						onChange={(e) => setSupportId(e.target.value)}
					/>
					<select
						value={type}
						className="p-2 sm:ml-5 w-[48%] sm:w-[20%] outline-none"
						name="type"
						id="type"
						onChange={(e) => setType(e.target.value)}>
						<option value="">Chủ đề</option>
						<option value="order">Đơn hàng</option>
						<option value="transaction">Giao dịch</option>
						<option value="other">Khác</option>
					</select>
					<select
						value={status}
						className="p-2 sm:ml-5 w-[48%] sm:w-[20%] outline-none"
						name="state"
						id="state"
						onChange={(e) => setStatus(e.target.value)}>
						<option>Trạng thái</option>
						<option>Chờ tiếp nhận</option>
						<option>Đã xác nhận</option>
					</select>
				</div>
			</div>

			<div className="sm:px-8 mt-8 sm:mt-[unset] overflow-x-auto">
				<ComplainHistoryTable
					supportId={supportId}
					type={type}
					status={status === "Trạng thái" ? "" : status}
				/>
			</div>
		</div>
	);
}

ComplainHistory.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
