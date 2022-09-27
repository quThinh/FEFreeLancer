import authApi from "@/api/authApi";
import FormInputTextWithPostfix from "@/components/FormInputTextWithPostfix";
import AuthUtils from "@/utils/authUtils";
import {Field, Form, Formik} from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router, {useRouter} from "next/router";
import {useEffect, useState} from "react";
import FacebookLogin from "react-facebook-login";
import {HiEye} from "react-icons/hi";
import * as Yup from "yup";
import Button from "../../components/Button";
import FormGroup from "../../components/FormGroup";
import FormInputText from "../../components/FormInput";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
	useEffect(() => {
		if (AuthUtils.isLoggedIn()) {
			Router.push("/");
		}
	}, []);
	const router = useRouter();
	const { returnUrl } = router.query;
	const [passwordVisible, setPasswordVisible] = useState(false);
	return (
		<>
			<AuthLayout>
				<Head>
					<title>Đăng nhập</title>
				</Head>
				<main className="bg-white p-6">
					<div>
						<div className="w-[9.375rem]">
							<Link href="/">
								<a className="headline-4">
								Freelancer
								</a>
							</Link>
						</div>
						<div>
							<div className="text-sm mb-4">
								<span>Bạn chưa có tài khoản? </span>
								<Link href="/user/register">
									<a className="text-brand-primary font-semibold">
										Đăng kí ngay
									</a>
								</Link>
							</div>
							<div>
								<p className="text-[32px] font-bold text-neutral-100">
									Chào mừng bạn đến với Freelancer 
								</p>
								<p className="text-sm mt-2 text-neutral-60 font-normal">
									Vui lòng đăng nhập để sử dụng dịch vụ
								</p>
							</div>
							<Formik
								initialValues={{
									email: "",
									password: "",
									remember: false,
								}}
								validationSchema={() =>
									Yup.object().shape({
										email: Yup.string()
											.email("Email không hợp lệ")
											.required(
												"Email không được để trống"
											),
										password: Yup.string()
											.required(
												"Mật khẩu không được để trống"
											)
											.min(
												6,
												"Mật khẩu phải có ít nhất 6 ký tự"
											),
									})
								}
								onSubmit={async (values, { setSubmitting }) => {
									await authApi
										.login({
											...values,
											returnUrl: returnUrl
												? String(returnUrl)
												: "",
										})
										.catch((e) => {
											console.log(e);
										});
									setSubmitting(false);
								}}>
								{(props) => (
									<Form className="my-9">
										<FormGroup>
											<label
												htmlFor="email"
												className="block">
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
											<label
												htmlFor="password"
												className="block">
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
												placeholder="*******"
											/>
										</FormGroup>
										<FormGroup className="flex gap-3 xs:items-center flex-col xs:flex-row flex-wrap">
											<label
												htmlFor="remember"
												className="text-sm cursor-pointer inline-flex gap-4 items-center">
												<Field
													className="checked:bg-brand-primary"
													type="checkbox"
													id="remember"
													name="remember"
												/>
												Ghi nhớ đăng nhập
											</label>
											<div className="text-sm xs:ml-auto">
												<span>Quên mật khẩu? </span>
												<Link href="/user/forgot-password">
													<a className="font-semibold text-brand-primary">
														Lấy lại mật khẩu
													</a>
												</Link>
											</div>
										</FormGroup>
										<FormGroup>
											<Button
												type="submit"
												md
												className={`w-full text-white ${
													props.isSubmitting
														? "bg-neutral-20"
														: "bg-brand-primary"
												}`}>
												{props.isSubmitting
													? "Đang xử lý..."
													: "Đăng nhập"}
											</Button>
										</FormGroup>
										<FormGroup>
											<fieldset className="border-0 border-t">
												<legend className="mx-auto">
													Hoặc
												</legend>
											</fieldset>
										</FormGroup>
										<FormGroup>
											<button
												type="button"
												className="flex gap-3 py-4 border bg-grey-light items-center justify-center w-full text-xs font-medium">
												<Image
													src="/icons/google-logo.svg"
													alt="Google"
													width="16"
													height="16"
												/>
												Đăng nhập bằng Google
											</button>
											{/* <GoogleLogin
												clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
												buttonText="Login"
												onSuccess={responseGoogle}
												onFailure={responseGoogle}
												cookiePolicy={
													"single_host_origin"
												}
											/> */}
											<FacebookLogin
												icon={
													<Image
														src="/icons/facebook-logo.svg"
														alt="Facebook"
														width="16"
														height="16"
													/>
												}
												cssClass="flex gap-3 py-4 border mt-1 bg-grey-light items-center justify-center w-full text-xs font-medium"
												onFailure={(err) => {
													console.log(err);
												}}
												textButton="Đăng nhập bằng Facebook"
												appId={
													process.env
														.NEXT_PUBLIC_APP_ID as string
												}
												autoLoad={false}
												fields="name,email,picture"
												// onClick={componentClicked}
												callback={(res) => {
													console.log(res);
												}}
											/>
										</FormGroup>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</main>
			</AuthLayout>
		</>
	);
}
