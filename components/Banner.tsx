import { useRouter } from "next/router";
import Button from "./Button";

interface IBannerProps {}

export default function Banner(props: IBannerProps) {
	const router = useRouter();

	return (
		<div className="home-banner overflow-hidden" data-testid="home-page">
			<div className="h-full container">
				<div className="flex flex-col justify-center xs:gap-8 gap-4 h-full">
					<p
						className="
					w-full lg:w-1/3  
					font-semibold text-white lg:text-7xl 
					xs:text-6xl text-4xl
				">
						Nền tảng hỗ trợ dịch vụ & tìm Freelancer
					</p>
					<p
						className="
					md:mt-10 lg:mt-8
					text-lg
					text-white font-medium w-full lg:w-1/6 mt-6
				">
						Nền tảng tuyệt vời cho người tìm việc muốn tìm kiếm
						những đỉnh cao nghề nghiệp mới và đam mê khởi nghiệp.
					</p>
					<Button
						onClick={() => router.push("/auth/login")}
						secondary
						lg
						className="
					 rounded-[2.5rem] 
					 w-full lg:w-1/3
				">
						Dùng thử miễn phí
					</Button>
				</div>
			</div>
		</div>
	);
}
