import UserLayout from "@/layouts/UserLayout";
import { ReactElement, useState } from "react";
import { Formik, Form } from "formik";
import FormInputText from "@/components/FormInput";
import ticketApi from "@/api/ticketApi";
import Head from "next/head";
export default function Support() {
	const types = [
		{
			name: "",
			title: "chọn chủ đề",
		},
		{
			name: "order",
			title: "đơn hàng",
		},
		{
			name: "transaction",
			title: "giao dịch",
		},
		{
			name: "other",
			title: "khác",
		},
	];
	const [type, setType] = useState({
		name: "",
		title: "chọn chủ đề",
	});

	return (
		<div className="bg-white">
			<Head>
				<title>Hỗ trợ</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>

			<div className="body-1-semibold text-neutral-100 sm:px-4 py-8 border-b">
				Hỗ trợ cho người dùng
			</div>
			<div className="sm:p-8 mt-8 sm:mt-[unset] border-b">
				<Formik
					initialValues={
						{
							content: "",
							object: "",
							title: "",
							type: "order",
						} as {
							content: string;
							object: string;
							title: string;
							type: "order" | "transaction" | "other";
						}
					}
					onSubmit={(values, {resetForm, setSubmitting }) => {
						ticketApi.createTicket({
							content: values.content,
							object: values.object,
							title: values.title,
							type: values.type || "other",
						});
						resetForm();
						setSubmitting(false);
					}}>
					{(props) => (
						<Form>
							<select
								name="type"
								id="type"
								className="py-2 px-3 w-full border border-[#d6ddeb] text-[#333] mb-5 outline-none"
								onChange={(e) => {
									props.setFieldValue("type", e.target.value);
									setType(
										types.find(
											(type) =>
												type.name === e.target.value
										)!
									);
								}}>
								<option value="">Chọn chủ đề</option>
								<option value="order">Đơn hàng</option>
								<option value="transaction">Giao dịch</option>
								<option value="other">Khác</option>
							</select>
							{type.name && (
								<FormInputText
									type="text"
									name="object"
									placeholder={`Mã ${type.title}`}
									className="py-2 px-3 w-full border mb-5 outline-none text-black placeholder:text-[#999]"
								/>
							)}

							<FormInputText
								name="title"
								type="text"
								placeholder="Tiêu đề"
								className="py-2 px-3 w-full border mb-5 outline-none text-black placeholder:text-[#999]"
							/>
							<textarea
								name="content"
								id="content"
								onChange={(e) =>
									props.setFieldValue(
										"content",
										e.target.value
									)
								}
								placeholder="Thông tin chi tiết yêu cầu hỗ trợ"
								className="py-2 px-3 w-full border border-[#d6ddeb] mb-5 outline-none placeholder:text-[#999]"></textarea>
							<button
								type="submit"
								value="submit"
								className="text-base w-full sm:w-[unset] px-6 py-3 sm:py-2 font-semibold text-center bg-brand-primary text-white cursor-pointer outline-none">
								Gửi
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
Support.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
