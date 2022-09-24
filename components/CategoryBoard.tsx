import Image from "next/image";
import CategoryIcon from "../public/icons/Category.svg";

interface ICategoryBoardProps {}
function CategoryBoard() {
	return (
		<div className="w-[655px] relative">
			<div className="border-b-[18px] border-t-transparent border-r-[18px] border-b-white border-l-[18px] border-r-transparent border-l-transparent w-0 h-0 -top-[16px] left-[25px] absolute"></div>
			<div className="flex bg-white">
				<div className="flex-50 max-w-[50%]">
					<div className="text-left font-[500] text-neutral-80 px-[16px] py-[13px] border-b">
						Dịch vụ NiuBi cung cấp cho bạn
					</div>
					<div className="p-[16px]">
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="px-[16px] font-[500] text-neutral-80 text-left py-[13px] border-b">
						Các bài đọc nổi bật
					</div>
					<div className="p-[16px] border-l">
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
						<div className="flex p-[8px]">
							<Image
								src={CategoryIcon}
								alt="imag"
								className="w-[40px] h-[40px] mr-4"
							/>
							<div className="text-left">
								<p className="font-[600] text-neutral-100">
									Đăng tin
								</p>
								<p className="text-neutral-80 ">
									Để Frelancer sẽ chủ động liên hệ với bạn
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default CategoryBoard;
