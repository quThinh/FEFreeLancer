import { FaCheck, FaHome } from "react-icons/fa";
import Link from "next/link";
import AuthLayout from "../../layouts/AuthLayout";

export default function verified() {
	return (
		<AuthLayout>
			<div className="w-[400px] p-8 pb-20 bg-white items-center flex flex-col gap-4">
				<span className="w-32 h-32 bg-status-green/50 rounded-[50%] flex justify-center items-center text-2xl text-status-green">
					<FaCheck />
				</span>
				<p className="text-[2rem] text-neutral-100 font-bold">Hoàn thành</p>
				<p className="text-lg text-neutral-80 font-medium">Đổi mật khẩu thành công</p>
				<Link href="/">
					<a className="btn btn-md btn-primary w-full">
						<FaHome /> Trang chủ
					</a>
				</Link>
			</div>
		</AuthLayout>
	);
}
