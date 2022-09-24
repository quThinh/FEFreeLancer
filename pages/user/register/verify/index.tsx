import { FaCheck, FaHome } from "react-icons/fa";
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Head from "next/head";

export default function Verify() {
	return (
		<AuthLayout>
			<Head>
				<title>Đăng kí thành công</title>
			</Head>
			<div className="w-[400px] p-8 pb-20 bg-white items-center flex flex-col gap-4">
				<span className="w-32 h-32 bg-status-green/50 rounded-[50%] flex justify-center items-center text-2xl text-status-green">
					<FaCheck />
				</span>
				<p className="text-[2rem] text-neutral-100 font-bold">Thành công</p>
				<p className="text-base text-center text-neutral-80 font-medium"> Đăng kí thành công, kiểm tra email để xác nhận tài khoản trước khi đăng nhập.</p>
				<Link href="/auth/login">
					<a className="btn btn-md btn-primary w-full">
						 Đăng nhập 
					</a>
				</Link>
			</div>
		</AuthLayout>
	);
}
