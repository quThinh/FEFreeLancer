import Button from "@/components/Button";
import UserLayout from "@/layouts/UserLayout";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { HiCheck, HiOutlineClock } from "react-icons/hi";
import { MdVerifiedUser } from "react-icons/md";

export default function Verify() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="bg-white">
			<div className="sm:px-14 py-4 flex items-center">
				<MdVerifiedUser className="text-status-green text-4xl mr-4" />
				<p className="text-2xl font-semibold text-neutral-100">
					Xác minh tài khoản
				</p>
			</div>
			<div className="sm:p-8 my-8 sm:my-[unset] grid xl:grid-cols-3 sm:grid-cols-2 gap-6">
				<div className="flex flex-col divide-y bg-grey divide-1-grey">
					<div className="p-6">
						<span className="body-3-semibold text-neutral-100">
							Xác minh
						</span>
						<span className="ml-3 px-3 font-semibold bg-status-green text-s text-white p-1 rounded-3xl">
							Miễn phí
						</span>
					</div>

					<div className="p-6">
						<p className="font-semibold text-neutral-80">
							Hoàn thành nhiệm vụ do Freelancer cung cấp để được xác
							minh miễn phí
						</p>
					</div>
					<div className="flex flex-col gap-6 p-6">
						{[
							"Mở khóa tất cả các chức năng",
							"Công cụ phân tích dữ liệu người dùng",
							"Giảm giá gói quảng cáo",
							"Mở khóa không giới hạn upload dịch vụ",
							"Tổng đài hỗ trợ 24/24",
						].map((item, index) => (
							<div
								className="flex items-center gap-2 body-5-medium text-neutral-80"
								key={index}>
								<HiCheck className="inline-block h-6 w-6 text-status-green" />
								<div>{item}</div>
							</div>
						))}
					</div>
					<div className="mt-auto p-6 pt-20">
						<Button lg primary block onClick={() => setIsOpen(true)}>
							Thực hiện
						</Button>
					</div>
				</div>

				<div className="flex flex-col divide-y bg-grey divide-1-grey">
					<div className="p-6 flex items-center">
						<span className="body-3-semibold text-neutral-100">
							Đặt cọc
						</span>
						<span className="ml-3 px-3 font-semibold bg-status-yellow text-s text-white p-1 rounded-3xl">
							Đề xuất
						</span>
						<span className="flex items-center ml-auto gap-1">
							<Image
								src="/icons/B.svg"
								width={24}
								height={24}
								alt="B-icon"
							/>

							<span className="text-base font-semibold">
								<b className="text-status-yellow">4.000</b>
								<div className="inline text-neutral-80">/tháng</div>
							</span>
						</span>
					</div>

					<div className="p-6">
						<p>
							Hoàn thành nhiệm vụ do Freelancer cung cấp để được xác
							minh miễn phí
						</p>
					</div>
					<div className="flex flex-col gap-6 p-6">
						{[
							"Mở khóa tất cả các chức năng",
							"Công cụ phân tích dữ liệu người dùng",
							"Giảm giá gói quảng cáo",
							"Mở khóa không giới hạn upload dịch vụ",
							"Tổng đài hỗ trợ 24/24",
						].map((item, index) => (
							<div
								className="flex items-center gap-2 body-5-medium text-neutral-80"
								key={index}>
								<HiCheck className="h-6 w-6 inline-block text-status-green" />
								<div>{item}</div>
							</div>
						))}
					</div>
					<div className="p-6 mt-auto pt-20">
						<Button lg secondary block>
							Mở khóa
						</Button>
					</div>
				</div>

				<div className="flex flex-col divide-y bg-grey divide-1-grey">
					<div className="p-6 flex items-center">
						<span className="body-3-semibold text-neutral-100">
							Mua gói
						</span>
						<span className="ml-3 px-3 font-semibold bg-status-yellow text-s text-white p-1 rounded-3xl">
							Đề xuất
						</span>
						<span className="flex items-center ml-auto gap-1">
							<Image
								src="/icons/B.svg"
								width={24}
								height={24}
								alt="B-icon"
							/>

							<span className="text-base font-semibold">
								<b className="text-status-yellow">4.000</b>
								<div className="inline text-neutral-80">/tháng</div>
							</span>
						</span>
					</div>

					<div className="p-6">
						<p>
							Sử dụng điểm Bi thanh toán để xác minh tài khoản có hiệu lực trọn đời
						</p>
					</div>
					<div className="flex flex-col gap-6 p-6">
						{[
							"Mở khóa tất cả các chức năng",
							"Công cụ phân tích dữ liệu người dùng",
							"Giảm giá gói quảng cáo",
							"Mở khóa không giới hạn upload dịch vụ",
							"Tổng đài hỗ trợ 24/24",
						].map((item, index) => (
							<div
								className="flex items-center gap-2 body-5-medium text-neutral-80"
								key={index}>
								<HiCheck className="inline-block text-status-green" />
								<div>{item}</div>
							</div>
						))}
					</div>
					<div className="p-6 pt-20 mt-auto">
						<Button lg secondary block>
							Mở khóa
						</Button>
					</div>
				</div>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="max-w-full w-2/5 transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all">
									<Dialog.Title

										className="px-10 py-4 text-lg bg-brand-primary font-medium text-white "
									>
										Hãy hoàn thành nhiệm vụ để được xác minh tài khoản miễn phí nhé!
									</Dialog.Title>
									<div className="mt-[20px]">
										<p className="px-10 text-md font-semibold">
											Tất cả những gì bạn cần để xác minh tài khoản là theo dõi chúng tôi trên Facebook, Instagram
											và thực hiện một trong số những nhiệm vụ xác minh phía bên dưới
										</p>
									</div>

									<div className="mt-[20px] mx-[40px] mb-[40px]">
										<div className="flex justify-between">
											<div className="font-semibold text-md inline mb-3">Nhiệm vụ 1</div>
											<div className="font-semibold text-md text-status-red inline-flex items-center">
												<HiOutlineClock className="inline-block h-6 w-6" />
												<div className="px-2">Chưa thực hiện</div>
											</div>
										</div>
										<p className="flex">
											<div className="p-2 flex gap-2 border-2 border-grey">
												<div>
													<Image src="/work.jpg" alt="media" width={"64px"} height={"64px"} />
												</div>
												
												<div className="font-semibold text-neutral-80">Thiết kế 1 video cho Freelancer và quảng bá video trên Youtube, Facebook</div>
											</div>
											<div className="border-2 border-grey font-semibold text-neutral-80 text-center">
												<div>Tôi đã thực hiện nhiệm vụ</div>
												<Button sm primary block className="mt-2">
													Xác nhận ngay!
												</Button>
											</div>
										</p>
									</div>
									<div className="mt-[20px] mx-[40px] mb-[40px]">
										<div className="flex justify-between">
											<div className="font-semibold text-md inline mb-3">Nhiệm vụ 2</div>
											<div className="font-semibold text-md text-status-red inline-flex items-center">
												<HiOutlineClock className="inline-block h-6 w-6" />
												<div className="px-2">Chưa thực hiện</div>
											</div>
										</div>
										<p className="flex">
											<div className="p-2 flex gap-2 border-2 border-grey">
												<div>
													<Image src="/work.jpg" alt="media" width={"64px"} height={"64px"} />
												</div>
												
												<div className="font-semibold text-neutral-80">Thiết kế 1 video cho Freelancer và quảng bá video trên Youtube, Facebook</div>
											</div>
											<div className="border-2 border-grey font-semibold text-neutral-80 text-center">
												<div>Tôi đã thực hiện nhiệm vụ</div>
												<Button sm primary block className="mt-2">
													Xác nhận ngay!
												</Button>
											</div>
										</p>
									</div>
									<div className="mt-[20px] mx-[40px] mb-[40px]">
										<div className="flex justify-between">
											<div className="font-semibold text-md inline mb-3">Nhiệm vụ 1</div>
											<div className="font-semibold text-md text-status-red inline-flex items-center">
												<HiOutlineClock className="inline-block h-6 w-6" />
												<div className="px-2">Chưa thực hiện</div>
											</div>
										</div>
										<p className="flex">
											<div className="p-2 flex gap-2 border-2 border-grey">
												<div>
													<Image src="/work.jpg" alt="media" width={"64px"} height={"64px"} />
												</div>
												
												<div className="font-semibold text-neutral-80">Thiết kế 1 video cho Freelancer và quảng bá video trên Youtube, Facebook</div>
											</div>
											<div className="border-2 border-grey font-semibold text-neutral-80 text-center">
												<div>Tôi đã thực hiện nhiệm vụ</div>
												<Button sm primary block className="mt-2">
													Xác nhận ngay!
												</Button>
											</div>
										</p>
									</div>
									


								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}
Verify.getLayout = (page: React.ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
