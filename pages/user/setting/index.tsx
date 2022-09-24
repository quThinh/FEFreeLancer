import userApi from "@/api/userApi";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import UserLayout from "@/layouts/UserLayout";
import { Form, Formik } from "formik";
import Head from "next/head";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineX } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function Setting() {
	const { user, isLoading, isError } = userApi.useUser();
	const [userStatus, setUserStatus] = useState(user?.status);
	return (
		<div>
			<Head>
				<title>Cài đặt tài khoản</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			{userStatus == 0 ? <></> : <div className="p-4 flex items-center bg-grey gap-2 flex-wrap sm:flex-nowrap">
				<MdVerifiedUser className="text-neutral-80 text-3xl order-1 sm:order-[unset]" />
				<div className="order-3 sm:order-[unset]">
					<div className="body-3-semibold text-neutral-100 mb-2 sm:mb-[unset]">
						Tài khoản của bạn chưa được xác minh?
						<Link href="/verify">
							<a className="ml-2 underline text-status-green">
								Xác minh tài khoản ngay
							</a>
						</Link>
					</div>
					<div className="body-4-medium text-neutral-60">
						Hãy xác minh tài khoản để thu hút được nhiều khách hàng
						hơn nhé !
					</div>
				</div>
			</div>}
			<div className="py-4 bg-white sm:px-8 body-1-semibold border-b">
				Cài đặt tài khoản
			</div>
			<div className="sm:p-8 bg-white">
				<div className="flex gap-8 flex-wrap sm:flex-nowrap mb-8 sm:mb-[unset]">
					<div className="sm:w-1/4">
						<div className="font-semibold mb-2 sm:mb-[unset]">
							Cập nhật địa chỉ email
						</div>
						<div className="text-neutral-60 pr-10">
							Cập nhật địa chỉ email của bạn để đảm bảo rằng tài
							khoản của bạn được an toàn.
						</div>
					</div>
					<div className="grow sm:max-w-[60%]">
						<Formik
							initialValues={{
								email: "",
							}}
							onSubmit={(values, { setSubmitting }) => {
								userApi.changeEmail(values.email);
								setSubmitting(false);
							}}>
							<Form className="flex flex-col gap-4">
								<div>
									<div className="flex items-center gap-2">
										<span className="body-4-medium text-neutral-100">
											{user?.email}
										</span>
										{user?.status === 0 ? <HiOutlineExclamationCircle className="text-base text-status-red"/> : <HiOutlineCheckCircle className="text-base text-status-green" />}
									</div>
									{user?.status === 0 ? <div className="text-xs text-status-red">
										{" "}
										Địa chỉ email của bạn chưa được xác minh.
									</div> : <div className="text-xs text-status-green">
										{" "}
										Địa chỉ email của bạn đã được xác minh.
									</div>}
								</div>
								<div>
									<label htmlFor="email">
										{" "}
										Cập nhật địa chỉ email
									</label>
									<FormInput
										name="email"
										placeholder="Nhập địa chỉ email của bạn"
									/>
								</div>
								<div className="w-full sm:w-[unset]">
									<Button
										className="w-full sm:w-[unset]"
										md
										primary>
										Cập nhật email
									</Button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
			<div className="sm:p-8 mb-8 sm:mb-[unset] bg-white">
				<div className="flex gap-8 flex-wrap sm:flex-nowrap">
					<div className="sm:w-1/4">
						<div className="font-semibold">Thay đổi mật khẩu</div>
						<div className="text-neutral-60 pr-10">
							Quản lý mật khẩu của bạn để đảm bảo mật khẩu của bạn
							được an toàn.
						</div>
					</div>
					<div className="grow sm:max-w-[60%]">
						<Formik
							initialValues={{
								old_password: "",
								new_password: "",
								re_password: "",
							}}
							validationSchema={Yup.object().shape({
								old_password: Yup.string()
									.required("Mật khẩu cũ không được để trống")
									.min(
										6,
										"Mật khẩu cũ phải có ít nhất 6 ký tự"
									),
								new_password: Yup.string()
									.required(
										"Mật khẩu mới không được để trống"
									)
									.min(
										6,
										"Mật khẩu mới phải có ít nhất 6 ký tự"
									),
								re_password: Yup.string()
									.required("Nhập lại mật khẩu mới")
									.oneOf(
										[Yup.ref("new_password"), null],
										"Mật khẩu mới và nhập lại mật khẩu không khớp"
									),
							})}
							onSubmit={(values, { setSubmitting }) => {
								userApi.changePassword(
									values.old_password,
									values.new_password
								).then(() => {
									toast.success("Thay đổi mật khẩu thành công");
								}).catch(() => {
									toast.error("Thay đổi mật khẩu thất bại");
								});
								setSubmitting(false);
							}}>
							<Form className="flex flex-col gap-4">
								<div>
									<label htmlFor="old_password">
										{" "}
										Mật khẩu cũ
									</label>
									<FormInput
										type="password"
										name="old_password"
										placeholder="Nhập mật khẩu cũ của bạn"
									/>
								</div>
								<div>
									<label htmlFor="new_password">
										{" "}
										Mật khẩu mới
									</label>
									<FormInput
										type="password"
										name="new_password"
										placeholder="Nhập mật khẩu mới của bạn"
									/>
								</div>
								<div>
									<label htmlFor="re_password">
										{" "}
										Nhập lại mật khẩu mới
									</label>
									<FormInput
										type="password"
										name="re_password"
										placeholder=" Nhập lại mật khẩu mới"
									/>
								</div>
								<div className="w-full sm:w-[unset]">
									<Button
										className="w-full sm:w-[unset]"
										md
										primary>
										Thay đổi mật khẩu
									</Button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
}

Setting.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
