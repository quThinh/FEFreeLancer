import {Form, Formik} from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "layouts/AuthLayout";
import Button from "components/Button";
import FormGroup from "components/FormGroup";
import FormNumberBox from "components/FormNumberBox";

export default function Confirm() {
	return (
		<AuthLayout>
			<Head>
				<title> Đổi mật khẩu </title>
				<meta name="robot" content="noindex,nofollow" />
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
							Đổi mật khẩu
						</p>
						<p className="text-sm mt-2 text-neutral-60 font-normal">
							Nhập mã chúng tôi gửi đến số điện thoại có đuôi (
							<span className="font-bold">{"***0123"}</span>)
						</p>
					</div>
					<Formik
						initialValues={{
							code1: 1,
							code2: 2,
							code3: 3,
							code4: 4,
						}}
						onSubmit={(values, { setSubmitting }) => {
							console.log(values);
							setSubmitting(false);
						}}
						enableReinitialize >
						{(props) => (
							<Form className="my-9">
								<FormGroup className="flex gap-6">
									<FormNumberBox
										name="code1"
										className="shrink-0"
									/>
									<FormNumberBox
										name="code2"
										className="shrink-0"
									/>
									<FormNumberBox
										name="code3"
										className="shrink-0"
									/>
									<FormNumberBox
										name="code4"
										className="shrink-0"
									/>
								</FormGroup>
								<FormGroup>
									<Link href="/user/forget-password">
										<a className="font-semibold text-sm text-brand-primary">
											Nhận mã xác thực email hoặc số điện
											thoại khác
										</a>
									</Link>
								</FormGroup>
								<FormGroup>
									<Button
										type="submit"
										md
										primary
										className="w-full">
										Tiếp tục
									</Button>
								</FormGroup>
							</Form>
						)}
					</Formik>
				</div>
				<div className="p-4 text-sm bg-grey text-neutral-80">
					<div className="flex items-center">
						<div>
							<p> Bạn không nhận được mã xác thực?</p>
							<p>
								Vui lòng đợi 30s trước khi yêu cầu gửi lại mã.
							</p>
						</div>
						<span
							className="bg-white font-bold text-neutral-100 p-3 ml-auto"
							role="button">
							{" "}
							Gửi lại mã
						</span>
					</div>
				</div>
			</main>
		</AuthLayout>
	);
}
