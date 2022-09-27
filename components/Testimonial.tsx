import Image from "next/image";
import { VscQuote } from "react-icons/vsc";

export default function Testimonial() {
	return (
		<div className="flex flex-col lg:flex-row pb-20 gap-4 lg:gap-0">
			<div className="lg:w-4/12 w-full">
				<div>
					<VscQuote className="lg:w-32 lg:h-64 w-16 h-32 text-white outline stroke-1 stroke-black" />
					<div className="font-bold lg:text-[52px] text-[36px]">
						Nền tảng kết nối việc làm 
					</div>
				</div>
			</div>
			<div className="lg:w-7/12 w-full self-end ml-auto">
				<div className="text-base text-neutral-100">
					Với nền tảng lần đầu tiên xuất hiện tại Việt Nam này, nó đã
					giúp tôi có thêm những công việc phù hợp để cải thiện chất
					lượng cuộc sống cũng như giúp đỡ những người cần sự trợ
					giúp, điều này thật tuyệt vời, tôi rất vui khi được giúp đỡ
					họ.
				</div>
				<div className="flex items-center gap-2.5 mt-6">
					<Image
						src="/icons/default-avatar.svg"
						alt="avatar"
						width="64px"
						height="64px"
						objectFit="contain"
					/>
					<div>
						<div className="font-semibold text-brand-primary text-[20px]">Trương Quang Thịnh</div>
						<div className="text-[15px] text-neutral-80">
							Design
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
