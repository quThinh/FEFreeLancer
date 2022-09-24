import Button from "@/components/Button";
import PriceTag from "@/components/PriceTag";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import Image from "next/image";
import { Fragment } from "react";
import { HiOutlineX } from "react-icons/hi";
import FormGroup from "./FormGroup";
import FormInputTextWithPostfix from "./FormInputTextWithPostfix";
import FormTextArea from "./FormTextArea";
import * as Yup from "yup";
import orderApi from "@/api/orderApi";
import TService from "interfaces/EService";

interface IBookServiceDialogProps {
	service?: TService;
	onClose: () => void;
	isOpen: boolean;
}

export default function BookServiceDialog(props: IBookServiceDialogProps) {
	return (
		<Transition show={props.isOpen}>
			<Dialog
				open={props.isOpen}
				onClose={props.onClose}
				className="z-10 relative"
		>
				<Transition.Child>
					<div className="flex inset-0 fixed bg-black opacity-50"></div>
				</Transition.Child>
				<Transition.Child as={Fragment}>
					<div className="fixed inset-0 p-4 overflow-y-scroll">
						<div className="flex min-h-full items-center justify-center">
							<div className="bg-white rounded-lg w-[32rem] p-6 shadow-lg overflow-hidden">
								<Dialog.Panel>
									<Dialog.Title>
										<div
											className="flex items-center"
											role="button"
											onClick={() => props.onClose()}>
											<div className="w-9 h-9 ml-auto rounded-full flex items-center justify-center shadow">
												<HiOutlineX size={24} />
											</div>
										</div>
										<div className="text-center body-1-semibold">
											Xác nhận đơn hàng dịch vụ
										</div>
									</Dialog.Title>
									<Dialog.Description as="div">
										<div className="flex flex-col divide-y divide-1-grey">
											<div className="py-8">
												<div className="h-[38px] w-full flex">
													<div className="mr-2">
														<Image
															src={"/work.jpg"}
															alt="media"
															className="rounded-full"
															width={"48px"}
															height={"48px"}
														/>
													</div>
													<div>
														<p className="body-4-semibold m-0">
															{
																props.service
																	?.user_id
																	?.fullname
															}
														</p>
														<span className="text-center p-1 text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
															TOP RATE
														</span>
													</div>
												</div>
											</div>
											<div className="flex items-center py-4">
												<div className="w-1/2">
													Dịch vụ
												</div>
												<div className="ml-auto body-5-semibold text-neutral-100">
													{props?.service?.name}
												</div>
											</div>
											<div className="flex items-center py-4">
												<div className="w-1/2">
													Khoảng giá
												</div>
												<div className="ml-auto">
													<PriceTag
														width={20}
														height={20}
														className="text-lg"
														price={`${props?.service?.lower_bound_fee} - ${props?.service?.upper_bound_fee}`}
													/>
												</div>
											</div>
											<div className="flex items-center py-4">
												<div className="w-1/2">
													Hình thức tư vấn
												</div>
												<div className="ml-auto">
													online
												</div>
											</div>
											<div className="py-4">
												<Formik
													initialValues={{
														comment: "",
														price: 0,
													}}
													validationSchema={Yup.object(
														{
															comment:
																Yup.string().required(
																	"Vui lòng nhập nội dung"
																),
															price: Yup.number()
																.required(
																	"Vui lòng nhập giá"
																)
																.min(
																	Number(
																		props
																			.service
																			?.lower_bound_fee
																	),
																	`Giá phải lớn hơn hoặc bằng ${Number(
																		props
																			.service
																			?.lower_bound_fee
																	)}`
																)
																.max(
																	Number(
																		props
																			.service
																			?.upper_bound_fee
																	),
																	`Giá phải nhỏ hơn hoặc bằng ${Number(
																		props
																			.service
																			?.upper_bound_fee
																	)}`
																),
														}
													)}
													onSubmit={(values) => {
														orderApi.request({
															service_id:
																props?.service
																	?._id || "",
															note: values.comment,
															price: values.price,
														});
														props.onClose();
													}}>
													{(formProps) => (
														<Form>
															<FormGroup>
																<label htmlFor="price">
																	Giá đề xuất
																</label>
																<FormInputTextWithPostfix
																	type="number"
																	icon={
																		<Image
																			src="/icons/B.svg"
																			alt="icon"
																			width={
																				20
																			}
																			height={
																				20
																			}
																		/>
																	}
																	name="price"
																	placeholder="Giá tiền dịch vụ được đề xuất"
																/>
															</FormGroup>
															<FormGroup>
																<label htmlFor="comment">
																	Ghi chú
																</label>
																<FormTextArea
																	maxLength={
																		500
																	}
																	name="comment"
																	className="border p-4 h-32"
																	placeholder="Ghi chú cho tiền bối về dịch vụ"
																/>
															</FormGroup>
															<div className="flex justify-between text-sm text-neutral-60">
																<span>
																	Tối đa 500
																	ký tự{" "}
																</span>
																<span>
																	{
																		formProps
																			.values
																			.comment
																			.length
																	}
																	/500
																</span>
															</div>
															<div className="flex mt-4 items-center py-4">
																<div className="body-5-semibold">
																	{" "}
																	Tổng giá trị
																</div>
																<div className="ml-auto">
																	<PriceTag
																		price={
																			formProps
																				.values
																				.price
																		}
																	/>
																</div>
															</div>
															<Button
																md
																type="submit"
																primary
																block>
																Đặt đơn ngay
															</Button>
														</Form>
													)}
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
	);
}
