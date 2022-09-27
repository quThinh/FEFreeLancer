import userApi from "@/api/userApi";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import FormInputText from "@/components/FormInput";
import FormInputTextWithPostfix from "@/components/FormInputTextWithPostfix";
import AuthLayout from "@/layouts/AuthLayout";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiEye } from "react-icons/hi";
import * as Yup from "yup";

function validateEmail(value: string): string | undefined {
	if (value.length < 6) {
		return "Vui lòng nhập ít nhất 6 ký tự";
	} else if (value.length > 50) {
		return "Vui lòng nhập nhiều nhất 50 ký tự";
	}
	if (
		!value
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return "Vui lòng nhập đúng định dạng email";
	}
	return undefined;
}

function validatePhone(value: string): string | undefined {
	if (value.length < 10) {
		return "Vui lòng nhập ít nhất 10 ký tự";
	} else if (!value.toLowerCase().match(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g)) {
		return "Vui lòng nhập đúng định dạng số điện thoại";
	}
	return undefined;
}

export default function Register() {
	const router = useRouter();
	const [passwordVisible, setPasswordVisible] = useState(false);

	return (
		<AuthLayout>
			<Head>
				<title>Đăng kí</title>
			</Head>
			<main className="bg-white pt-6">
				<div className="w-[9.375rem] ml-6">
					<Link href="/">
						<a className="headline-4">
						Freelancer
						</a>
					</Link>
				</div>
				<div className="p-6">
					<div>
						<p className="text-[32px] font-bold text-neutral-100">
							Chào mừng bạn đến với Freelancer 
						</p>
						<p className="text-sm mt-2 text-neutral-60 font-normal">
							Vui lòng đăng kí theo mẫu dưới đây để sử dụng dịch
							vụ
						</p>
					</div>
					<div className="text-sm mb-4">
						<span>Bạn đã có tài khoản? </span>
						<Link href="/auth/login">
							<a className="text-brand-primary font-semibold">
								Đăng nhập ngay
							</a>
						</Link>
					</div>
					<Formik
						initialValues={{
							email: "",
							firstname: "",
							lastname: "",
							password: "",
							invitation: "",
							phone: "",
							notification: false,
						}}
						validationSchema={() =>
							Yup.object().shape({
								firstname: Yup.string()
									.required("Họ không được để trống")
									.min(2, "Họ phải có ít nhất 2 ký tự")
									.max(50, "Họ không được vượt quá 50 ký tự"),
								lastname: Yup.string()
									.required("Tên không được để trống")
									.max(
										50,
										"Tên không được vượt quá 50 ký tự"
									),
								password: Yup.string()
									.required("Mật khẩu không được để trống")
									.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
									.max(
										50,
										"Mật khẩu không được vượt quá 50 ký tự"
									),
								invitation: Yup.string(),
							})
						}
						onSubmit={async (values, { setSubmitting }) => {
							await userApi.register({
								email: values.email,
								fullname: `${values.firstname} ${values.lastname}`,
								password: values.password,
								phone: values.phone,
								router,
							});
							setSubmitting(false);
						}}>
						{({ isSubmitting }) => (
							<Form className="my-9">
								<FormGroup>
									<label htmlFor="email" className="block">
										Email
									</label>
									<FormInputText
										className="w-full"
										type="text"
										name="email"
										validate={validateEmail}
										placeholder="Nhập email"
									/>
								</FormGroup>
								<FormGroup>
									<label htmlFor="email" className="block">
										Số điện thoại
									</label>
									<FormInputText
										className="w-full"
										type="text"
										name="phone"
										validate={validatePhone}
										placeholder="Nhập số điện thoại"
									/>
								</FormGroup>
								<FormGroup className="flex items-start gap-6">
									<div className="grow">
										<label
											htmlFor="firstname"
											className="block">
											Họ
										</label>
										<FormInputText
											className="w-full"
											type="text"
											name="firstname"
											placeholder="Nguyễn"
										/>
									</div>
									<div className="grow">
										<label
											htmlFor="lastname"
											className="block">
											Tên
										</label>
										<FormInputText
											className="w-full"
											type="text"
											name="lastname"
											placeholder="Văn A"
										/>
									</div>
								</FormGroup>
								<FormGroup>
									<label htmlFor="password" className="block">
										Mật khẩu
									</label>
									<FormInputTextWithPostfix
										icon={
											<HiEye
												className="cursor-pointer text-neutral-60"
												onClick={() => {
													setPasswordVisible(
														!passwordVisible
													);
												}}
											/>
										}
										className="w-full"
										type={`${
											passwordVisible
												? "text"
												: "password"
										}`}
										name="password"
										placeholder="******"
									/>
								</FormGroup>
								<FormGroup>
									<label
										htmlFor="invitation"
										className="block">
										Mã giới thiệu
									</label>
									<FormInputText
										className="w-full"
										type="text"
										name="invitation"
										placeholder=" Nhập mã giới thiệu "
									/>
								</FormGroup>
								<FormGroup className="flex items-center">
									<label
										htmlFor="notification"
										className="flex items-center gap-4">
										<Field
											id="notification"
											type="checkbox"
											name="notification"
										/>
										Đăng kí nhận thông báo
									</label>
								</FormGroup>
								<FormGroup>
									<Button
										type="submit"
										md
										className={`w-full ${
											isSubmitting
												? "bg-neutral-20 text-brand-primary"
												: "bg-brand-primary text-white"
										}`}>
										Đăng kí
									</Button>
								</FormGroup>
								<div className="text-center text-sm text-neutral-60">
									<span>
										Bằng cách nhấn tiếp tục, bạn đồng ý với{" "}
										<Link href="/">
											<a className="text-brand-primary font-semibold">
												Điều khoản sử dụng
											</a>
										</Link>{" "}
										và{" "}
										<Link href="/">
											<a className="text-brand-primary font-semibold">
												Chính sách bảo mật
											</a>
										</Link>
									</span>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</main>
		</AuthLayout>
	);
}
