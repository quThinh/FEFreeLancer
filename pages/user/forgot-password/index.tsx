import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "@/layouts/AuthLayout";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import FormInputText from "@/components/FormInput";
import * as Yup from "yup";
import userApi from "@/api/userApi";

export default function ForgetPassword() {
	const router = useRouter();
	return (
		<AuthLayout>
			<Head>
				<title> Lấy lại mật khẩu </title>
			</Head>
			<main className="bg-white pt-6">
				<div className="w-[9.375rem] ml-6">
					<Link href="/">
						<a>
							<Image
								src="/logo/logo48.svg"
								alt="niubi.vn"
								layout="responsive"
								width="100%"
								height="48px"
								objectFit="contain"
							/>
						</a>
					</Link>
				</div>
				<div className="p-6">
					<div>
						<p className="text-[32px] font-bold text-neutral-100">
							Lấy lại mật khẩu
						</p>
						<p className="text-sm mt-2 text-neutral-60 font-normal">
							Vui lòng nhập đủ thông tin dưới đây để lấy lại mật
							khẩu
						</p>
					</div>
					<Formik
						initialValues={{
							email: "",
						}}
						validationSchema={Yup.object().shape({
							email: Yup.string()
								.email("Email không hợp lệ")
								.required("Email không được để trống"),
						})}
						onSubmit={async (values, { setSubmitting }) => {
							await userApi.forgetPassword(values.email, router);
							setSubmitting(false);
						}}>
						{(props) => (
							<Form className="my-9">
								<FormGroup>
									<label htmlFor="email" className="block">
										Email
									</label>
									<FormInputText
										className="w-full"
										type="email"
										name="email"
										placeholder="----@----.---"
									/>
								</FormGroup>
								<FormGroup>
									<Button
										type="submit"
										md
										primary
										className="w-full">
										{props.isSubmitting
											? "Đang xử lý..."
											: "Tiếp tục"}
									</Button>
								</FormGroup>
								<div className="text-center text-sm">
									<span>Trở về trang </span>
									<Link href="/auth/login">
										<a className="text-brand-primary font-semibold">
											Đăng nhập{" "}
										</a>
									</Link>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</main>
		</AuthLayout>
	);
}
