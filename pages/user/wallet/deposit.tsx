import { ReactElement, useEffect, useState } from "react";
import UserLayout from "@/layouts/UserLayout";
import { Combobox, RadioGroup } from "@headlessui/react";
import React from "react";
import Image from "next/image";
import { HiCheck, HiClock } from "react-icons/hi";
import PriceTag from "@/components/PriceTag";
import Button from "@/components/Button";
import walletApi from "@/api/walletApi";
import Head from "next/head";
import { Form, Formik } from "formik";
import FormSelect from "@/components/FormSelect";
import FormInput from "@/components/FormInput";
import Comboboxtext from "@/components/Comboboxtext";
import * as yup from 'yup';
import { productSchema } from "interfaces/EProduct";

export interface IGetAdminBankList {
	account_name: string,
	account_number: string,
	admin_id: string,
	bank_branch: string,
	bank_name: string,
	created_at: string,
	_id: string,
	__v: number,
}

export default function Deposit() {
	const [filter, setFilter] = useState<{
		page: number,
		limit: number,
	}>({
		page: 1,
		limit: 10
	})
	// const paymentOptions = [
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/icon-payment-method-momo.svg"
	// 				width={32}
	// 				height={32}
	// 				alt="momo-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Momo",
	// 		value: "momo",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/icon-payment-method-viettelmoney.png"
	// 				width={32}
	// 				height={32}
	// 				alt="viettel-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Viettel",
	// 		value: "viettel",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/vnpay.svg"
	// 				width={60}
	// 				height={32}
	// 				alt="viettel-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua VNPAY",
	// 		value: "vnpay",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/icon-payment-method-zalo-pay.svg"
	// 				width={32}
	// 				height={32}
	// 				alt="zalo-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Zalo Pay",
	// 		value: "zalo",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/PayPal.svg"
	// 				width={90}
	// 				height={32}
	// 				alt="paypal-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Paypal",
	// 		value: "paypal",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/Visa.svg"
	// 				width={60}
	// 				height={32}
	// 				alt="visa-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Visa",
	// 		value: "visa",
	// 	},
	// 	{
	// 		icon: (
	// 			<Image
	// 				src="/icons/Mastercard.svg"
	// 				width={40}
	// 				height={32}
	// 				alt="mastercard-icon"
	// 			/>
	// 		),
	// 		label: "Thanh toán qua Mastercard",
	// 		value: "mastercard",
	// 	},
	// ];
	const priceOptions = [
		{
			label: "100.000",
			value: 100,
		},
		{
			label: "960.000",
			value: 1000,
		},
		{
			label: "2.750.000",
			value: 3000,
		},
		{
			label: "4.400.000",
			value: 5000,
		},
		{
			label: "9.600.000",
			value: 10000,
		},
		{
			label: "26.000.000",
			value: 30000,
		},
		{
			label: "43.000.000",
			value: 50000,
		},
		{
			label: "1.860.000.000",
			value: 200000,
		},
	];

	const { listBank = [], isError } = walletApi.uselistBank()
	const [price, setPrice] = React.useState(priceOptions[0].value);
	const { adminlistBank = [] } = walletApi.useadminBankList(filter)
	const [currentAdminBank, setCurrentAdminBank] = useState(adminlistBank[0])
	const [currentAdminBankId, setCurrentAdminBankId] = useState("")
	const [currentSenderBankId, setCurrentSenderBankId] = useState("")

	useEffect(() => {
		const temp = adminlistBank.filter((item: IGetAdminBankList) => item._id === currentAdminBankId)
		setCurrentAdminBank(temp[0])
	}, [currentAdminBankId]);

	useEffect(() => {
		setCurrentAdminBank(adminlistBank[0])
	}, [adminlistBank]);
	return (
		<div className="min-h-full bg-white">
			<Head>
				<title>Nạp tiền</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className="body-1-semibold sm:px-8 py-4 border-b text-neutral-100">
				Nạp xu Freelancer 
			</div>
			<div>
				<div>
					<div className="body-4-semibold text-neutral-100 sm:px-8 py-6">
						Chuyển tiền theo thông tin bên dưới:
						<div>
							<label htmlFor="">
								Chọn tài khoản admin
							</label>
							<Comboboxtext
								name="bank"
								onChange={(e: string) => setCurrentAdminBankId(e)}
								value={currentAdminBankId}
								options={[
									...adminlistBank.map((item: {
										_id: string;
										bank_name: string;
										account_name: string;
									}) => ({
										value: item._id,
										label: item.bank_name,
										extra_data: item.account_name,
									}))
								]}
							/>
						</div>
					</div>
					<div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-4 sm:px-8">
						<div className="p-9 border text-center">
							<p className="mb-4 font-medium">
								<b>Bước 1: </b>{" "}
								<br className="text-neutral-medium" /> Quét
								mã/Chuyển tiền
							</p>
							<div className="mb-4">
								<Image
									src="/images/momo-qr.png"
									alt="momo-qr"
									width={128}
									height={128}
								/>
							</div>
							<div className="grid text-sm gap-4 grid-cols-2 text-left">
								<span className="text-neutral-80">
									Tên ngân hàng:{" "}
								</span>
								<span>
									<b>
										{currentAdminBank?.bank_name}
									</b>
								</span>
								<span className="text-neutral-80">
									Số tài khoản
								</span>
								<span>
									<b>{currentAdminBank?.account_number}</b>
								</span>
								<span className="text-neutral-80">
									Tên chủ tài khoản
								</span>
								<span>
									<b>{currentAdminBank?.account_name}</b>
								</span>
							</div>
							<div className="text-sm font-medium mt-3 text-status-green">
								<i>(Tối thiểu 20.000 VNĐ)</i>
							</div>
						</div>
						<div className="p-9 border text-center">
							<p className="mb-4">
								<b>Bước 2 (quan trọng): </b> <br /> Nhập nội
								dung chuyển tiền
							</p>
							<div className="my-16">
								<span className="px-6 py-3 rounded-full bg-brand-primary text-white body-3-medium">
									FLC012345679
								</span>
							</div>
							<div className="xl:px-14 text-sm">
								<p className="text-neutral-80">
									Các giao dịch không nhập nội dung chuyển
									tiền, hoặc nhập không đúng nội dung theo yêu
									cầu sẽ không được cộng xu tự động.{" "}
									<span className="text-status-blue">
										Vui lòng liên hệ bộ phận CSKH để được hỗ
										trợ.
									</span>
								</p>
							</div>
						</div>
						<div className="p-9 border text-center">
							<p className="mb-4">
								<b>Trạng thái: </b> <br /> Trạng thái giao dịch
							</p>
							<div className="my-8">
								<div className="flex items-center body-4-semibold gap-1 justify-center">
									<HiClock className="text-2xl text-brand-primary" />{" "}
									Đang xử lý
								</div>
								<div className="body-5-medium text-neutral-60">
									Đang chờ xử lý từ hệ thống
								</div>
							</div>
							<div className="bg-grey text-sm font-medium text-neutral-80 p-2.5">
								Vui lòng không đóng cửa sổ này cho đến khi giao
								dịch được hoàn tất
							</div>
						</div>
					</div>
				</div>
				<div className="sm:p-8 my-8 sm:my-[unset]">
					<div className="body-4-semibold text-neutral-100 py-6">
						Gợi ý nhập số tiền nạp:
					</div>
					<div className="-mx-3">
						<RadioGroup
							value={price}
							onChange={setPrice}
							className="flex items-center flex-wrap">
							<RadioGroup.Label className="sr-only">
								Select amount to deposit
							</RadioGroup.Label>
							{priceOptions.map((option, index) => (
								<div
									className="p-3 sm:w-1/4 w-1/2 text-center"
									key={index}>
									<RadioGroup.Option
										value={option.value}
										className={({ active, checked }) =>
											`border cursor-pointer relative overflow-hidden ${checked
												? "border-brand-primary"
												: ""
											} p-4`
										}>
										{({ active, checked }) => (
											<>
												<div className="text-center">
													<div className="mb-3">
														<PriceTag
															className="justify-center"
															price={option.value}
															width={20}
															height={20}
														/>
													</div>
													<RadioGroup.Label>
														{option.label} VND
													</RadioGroup.Label>
												</div>
												{checked && (
													<>
														<div className="absolute w-10 h-10 bg-brand-primary z-10 rotate-45 origin-center translate-x-[50%] translate-y-[50%] bottom-0 right-0"></div>
														<div className="absolute bottom-0 right-0 z-20 text-white">
															<HiCheck />
														</div>
													</>
												)}
											</>
										)}
									</RadioGroup.Option>
								</div>
							))}
						</RadioGroup>
					</div>
					<div className="mt-8 flex flex-wrap items-center">
						<div className="flex items-center mb-2 sm:mb-[unset]">
							<span className="body-5-semibold text-neutral-100">
								Tổng số Bi nhận được
							</span>
							<PriceTag
								className="ml-2 text-lg"
								price={price}
								width={20}
								height={20}
							/>
						</div>
						<div className="sm:ml-auto body-5 items-center flex gap-2">
							<span>Tỉ giá quy đổi tiền mặt sang Bi: </span>
							<div className="flex">
								<PriceTag price={1} width={20} height={20} />
								<span className="font-semibold">
									{" "}
									= 1.000 VND
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-white flex">
					<div className="p-8 grow">
						<div className="body-4-semibold text-neutral-100 py-6">
							<div>Thông tin ngân hàng của bạn:</div>
						</div>
						<Formik
							initialValues={{
								sender_bank: "",
								sender_account: "",
								sender_name: "",
								sender_bank_branch: "",
								content: "",
							}}
							validationSchema={yup.object().shape({
								sender_bank: yup.string().required("Bạn phải chọn tên ngân hàng của mình"),
								sender_account: yup.string().required("Số tài khoản không được để trống!"),
								sender_bank_branch: yup.string().required("Tên chi nhánh ngân hàng không được để trống!"),
								sender_name: yup.string().required("Tên chủ tài khoản không được để trống!"),
								content: yup.string().required("Nội dung không được để trống!"),
							})
							}

							onSubmit={(
								values, error
							) => {
								
								console.log({
									amount: price,
									bank: currentAdminBankId,
									content: values.content,
									sender_name: values.sender_name,
									sender_account: values.sender_account,
									sender_bank: currentSenderBankId,
									sender_bank_branch: values.sender_bank_branch
								})
								walletApi.depositMoney({
									amount: price,
									bank: currentAdminBankId,
									content: values.content,
									sender_name: values.sender_name,
									sender_account: values.sender_account,
									sender_bank: currentSenderBankId,
									sender_bank_branch: values.sender_bank_branch
								});
							}}
							enableReinitialize>
							{({ values, errors, setFieldValue }) => {
								console.log(errors)
								return <Form>
									<div className="flex flex-col gap-4">
										<div>
											<Comboboxtext
												key="sender_bank"
												onChange={(e : string) => {
													setCurrentSenderBankId(e);
													setFieldValue("sender_bank",e)
												}}
												value={currentSenderBankId}
												name=""
												options={[
													...listBank.map((item: {
														code: string;
														name: string;
													}) => ({
														value: item.code,
														label: item.name,
													}))
												]}
											/>
										</div>
										<div>
											<label htmlFor="sender_name">
												Chủ tài khoản
											</label>
											<FormInput
												name="sender_name"
												placeholder="Chủ tài khoản"
											/>
										</div>
										<div>
											<label htmlFor="sender_account">
												Số tài khoản
											</label>
											<FormInput
												name="sender_account"
												placeholder="Số tài khoản"
											/>
										</div>
										<div>
											<label htmlFor="sender_bank_branch">
												Chi nhánh ngân hàng
											</label>
											<FormInput
												type="string"
												name="sender_bank_branch"
												placeholder="Chi nhánh ngân hàng"
											/>
										</div>
										<div>
											<label htmlFor="content">
												Nội dung chuyển khoản
											</label>
											<FormInput
												type="string"
												name="content"
												placeholder="Nội dung chuyển khoản(Thời gian + số tiền chuyển)"
											/>
										</div>

									</div>
									<div className="my-4">
										<Button type="submit" md primary>
											Xác nhận nạp tiền
										</Button>
										<div className="text-sm mt-3">
											Nhấn &quot;Xác nhận nạp&quot;, mặc định
											bạn đồng ý điều khoản{" "}
											<span className="text-brand-primary font-semibold">
												Thoả thuận mua
											</span>{" "}
											và{" "}
											<span className="text-brand-primary font-semibold">
												Chính sách bảo mật của Freelancer 
											</span>
										</div>
									</div>
								</Form>
							}
							}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}
Deposit.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
