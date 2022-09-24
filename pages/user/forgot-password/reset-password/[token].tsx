import userApi from "@/api/userApi";
import Button from "@/components/Button";
import FormGroup from "@/components/FormGroup";
import FormInputText from "@/components/FormInput";
import AuthLayout from "@/layouts/AuthLayout";
import { Form, Formik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import * as Yup from "yup";

export default function ResetPassword() {
	const router = useRouter();
	const { token } = router.query;
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
							Vui lòng nhập đủ thông tin dưới đây để đổi mật khẩu
						</p>
					</div>
					<Formik
						initialValues={{
							password: "",
							confirm_password: "",
						}}
						validationSchema={Yup.object().shape({
							password: Yup.string()
								.min(6, "Mật khẩu phải có ít nhất 6 ký tự")
								.required("Vui lòng nhập mật khẩu"),
							confirm_password: Yup.string()
								.oneOf(
									[Yup.ref("password"), null],
									"Mật khẩu không khớp"
								)
								.required("Vui lòng nhập lại mật khẩu"),
						})}
						onSubmit={(values, { setSubmitting }) => {
							userApi.resetPassword(
								{
									password: values.password,
									confirm_password: values.confirm_password,
									token: String(token),
								},
								() => {
									router.push("/auth/login");
								}
							);
							setSubmitting(false);
						}}>
						{(props) => (
							<Form className="my-9">
								<FormGroup>
									<label htmlFor="email" className="block">
										Mật khẩu mới
									</label>
									<FormInputText
										className="w-full"
										type="password"
										name="password"
										placeholder="*****"
									/>
								</FormGroup>
								<FormGroup>
									<label htmlFor="email" className="block">
										Xác nhận mật khẩu mới
									</label>
									<FormInputText
										className="w-full"
										type="password"
										name="confirm_password"
										placeholder="******"
									/>
								</FormGroup>
								<FormGroup>
									<Button
										type="submit"
										md
										primary
										className="w-full">
										{" "}
										Thay đổi mật khẩu{" "}
									</Button>
								</FormGroup>
							</Form>
						)}
					</Formik>
				</div>
			</main>
		</AuthLayout>
	);
}
