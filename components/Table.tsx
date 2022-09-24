import {
	ColumnDef,
	getCoreRowModel,
	Table as ReactTable,
	useTableInstance
} from "@tanstack/react-table";
import classNames from "classnames";
import {useState} from "react";

interface TableProps<D> {
	data: D[];
	columns: ColumnDef<any>[];
	table: ReactTable<any>;
	striped?: boolean;
	className?: string;
}

export default function Table<D>(props: TableProps<D>) {
	const [columns] = useState<ColumnDef<any>[]>(() => props.columns);
	const instance = useTableInstance(props.table, {
		data : [...props.data],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});
	const cn = classNames("table-auto", props.className, {
		"table-striped": props.striped,
	});
	return (
		<div>
			<table className={cn}>
				<thead className="text-left border-b mb-3">
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
						<tr key={row.id} className="hover:bg-grey">
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
