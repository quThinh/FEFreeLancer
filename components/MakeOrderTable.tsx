import {
	createTable,
	getCoreRowModel,
	useTableInstance,
} from "@tanstack/react-table";
import TOrder, { EOrderStatus } from "interfaces/EOrder";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import Button from "./Button";
import orderApi from "@/api/orderApi";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import FormTextArea from "./FormTextArea";
import { mutate, useSWRConfig } from "swr";
import queryString from "query-string";
import convertToHTMLDate from "@/utils/convertToHTMLDate";
const table = createTable().setRowType<TOrder>();
export default function MakeOrderTable({
	order = [],
	filter = {
		role: "",
		page: 0,
		limit: 0,
	},
}: {
	order: Array<TOrder> | undefined;
	filter: { role: string; page: number; limit: number };
}) {
	const { mutate } = useSWRConfig();
	const [isOpenCancelNote, setIsOpenCancelNote] = useState(false);
	const [currentItem, setCurrentItem] = useState("");
	const defaultColumns = [
		table.createDisplayColumn({
			header: "STT",
			id: "stt",
			cell: (info) => {
				return <div>{info.row.index + 1}</div>;
			},
		}),
		table.createDataColumn("client_id", {
			header: "Tên khách hàng",
			cell: (info) => (
				<div className="inline-flex gap-2 items-center">
					<Image
						src="/icons/default-avatar.svg"
						width={40}
						height={40}
						alt="avatar"
					/>
					{info.getValue()?.fullname}
				</div>
			),
		}),
		table.createDataColumn("product_id", {
			header: "Dịch vụ",
			cell: (info) => info.getValue()?.name,
		}),
		table.createDataColumn("price", {
			header: "Giá thanh toán",
			cell: (info) => (
				<div>
					<div className="gap-1 flex items-center text-status-yellow font-semibold">
						<span>{info.getValue()}</span>
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
			header: "Ngày thuê",
			cell: (info) => convertToHTMLDate(info.getValue()),
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
								Chờ giao việc
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
		table.createDisplayColumn({
			header: "Thao tác",
			id: "action",
			cell: (info) => {
				switch (info.row.original?.status) {
					case EOrderStatus.PENDING:
						return (
							<div>
								<Button
									onClick={() =>
										orderApi.confirmOrder(
											info.row.original?._id
										)
									}
									sm
									primary
									className="rounded-full bg-green text-white mr-2">
									Nhận đơn
								</Button>
								<Button
									onClick={() => {
										setCurrentItem(
											info.row.original?._id
												? info.row.original?._id
												: ""
										);
										setIsOpenCancelNote(true);
									}}
									sm
									secondary
									className="border-red text-red rounded-full mr-2">
									Hủy đơn
								</Button>
							</div>
						);
					case EOrderStatus.ACCEPTED:
						return (
							<div>
								<Button
									sm
									primary
									onClick={() =>
										orderApi.finishMentorOrder(
											info?.row?.original?._id
										)
									}
									className="rounded-full bg-blue text-white mr-2">
									tư vấn xong
								</Button>
								<Button
									sm
									secondary
									onClick={() => {
										setCurrentItem(
											info.row.original?._id
												? info.row.original?._id
												: ""
										);
										setIsOpenCancelNote(true);
									}}
									className="border-red text-red rounded-full mr-2">
									Hủy đơn
								</Button>
							</div>
						);
					case EOrderStatus.FINISHED:
					case EOrderStatus.PAID:
					case EOrderStatus.COMPLAINING:
					case EOrderStatus.CANCELED:
					case EOrderStatus.DENIED:
					case EOrderStatus.CLOSED:
					default:
						return <></>;
				}
			},
		}),
	];
	const instance = useTableInstance(table, {
		data: order,
		columns: [...defaultColumns],
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<div>
			<Transition show={isOpenCancelNote}>
				<Dialog
					open={isOpenCancelNote}
					onClose={() => setIsOpenCancelNote(false)}
					className="z-20 relative">
					<Transition.Child>
						<div className="flex inset-0 fixed bg-black opacity-50"></div>
					</Transition.Child>
					<Transition.Child as={Fragment}>
						<div className="flex py-3 items-center fixed inset-0 justify-center">
							<div className="bg-white w-1/2 overflow-y-scroll max-h-full rounded-lg p-6 shadow-lg">
								<Dialog.Panel>
									<Dialog.Title className="mb-8">
										<div
											className="flex items-center"
											role="button"
											onClick={() =>
												setIsOpenCancelNote(false)
											}></div>
									</Dialog.Title>
									<Dialog.Description>
										<div className="max-w-[900px]">
											<div className="flex items-center justify-between px-8 py-4 border-b">
												<span className="text-neutral-100 text-2xl font-semibold">
													Lý do hủy đơn:
												</span>
											</div>
											<div className="p-6">
												<Formik
													initialValues={{ note: "" }}
													onSubmit={async (
														values
													) => {
														await orderApi.cancelOrder(
															currentItem,
															values.note
														);
														setIsOpenCancelNote(
															false
														);
														mutate(
															`/order?${queryString.stringify(
																filter
															)}`
														);
													}}
													enableReinitialize>
													{({ values }) => {
														return (
															<Form className="divide-y divide-grey-1">
																<div>
																	<div className="col-span-3">
																		<label
																			htmlFor="note"
																			className="font-semibold text-neutral-100">
																			Mô
																			tả
																			lý
																			do
																			mà
																			bạn
																			hủy
																			đơn
																			hàng
																		</label>
																	</div>
																	<div className="col-span-5">
																		<FormTextArea
																			name="note"
																			className="border p-4 h-32"
																			placeholder="Nhập mô tả lý do"
																			maxLength={
																				500
																			}
																		/>
																		<p className="flex justify-between text-sm text-neutral-60">
																			<span>
																				Tối
																				đa
																				500
																				ký
																				tự{" "}
																			</span>
																			<span>
																				0/500
																			</span>
																		</p>
																	</div>
																	<Button
																		className="my-4"
																		md
																		primary
																		onClick={() =>
																			setIsOpenCancelNote(
																				false
																			)
																		}>
																		Hủy
																	</Button>
																	<Button
																		className="m-4"
																		type="submit"
																		md
																		secondary>
																		Xong
																	</Button>
																</div>
															</Form>
														);
													}}
												</Formik>
											</div>
										</div>
									</Dialog.Description>
								</Dialog.Panel>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition>
			<table className="w-full ">
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
	);
}
