import walletApi from "@/api/walletApi";
import Button from "@/components/Button";
import Comboboxtext from "@/components/Comboboxtext";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import PriceTag from "@/components/PriceTag";
import UserLayout from "@/layouts/UserLayout";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { FaCalendarTimes } from "react-icons/fa";

export default function WithDraw() {
	const { myWallet } = walletApi.useMyWallet();
	const router = useRouter();
	const { listBank = [], isError } = walletApi.uselistBank();

	const [currentBankId, setCurrentBankId] = useState("")
	return (
		<div>
			<Head>
				<title>Rút tiền</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className="p-4 flex items-center bg-grey gap-2">
				<FaCalendarTimes className="text-red text-3xl" />
				<div>
					<div className="body-3-semibold text-neutral-100">
						Lưu ý về thời gian rút tiền
					</div>
					<div className="body-4-medium text-neutral-60">
						Freelancer xử lý các lệnh rút tiền vào từ 8:00 đến 17:00 ngày
						thứ 3 và thứ 4 hàng tuần
					</div>
				</div>
			</div>
			<div className="py-4 bg-white sm:px-8 body-1-semibold border-b">
				Rút tiền về tài khoản
			</div>
			<div className="bg-white flex flex-wrap">
				<div className="mt-8 sm:mt-[unset] sm:p-8 sm:max-w-[50%] grow">
					<div className="body-4-semibold mb-8 flex items-center">
						<div>Số dư Bi của tài khoản</div>
						<PriceTag className="ml-2" price={myWallet?.balance} />
					</div>
					<Formik
						initialValues={{
							bank: "",
							amount: "",
							accountNumber: "",
							ownerName: "",
						}}
						onSubmit={(values) => {
							walletApi.withdrawMoney({
								amount: Number(values.amount),
								bank: values.bank,
								ownerName: values.ownerName,
								accountNumber: values.accountNumber,
							});
						}}
						enableReinitialize>
						{({ values, setFieldValue }) => (
							<Form>
								<div className="flex flex-col gap-4">
									<div>
										<Comboboxtext
											onChange={(e : string) => {
												setCurrentBankId(e)
												setFieldValue("bank",e)
											}}
											value={currentBankId}
											name="bank"
											options={[...listBank.map((item: {
												code: string;
												name: string
											}) => ({
												label: item.name,
												value: item.code
											}))]} />
									</div>
									<div>
										<label htmlFor="ownerName">
											Chủ tài khoản
										</label>
										<FormInput
											name="ownerName"
											placeholder="Chủ tài khoản"
										/>
									</div>
									<div>
										<label htmlFor="accountNumber">
											Số tài khoản
										</label>
										<FormInput
											name="accountNumber"
											placeholder="Số tài khoản"
										/>
									</div>
									<div>
										<label htmlFor="amount">
											Số{" "}
											<span className="text-brand-primary font-bold">
												Bi
											</span>{" "}
											muốn rút
										</label>
										<FormInput
											// onkeydown="return event.keyCode !== 69 && event.keyCode !== 189"
											min="0"
											type="number"
											name="amount"
											placeholder="Nhập số Bi cần rút"
										/>
									</div>
									<div className="flex flex-wrap xl:flex-nowrap items-center justify-between">
										<div className="flex gap-2 items-center font-medium">
											Tổng số tiền nhận được:{" "}
											{Number(
												Number(values.amount) * 950
											).toLocaleString("vi-VI", {
												style: "currency",
												currency: "VND",
											})}
										</div>
										<div className="text-neutral-80">
											Phí rút tiền:{" "}
											<span className="text-neutral-100 font-medium body-5-semimbold text-brand-primary">
												5%
											</span>
										</div>
									</div>
									<div>
										<Button type="submit" md primary block>
											Rút tiền
										</Button>
										<Button
											type="button"
											md
											onClick={() =>
												router.push(
													`${process.env.NEXT_PUBLIC_URL}/user/support`
												)
											}
											secondary
											block
											className="mt-3 bg-slate-100">
											{" "}
											Liên hệ hỗ trợ
										</Button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<div className="mt-8 sm:mt-[unset] sm:p-8 sm:max-w-[50%] grow">
					<div className="body-4-semibold mb-8 flex items-center">
						Bảng phí rút tiền
					</div>
				</div>
			</div>
		</div>
	);
}

WithDraw.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
