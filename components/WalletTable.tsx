import Table from "@/components/Table";
import TExternalTransaction from "interfaces/EExternalTrans";
import React from "react";
import convertToDateText from "utils/convertToDateText";
import {
	createTable,
	getCoreRowModel,
	useTableInstance,
} from "@tanstack/react-table";


export default function WalletTable({data = []} : {data: Array<TExternalTransaction> | undefined}) {
	const table = createTable().setRowType<TExternalTransaction>();
	const defaultColumns = [
		table.createDataColumn("transaction_time", {
			header: "THỜI GIAN",
			cell: (props) => {
				return (
					<div className="font-medium text-neutral-100">{props.getValue()}</div>
					)
				}
			}),
			table.createDataColumn("status", {
			header: "TRẠNG THÁI",
			cell: (props) => {
				return (
					<span
					className={`text-center inline-block body-5-medium w-[105px] px-2 py-1 rounded-lg ${props.getValue() === "success"
					? "bg-status-green"
					: "bg-status-red"
				} text-white`}>
						{props.getValue() === "success"
							? "Đã thanh toán"
							: "Thất bại"}
					</span>
				);
			},
		}),
		table.createDataColumn("method", {
			header: "PHƯƠNG THỨC",
			cell: (props) => {
				return (
					<div className="font-medium text-neutral-100">{props.getValue()}</div>
					)
				}
			}),
			table.createDataColumn("ammount", {
				header: "SỐ TIỀN",
			cell: (props) => {
				return (
					<div className="font-medium text-neutral-100">{props.getValue() + " VND"}</div>
					)
				}
			}),
			table.createDataColumn("content", {
				header: "NỘI DUNG",
			cell: (info) => {
				return (
					<div className="font-medium text-neutral-100">{info.getValue()}</div>
				)
			}
		}),
	];
	const defaultData: TExternalTransaction[] = data;
	return (
		<div>
			<Table<TExternalTransaction>
				columns={defaultColumns}
				data={defaultData}
				table={table}
				className="w-full mx-3"
				striped
			/>
		</div>
	);
}
