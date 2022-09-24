import jobProductApi from "@/api/jobProductApi";
import userApi from "@/api/userApi";
import {
	createTable,
	getCoreRowModel,
	useTableInstance,
} from "@tanstack/react-table";
import TJob from "interfaces/EJob";
import Image from "next/image";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { FaEdit, FaFolderOpen, FaTrashAlt } from "react-icons/fa";
import { HiOutlineFolderOpen } from "react-icons/hi";

import { useSWRConfig } from "swr";
import TableDropdown from "./TableDrodown";

const table = createTable().setRowType<TJob>();

export default function JobTable({
	jobs = [],
	param = "",
}: {
	jobs: Array<TJob> | undefined;
	param: string | undefined;
}) {
	const [renderState, setRenderState] = useState(true)
	useEffect(() => {
		console.log("render")
	},[renderState])
	const { mutate } = useSWRConfig();
	const defaultColumns = [
		table.createDisplayColumn({
			header: "STT",
			id: "stt",
			cell: (info) => {
				return <div>{info.row.index + 1}</div>;
			},
		}),
		table.createDataColumn("name", {
			header: "Nội dung",
			cell: (info) => (
				<div
					onClick={() =>
						router.push(
							`/user/requests/detail/${info.row.original?._id}`
						)
					}
					className="cursor-pointer">
					{info.getValue()}
				</div>
			),
		}),
		table.createDataColumn("lower_bound_fee", {
			header: "Giá yêu cầu",
			cell: (info) => (
				<div
					onClick={() =>
						router.push(
							`/user/requests/detail/${info.row.original?._id}`
						)
					}
					className="cursor-pointer">
					<div className="gap-1 flex items-center text-status-yellow font-semibold">
						<span>{info.getValue()} - {info.row.original?.upper_bound_fee}</span>
						<Image
							src="/icons/B.svg"
							width="20px"
							height="20px"
							alt="B-icon"
						/>
					</div>
				</div>
			),
		}),
		table.createDataColumn("create_time", {
			header: "Ngày tạo",
			cell: (info) => info.getValue(),
		}),
		table.createDataColumn("status", {
			header: "Trạng thái",
			cell: (info) => {
				switch (info.getValue()) {
					case 0:
						return (
							<div className="text-status-black font-medium">
								Đã tiếp nhận
							</div>
						);
					case 1:
						return (
							<div className="text-status-yellow font-medium">
								Đang tư vấn
							</div>
						);
					case 2:
						return (
							<div className="text-status-yellow font-medium">
								Đã tư vấn
							</div>
						);
					case 3:
						return (
							<div className="text-status-green font-medium">
								Đã hoàn thành
							</div>
						);
					case 4:
						return (
							<div className="text-status-red font-medium">
								Không thành công
							</div>
						);
					case 5:
						return (
							<div className="text-status-red font-medium">
								Hủy bởi người mua
							</div>
						);
					case 6:
						return (
							<div className="text-status-red font-medium">
								Hủy bởi bạn
							</div>
						);
					case 7:
						return (
							<div className="text-status-red font-medium">
								Hủy bởi hệ thống
							</div>
						);
					default:
						return null;
				}
			},
		}),
		table.createDataColumn("_id", {
			header: "",
			cell: (info) => (
				<TableDropdown
					items={[
						{
							name: "Chỉnh sửa",
							icon: FaEdit,
							function: () =>
								router.push(
									`/user/requests/edit?id=${info.getValue()}`
								),
						},
						{
							name: "Xóa yêu cầu",
							icon: FaTrashAlt,
							function: () => {
								jobProductApi.deleteJob(info.getValue());
								mutate(`/jobs/myJob?${param}`);
							},
						},
					]}
				/>
			),
		}),
	];
	const [columns] = React.useState<typeof defaultColumns>(() => [
		...defaultColumns,
	]);
	const instance = useTableInstance(table, {
		data: jobs,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (jobs.length > 0) return (
		<div className="ml-3">
			<table className="w-full">
				<thead className="text-left border-b mb-3">
					{instance.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id} className="">
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									className="last:text-center py-4 decoration-black px-4 font-medium text-base text-neutral-80">
									{header.isPlaceholder
										? null
										: header.renderHeader()}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{instance.getRowModel().rows.map((row) => (
						<tr key={row.id} className="hover:bg-grey">
							{row.getVisibleCells().map((cell) => (
								<td
									className="last:text-center py-6 px-4"
									key={cell.id}>
									{cell.renderCell()}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
	else return (
		<div className="my-40">
			<HiOutlineFolderOpen className="w-48 mx-auto h-48 opacity-50" />
			<div className="body-1-semibold text-neutral-100 text-center">Bạn chưa có tư vấn nào</div>
			<div className=" text-neutral-100  mx-auto text-center text-neutral-60 max-w-prose">
				Hãy thử tạo dịch vụ và sử dụng gói <span className="underline text-brand-primary">quảng cáo</span>  của
				chúng tôi để mọi người biết đến nhiều hơn nhé
			</div>
		</div>
	)
}
