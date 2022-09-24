import Button from "@/components/Button";
import Image from "next/image";
import { FaAngleLeft, FaPhoneAlt } from "react-icons/fa";
import { ImQrcode } from "react-icons/im"

export default function Transaction() {

	return (
		<div className="fixed bg-grey flex w-full h-full items-center justify-center">
			<div className="gap-4 bg-grey-light p-10 flex flex-col min-h-full w-1/3">
				<div className="p-5 bg-white">
					<div className="flex items-center gap-4">
						<div>
							<Image
								src="/images/BIDV.png"
								width={44}
								height={44}
								alt="BIDV-logo"
							/>
						</div>
						<div>
							<div className="body-4-semibold text-neutral-100">
								Ngân hàng BIDV
							</div>
						<div className="font-medium text-sm text-neutral-60">
								Chi nhánh Tây Hồ
							</div>
						</div>
						<div className="ml-auto text-center">
							<div>
								{/* <Image
									src="/icons/QR.svg"
									width={24}
									height={24}
									className=""
									alt="qr-icon"
								/> */}
								<ImQrcode className="text-indigo-700 mx-auto"/>
							</div>
							<div className="text-xs font-medium underline text-indigo-700">Quét QR</div>
						</div>
					</div>
					<div className="flex flex-col gap-4 mt-4">
						<div className="flex items-center">
							<div className="grow max-w-[25%] text-sm text-neutral-60">
								Số tài khoản
							</div>
							<div className="grow body-5-semibold text-neutral-100">
								0123456789
							</div>
							<div role="button" className="text-xs p-1 bg-grey">
								COPY
							</div>
						</div>
						<div className="flex items-center">
							<div className="grow max-w-[25%] text-sm text-neutral-60">
								Chủ tài khoản
							</div>
							<div className="grow body-5-semibold text-neutral-100">
						NGUYEN VAN A	
							</div>
							<div role="button" className="text-xs p-1 bg-grey">
								COPY
							</div>
						</div>
						<div className="flex items-center">
							<div className="grow text-sm max-w-[25%] text-neutral-60">
								Số tiền
							</div>
							<div className="text-brand-primary grow body-5-semibold">
								1,000,000 VND
							</div>
							<div role="button" className="text-xs p-1 bg-grey">
								COPY
							</div>
						</div>
					</div>
				</div>
				<div className="text-neutral-80 p-2.5 bg-[#FFD88D4D]/[30%] text-xs text-center">
					Các giao dịch không nhập nội dung chuyển tiền, hoặc nhập không đúng nội dung theo yêu cầu sẽ không được cộng xu tự động. <br/> 
					<span className="text-status-blue">Vui lòng liên hệ bộ phận CSKH để được hỗ trợ.</span>
				</div>
				<div className="mt-auto">
					<Button primary md block>
						{" "}
						<FaAngleLeft /> Xem thông tin đơn hàng
					</Button>
					<button className="bg-slate-200 btn w-full btn-md text-brand-primary mt-2">
						<FaPhoneAlt /> Liên hệ hỗ trợ
					</button>
				</div>
			</div>
		</div>
	);
}
