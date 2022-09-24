import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import userApi from "@/api/userApi";

export default function VerifyEmail() {
	const router = useRouter();
	const { token } = router.query;
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (token) {
			setIsLoading(true);
			userApi.forgetPasswordVerify(String(token), () => {
				setIsSuccess(true);
				setIsLoading(false);
				router.push(`/user/forgot-password/reset-password/${token}`);
			});
		}
	}, [token, router]);
	if (isLoading)
		return (
			<div className="text-center">
				<svg
					className="animate-spin h-12 w-12"
					viewBox="0 0 66 66"></svg>
				<h1>Loading...</h1>
			</div>
		);
	return (
		<AuthLayout>
			<Head>
				<title>Xác nhận email</title>
			</Head>
			<div className="w-[400px] p-8 pb-20 bg-white items-center flex flex-col gap-4">
				{isSuccess ? (
					<>
						<span className="w-32 h-32 bg-status-green/50 rounded-[50%] flex justify-center items-center text-2xl text-status-green">
							<FaCheck />
						</span>
						<p className="text-[2rem] text-neutral-100 font-bold">
							Thành công
						</p>
						<p className="text-base text-center text-neutral-80 font-medium">
							{" "}
							Xác nhận email thành công, sẵn sàng thay đổi mật
							khẩu.{" "}
						</p>
						<Link href={`/forgot-password/reset-password/${token}`}>
							<a className="btn btn-md btn-primary w-full">
								Đổi mật khẩu
							</a>
						</Link>
					</>
				) : (
					<>
						<span className="w-32 h-32 bg-status-red/50 rounded-[50%] flex justify-center items-center text-2xl text-status-red">
							<HiX />
						</span>
						<p className="text-[2rem] text-neutral-100 font-bold">
							Thất bại
						</p>
						<p className="text-base text-center text-neutral-80 font-medium">
							{" "}
							Xác nhận email thất bại, vui lòng kiểm tra lại
							email.{" "}
						</p>
					</>
				)}
			</div>
		</AuthLayout>
	);
}
