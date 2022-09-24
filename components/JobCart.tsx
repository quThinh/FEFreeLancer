import userApi from "@/api/userApi";
import AuthUtils from "@/utils/authUtils";
import { Dialog, Transition } from "@headlessui/react";
import offerApi from "api/offerApi";
import { Form, Formik } from "formik";
import TJob from "interfaces/EJob";
import { offerSchema } from "interfaces/EOffer";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaStar } from "react-icons/fa";
import {
	HiClipboardCopy,
	HiOutlineInformationCircle,
	HiOutlineShare,
} from "react-icons/hi";
import {
	FacebookShareButton,
	LineShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from "react-share";
import Button from "./Button";
import FormInputText from "./FormInput";
import FormInputTextWithPostfix from "./FormInputTextWithPostfix";
import FormTextArea from "./FormTextArea";
import Tag from "./Tag";

export default function JobCart(props: { job?: TJob; id: string }) {
	const [isOpen, setIsOpen] = useState(false);
	const { user } = userApi.useUser();
	const router = useRouter();
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const [openShare, setOpenShare] = useState(false);
	return (
		<>
			<div className="border">
				<div className="bg-grey p-4">Chi tiết nhà tuyển dụng</div>
				<div className="p-4">
					<div>
						<div className="h-[38px] w-[100%] flex">
							<div className="mr-2 w-[36px] h-[36px] ">
								<Image
									src={"/work.jpg"}
									alt="media"
									className="rounded-[50%] w-full h-full"
									width={"36px"}
									height={"36px"}
								/>
							</div>
							<div>
								<p className="text-neutral-80 font-[400] m-0">
									{props?.job?.user_id?.fullname ||
										"Nhà tuyển dụng"}
								</p>
								<span className="p-1 text-center text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
									TOP RATE
								</span>
							</div>
						</div>
					</div>
					<div className="mt-3">
						<div className="divide-x flex items-center text-sm font-medium">
							<span className="pr-3 text-base inline-flex items-center font-semibold">
								<FaStar className="text-red mr-2" />
								{props?.job?.user_id?.rate_star || 0}
							</span>
							<span className="px-3">
								{props?.job?.user_id?.rate_number || 0} Đánh giá
								&bull; {props?.job?.user_id?.sold_time || 0}{" "}
								lượt mua
							</span>
						</div>
					</div>
				</div>
				<div className="p-4 grid cursor-pointer grid-cols-2 gap-2 border-b">
					<div>ID dự án</div>
					<div
						className={`flex items-center px-1 gap-2 underline decoration-dashed ${
							copied ? "text-status-green" : "text-neutral-80"
						}`}
						onClick={() => {
							navigator.clipboard.writeText(props.id);
							setCopied(true);
						}}>
						<div className="inline-block">
							<div className="line-clamp-1">
								{copied ? "Đã sao chép" : "Sao chép"}
							</div>{" "}
						</div>
						<HiClipboardCopy />
					</div>
					<div>Ngày đăng</div>
					<div>
						{new Date(props.job?.create_time || "").toLocaleString(
							"vi"
						)}
					</div>
					<div>Ngày hết hạn</div>
					<div>
						{new Date(
							new Date(props.job?.create_time || "").getTime() +
								(props?.job?.finish_estimated_time || 0) *
									60 *
									1000
						).toLocaleString("vi")}
					</div>
					<div>Địa điểm</div>
					<div>{props.job?.user_id?.address || "Chưa xác định"}</div>
					<div>Ngân sách</div>
					<div className="flex gap-1 items-end text-base font-semibold text-status-yellow">
						<span>
							{props?.job?.lower_bound_fee} -{" "}
							{props?.job?.upper_bound_fee}
						</span>
						<Image
							src="/icons/B.svg"
							width={20}
							height={20}
							alt="bi-icon"
						/>
					</div>
					<div>Hình thức làm việc</div>
					<div className="flex gap-2 flex-wrap">
						{props.job?.providing_method.map((item, index) => (
							<Tag size="xs" color="green" key={index}>
								{t(item)}
							</Tag>
						))}
					</div>
				</div>
				<div className="px-16 py-4">
					{!AuthUtils.isLoggedIn() ||
					props?.job?.user_id?._id !== user?._id ? (
						<Button
							md
							block
							primary
							onClick={() => {
								setIsOpen(true);
							}}>
							Gửi báo giá
						</Button>
					) : (
						<Button
							md
							block
							primary
							onClick={() => {
								router.push(
									`/user/requests/edit?id=${props.job?._id}`
								);
							}}>
							Chỉnh sửa yêu cầu
						</Button>
					)}
					{!openShare ? (
						<Button className="mt-2" md block secondary
							onClick={() => setOpenShare(true)}
						>
							<HiOutlineShare /> Chia sẻ
						</Button>
					) : (
						<div className="flex items-center gap-3 p-3 justify-center">
							<FacebookShareButton url={window.location.href}>
								<Image
									src={"/icons/Facebook.svg"}
									alt="facebook"
									width={20}
									height={20}
								/>
							</FacebookShareButton>
							<TwitterShareButton url={window.location.href}>
								<Image
									src={"/icons/twitter-fill.svg"}
									alt="twitter"
									width={20}
									height={20}
								/>
							</TwitterShareButton>
							<LineShareButton url={window.location.href}>
								<Image
									width={20}
									height={20}
									src={"/icons/line-fill.svg"}
									alt="line"
								/>
							</LineShareButton>
							<LinkedinShareButton url={window.location.href}>
								<Image
									src={"/icons/linkedin-box-fill.svg"}
									alt="linkedIn"
									width={20}
									height={20}
								/>
							</LinkedinShareButton>
							<WhatsappShareButton url={window.location.href}>
								<Image
									src={"/icons/whatsapp-fill.svg"}
									alt="whatsApp"
									width={20}
									height={20}
								/>
							</WhatsappShareButton>
						</div>
					)}
					<div className="text-xs text-neutral-80 text-center">
						24h Hoàn tiền khi dịch vụ gặp vấn đề
					</div>
				</div>
			</div>
			{props?.job?.user_id?._id !== user?._id && (
				<Transition show={isOpen}>
					<Dialog
						open={isOpen}
						onClose={() => setIsOpen(false)}
						className="z-20 relative">
						<Transition.Child>
							<div className="flex inset-0 fixed bg-black opacity-50"></div>
						</Transition.Child>
						<Transition.Child as={Fragment}>
							<div className="fixed inset-0 overflow-y-scroll">
								<div className="fixed inset-0 py-3 flex items-center justify-center">
									<div className="bg-white max-h-full rounded-lg overflow-hidden p-6 shadow-lg">
										<Dialog.Panel>
											<Dialog.Title className="mb-8">
												<div
													className="flex items-center"
													role="button"
													onClick={() =>
														setIsOpen(false)
													}></div>
											</Dialog.Title>
											<Dialog.Description>
												<div className="max-w-[900px]">
													<div className="flex items-center justify-between px-8 pb-4 border-b">
														<span className="text-neutral-100 text-2xl font-semibold">
															Thông tin chào giá
														</span>
													</div>
													<div className="p-6">
														<Formik
															initialValues={
																Object.assign({
																	introduction:
																		"",
																	offer_finish_estimated_time: 0,
																	offer_price: 0,
																}) as {
																	introduction: string;
																	offer_finish_estimated_time: number;
																	offer_price: number;
																}
															}
															validationSchema={offerSchema.pick(
																[
																	"introduction",
																	"offer_price",
																	"offer_finish_estimated_time",
																]
															)}
															onSubmit={(
																values
															) => {
																offerApi.offer({
																	jobId: props.id,
																	offer_price:
																		values.offer_price,
																	offer_finish_estimated_time:
																		values.offer_finish_estimated_time,
																	introduction:
																		values.introduction,
																})
																setIsOpen(false)
															}}
															enableReinitialize>
															{({ values }) => {
																return (
																	<Form className="divide-y divide-grey-1">
																		<div className="py-6 grid grid-cols-12 gap-[7.5rem]">
																			<div className="col-span-3">
																				<label
																					htmlFor="offer_price"
																					className="font-semibold text-neutral-100">
																					Đề
																					xuất
																					chi
																					phí
																				</label>
																				<p className="text-sm text-neutral-60">
																					Vui
																					lòng
																					nhập
																					chi
																					phí
																					ước
																					tính
																					cho
																					dịch
																					vụ
																				</p>
																			</div>
																			<div className="col-span-5">
																				<label className="inline-flex mb-4 items-center text-base font-semibold text-neutral-100">
																					Nhập
																					chi
																					phí
																					ước
																					tính{" "}
																					<HiOutlineInformationCircle />
																				</label>{" "}
																				<span className="bg-neutral-100 text-sm rounded text-white p-1">
																					{" "}
																					1000
																					VNĐ
																					=
																					1
																					Bi
																				</span>
																				<FormInputTextWithPostfix
																					className="inline w-full"
																					type="number"
																					max="100000"
																					min="1"
																					name="offer_price"
																					placeholder="Nhập giá tối thiểu của dịch vụ"
																					icon={
																						<Image
																							src="/icons/B.svg"
																							alt="Bi"
																							width="20px"
																							height="20px"
																						/>
																					}
																				/>
																			</div>
																		</div>
																		<div className="py-6 grid grid-cols-12 gap-[7.5rem]">
																			<div className="col-span-3">
																				<label
																					htmlFor="introduction"
																					className="font-semibold text-neutral-100">
																					Giới
																					thiệu
																					về
																					kinh
																					nghiệm
																					và
																					kĩ
																					năng
																				</label>
																				<p className="text-sm text-neutral-60">
																					Mô
																					tả
																					chi
																					tiết
																					dịch
																					vụ
																					bạn
																					đưa
																					ra
																				</p>
																			</div>
																			<div className="col-span-5">
																				<FormTextArea
																					name="introduction"
																					className="border p-4 h-32"
																					placeholder="Nhập mô tả dịch vụ"
																				/>
																				<p className="flex justify-between text-sm text-neutral-60">
																					<span>
																						Tối
																						đa
																						500
																						ký
																						tự{" "}
																					</span>
																					<span>
																						0/500
																					</span>
																				</p>
																			</div>
																		</div>
																		<div className="py-6 grid grid-cols-12 gap-[7.5rem]">
																			<div className="col-span-3">
																				<label
																					htmlFor="offer_finish_estimated_time"
																					className="font-semibold text-neutral-100">
																					Dự
																					kiến
																					hoàn
																					thành
																				</label>
																				<p className="text-sm text-neutral-60">
																					Thời
																					gian
																					mà
																					bạn
																					dự
																					kiến
																					hoàn
																					thành
																					công
																					việc
																				</p>
																			</div>
																			<div className="col-span-5">
																				<FormInputText
																					max="59000"
																					min={
																						0
																					}
																					type="number"
																					name="offer_finish_estimated_time"
																					placeholder="Nhập thời gian để hoàn thành yêu cầu"
																				/>
																				<p className="text-sm text-neutral-60">
																					Tối
																					đa
																					40
																					ký
																					tự
																				</p>
																			</div>
																		</div>
																		<div className="py-6">
																			<div className="flex gap-4 justify-end">
																				<Button
																					type="button"
																					md
																					secondary
																					onClick={() =>
																						setIsOpen(
																							false
																						)
																					}>
																					Hủy
																					bỏ
																				</Button>
																				<Button
																					type="submit"
																					md
																					primary>
																					Xác
																					nhận
																				</Button>
																			</div>
																		</div>
																	</Form>
																);
															}}
														</Formik>
													</div>
												</div>
											</Dialog.Description>
										</Dialog.Panel>
									</div>
								</div>
							</div>
						</Transition.Child>
					</Dialog>
				</Transition>
			)}
		</>
	);
}
