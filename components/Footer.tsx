import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
interface IFooterProps {}
export default function Footer() {
	return (
		<footer className="mt-8 footer bg-neutral-100">
			<div className="container mx-auto p-2">
				<div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8 p-8">
					<div className="flex gap-3 flex-col text-xs text-neutral-60">
						<p className="text-2xl text-white font-bold">
							Hotline: 0981.23.43.76
						</p>
						<p>
							Mã số thuế: 0109115048 cấp tại Phòng đăng ký kinh
							doanh Sở Kế hoạch và Đầu tư Thành phố Hà Nội
						</p>
						<p>
							Văn phòng Hà Nội: Toà nhà NIC GROUP, 108 Lò Đúc,
							Quận Hai Bà Trưng, Hà Nội, Việt Nam
						</p>
						<p>
							Văn phòng Hồ Chí Minh: Toà nhà Dakao Center, 35 Mạc
							Đĩnh Chi, Quận 1, TP. Hồ Chí Minh, Việt Nam
						</p>
						<p>Email: info@a2ztech.vn</p>
					</div>

					<div className="flex flex-col gap-3 text-sm text-neutral-60">
						<p className="font-bold text-white">Dịch vụ</p>
						<div>
							<Link href="/services?name=Tính%20lương">
								<a> Dịch vụ Tính lương</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Nhân%20sự%20cày%20thuê%20ngoài">
								<a> Dịch vụ Nhân sự thuê ngoài</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Tư%20vấn%20tuyển%20dụng%20nhân%20sự%20cấp%20cao">
								<a>
									{" "}
									Dịch vụ Tư vấn tuyển dụng nhân sự cấp cao
								</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Cung%20ứng%20lao%20động%20phổ%20thông">
								<a> Dịch vụ Cung ứng lao động phổ thông</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Nhân%20sự%20theo%20giờ">
								<a> Dịch vụ Nhân sự theo giờ</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Gia%20công%20sản%20xuất">
								<a> Dịch vụ Gia công sản xuất</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Hỗ%20trợ%20pháp%20lý%20văn%20phòng%20đại%20diện%20và%20nhân%20sự%20nước%20ngoài">
								<a>
									{" "}
									Dịch vụ Hỗ trợ pháp lý văn phòng đại diện và
									nhân sự nước ngoài
								</a>
							</Link>
						</div>
						<div>
							<Link href="/services?name=Tuyển%20dụng%20trực%20tuyến">
								<a> Tuyển dụng trực tuyến</a>
							</Link>
						</div>
					</div>

					<div className="grid grid-cols-2 sm:col-span-2 lg:col-auto gap-8">
						<div className="grid grid-rows-2 sm:grid-rows-none lg:grid-rows-2 sm:grid-cols-2 lg:grid-cols-1 sm:gap-10">
							<div className="flex flex-col gap-3 text-sm text-neutral-60">
								<p className="font-bold text-white">Ứng viên</p>
								<div>
									<Link href="/">
										<a> Công việc nổi bật</a>
									</Link>
								</div>
								<div>
									<Link href="/">
										<a> Tin việc làm</a>
									</Link>
								</div>
								<div>
									<Link href="/">
										<a> Gửi CV cho chúng tôi</a>
									</Link>
								</div>
								<div>
									<Link href="/">
										<a> Video hướng dẫn</a>
									</Link>
								</div>
							</div>
							<div className="mt-8 sm:mt-0 lg:mt-8 flex flex-col gap-3 text-sm text-neutral-60">
								<p className="font-bold text-white">Tin tức</p>
								<div>
									<Link href="/">
										<a> Sự kiện</a>
									</Link>
								</div>
								<div>
									<Link href="/">
										<a> Blog nhân sự</a>
									</Link>
								</div>
								<div>
									<Link href="/">
										<a> Góc báo chí</a>
									</Link>
								</div>
							</div>
						</div>

						<div className="grid grid-rows-2 sm:grid-rows-none lg:grid-rows-2 sm:grid-cols-2 lg:grid-cols-1 sm:gap-10">
							<div className="flex flex-col gap-3 text-sm text-neutral-60">
								<p className="font-bold text-white">
									Kết nối với chúng tôi
								</p>
								<div>
									<FaFacebook className="inline-block" />{" "}
									<span>Facebook</span>
								</div>
								<div>
									<FaYoutube className="inline-block" />{" "}
									Youtuve
								</div>
								<div>
									<FaLinkedin className="inline-block" />{" "}
									LinkedIn
								</div>
							</div>

							<div className="mt-8 sm:mt-0 lg:mt-8 flex items-start flex-col gap-3 text-sm text-neutral-60">
								<p className="font-bold text-white">
									Quét mã QR
								</p>
							</div>
						</div>
					</div>
				</div>
				<hr className="border-neutral-80" />
				<div className="flex items-center mt-2 py-4">
					<span className="text-xs text-neutral-40">
						© Copyright Freelancer 2022
					</span>
					<span className="ml-auto gap-4 flex">
						<Image
							src="/icons/VI.svg"
							width={16}
							height={16}
							alt="vi-icon"
						/>
						<Image
							src="/icons/US.svg"
							width={16}
							height={16}
							alt="us-icon"
						/>
					</span>
				</div>
			</div>
		</footer>
	);
}

