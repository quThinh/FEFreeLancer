import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import userApi from "@/api/userApi";
import { toast } from "react-toastify";

export default function VerifyEmail() {
	const router = useRouter();
	const { token } = router.query;
	const [isSuccess, setIsSuccess] = useState(false);
	useEffect(() => {
		if (token) {
			userApi
				.verifyEmail(String(token))
				.then(() => {
					setIsSuccess(true);
				})
				.catch((error) => {
					toast.error(error.response.data.message);
				});
		}
	}, [token]);
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
							Xác nhận email thành công, vui lòng quay trở lại
							trang đăng nhập.{" "}
						</p>
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
				<Link href="/auth/login">
					<a className="btn btn-md btn-primary w-full">Đăng nhập</a>
				</Link>
			</div>
		</AuthLayout>
	);
}
