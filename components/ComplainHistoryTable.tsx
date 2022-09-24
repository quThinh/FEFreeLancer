import {
	createTable,
	getCoreRowModel,
	useTableInstance
} from "@tanstack/react-table";
import complainApi from 'api/complainApi';
import TOrderComplain from "interfaces/EOrderComplain";
import {useRouter} from "next/router";
import React from "react";
import Button from "./Button";

interface ISupportHistoryTable {
	supportId?: string;
	type?: string;
	status?: string;
}

const table = createTable().setRowType<TOrderComplain>();

const defaultColumns = [
	table.createDataColumn("order_id", {
		header: "Mã đơn hàng",
		cell: (info) => (
			<div className="inline-flex gap-2 items-center">
				{info.getValue()}
			</div>
		),
	}),
	table.createDataColumn("client_id", {
		header: "Mã khách hàng",
		cell: (info) => info.getValue(),
	}),
	table.createDataColumn("complain", {
		header: "Nội dung khiếu nại",
		cell: (info) => info.getValue(),
	}),
	table.createDataColumn("status", {
		header: "Trạng thái",
		cell: (info) => info.getValue(),
	}),
	table.createDisplayColumn({
		id: "action",
		header: "",
		cell: () => (
			<div>
				<Button type="button" sm className="ml-2 btn-danger">
					<i className="uil uil-trash-alt"></i>
				</Button>
			</div>
		),
	}),
];

export default function ComplainHistoryTable({
	supportId,
	type,
	status,
}: ISupportHistoryTable) {
	const [params, setParams] = React.useState({
		page: 1,
		limit: 10,
	});
	const {complains = []} = complainApi.useComplainList(params);
	const [data, setData] = React.useState(() => [...complains]);
	const [columns] = React.useState<typeof defaultColumns>(() => [
		...defaultColumns,
	]);

	React.useEffect(() => {
		setData(complains);
	}, [complains]);

	const instance = useTableInstance(table, {
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const router = useRouter();

	return (
		<div>
			<table className="w-full">
				<thead className="text-left border-b mb-3 bg-slate-100">
					{instance.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									className="py-4 px-4 font-medium text-base text-neutral-80">
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
						<tr
							key={row.id}
							className="hover:bg-grey border-b cursor-pointer"
							onClick={() =>
								router.push(
									`/user/support/${row?.original?._id}`
								)
							}>
							{row.getVisibleCells().map((cell) => (
								<td className="py-6 px-4" key={cell.id}>
									{cell.renderCell()}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
