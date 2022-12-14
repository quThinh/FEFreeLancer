import Avatars from "@/components/Avatars";
import { StarRating } from "@/components/StarRating";
import offerApi from "api/offerApi";
import { Dialog, Transition } from "@headlessui/react";
import { Form, Formik } from "formik";
import TClient from "interfaces/EClient";
import { Fragment, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import checkFinishEstimatedTime from "utils/checkFinsishEstimatedTime";
import BadgeReputation from "./BadgeReputation";
import BadgeVerify from "./BadgeVerify";
import Button from "./Button";
import FormTextArea from "./FormTextArea";
import PriceTag from "./PriceTag";
import Tag from "./Tag";
import TOffer from "interfaces/EOffer";

export interface ItemPrice {
	client?: TClient;
	offer: TOffer;
	onQuote?: () => void;
}

export default function ItemPriceQuote(ItemPrice: ItemPrice) {
	const [isOffer, setIsOffer] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenContact, setIsOpenContact] = useState(false);
	const [isPersonContact, setIsPersonContact] = useState("");
	return (
		<div>
			<Transition appear show={isOpenContact} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsOpenContact(false)}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
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
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										S??? ??i???n Tho???i:
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											{ItemPrice.client?.phone}
										</p>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={() =>
												setIsOpenContact(false)
											}>
											Xong
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			<Transition show={isOpen}>
				<Dialog
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="z-20 relative">
					<Transition.Child>
						<div className="flex inset-0 fixed bg-black opacity-50"></div>
					</Transition.Child>
					<Transition.Child as={Fragment}>
						<div className="flex py-3 items-center fixed inset-0 justify-center">
							<div className="bg-white w-1/2 max-h-full rounded-lg p-6 shadow-lg">
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
											<div className="flex items-center justify-between px-8 py-4 border-b">
												<span className="text-neutral-100 text-2xl font-semibold">
													L??u ??:
												</span>
											</div>
											<div className="p-6">
												<Formik
													initialValues={{ note: "" }}
													onSubmit={(values) => {
														offerApi.acceptOffer(
															values.note,
															isOffer
														);
														setIsOpen(false);
													}}
													enableReinitialize>
													{({ values }) => {
														return (
															<Form className="divide-y divide-grey-1">
																<div>
																	<div className="col-span-3">
																		<label
																			htmlFor="note"
																			className="font-semibold text-neutral-100">
																			Gi???i
																			thi???u
																			v???
																			kinh
																			nghi???m
																			v??
																			k??
																			n??ng:
																		</label>
																		<p className="text-sm text-neutral-60">
																			M??
																			t???
																			chi
																			ti???t
																			d???ch
																			v???
																			b???n
																			????a
																			ra
																		</p>
																	</div>
																	<div className="col-span-5">
																		<FormTextArea
																			name="note"
																			className="border p-4 h-32"
																			placeholder="Nh???p m?? t??? d???ch v???"
																		/>
																		<p className="flex justify-between text-sm text-neutral-60">
																			<span>
																				T???i
																				??a
																				500
																				k??
																				t???{" "}
																			</span>
																			<span>
																				0/500
																			</span>
																		</p>
																	</div>
																	<div className="flex gap-2">
																		<Button
																			md
																			secondary
																			onClick={() =>
																				setIsOpen(
																					false
																				)
																			}>
																			H???y
																		</Button>
																		<Button
																			type="submit"
																			md
																			primary>
																			Giao
																			vi???c
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
					</Transition.Child>
				</Dialog>
			</Transition>
			<div className="flex">
				<div className="pr-8 w-1/4">
					<div className="border flex flex-col justify-center items-center bg-light px-3 pt-5 pb-5">
						<Avatars active linkAvt={"/icons/default-avatar.svg"} />
						<div className="mt-4">
							<h3 className="text-lg font-medium text-neutral-100 mb-2 text-center">
								{ItemPrice?.client?.fullname}
							</h3>
							<div className="flex justify-center mb-4">
								<StarRating rating={4} />
								<span className="text-xs text-yellow-400 text-neutral-60 font-normal mt-[3px] mx-1">
									{ItemPrice?.client?.rate_number} ????nh gi??
								</span>
							</div>
							<div className="flex mb-5 justify-center ">
								<BadgeReputation />
								<BadgeVerify />
							</div>
							<div className="flex flex-wrap gap-2">
								{ItemPrice.client?.skill.map((index, key) => (
									<Tag key={key} color="grey">
										{index.name}
									</Tag>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="border w-3/4 flex flex-col gap-4">
					<div className="p-4 bg-grey body-2-semibold text-neutral-100">
						N???i dung ch??o gi??
					</div>

					<div className="pl-4">
						<div>
							<div className="flex">
								<div className="body-4-medium w-1/3">
									B??o gi??
								</div>
								<PriceTag price={ItemPrice.offer.offer_price} />
							</div>
							<div className="flex mt-4">
								<div className="body-4-medium w-1/3">
									Th???i gian th???c hi???n
								</div>
								<div className="body-5-medium text-neutral-60">
									{ItemPrice.offer
										.offer_finish_estimated_time < 1440 ? (
										<div>
											{checkFinishEstimatedTime(
												ItemPrice.offer
													.offer_finish_estimated_time
											)}{" "}
											Ph??t
										</div>
									) : (
										<div>
											{checkFinishEstimatedTime(
												ItemPrice.offer
													.offer_finish_estimated_time
											)}{" "}
											Ng??y
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className="body-4-medium">
								N???i dung ch??o gi??
							</div>
							<p className="body-5 mt-4 text-neutral-60">
								{ItemPrice.offer.introduction}
							</p>
						</div>
						{ItemPrice.offer.status === 1 ? (
							<>
								<div className="mt-3">
									<Tag color="green"> Ch???p nh???n b??o gi??</Tag>
								</div>
								<Button
									md
									primary
									className="flex gap-3 w-40 flex-center"
									onClick={() => {
										setIsOpenContact(true);
									}}>
									<FaPhoneAlt className="mt-1" />
									Li??n h???
								</Button>
							</>
						) : (
							<div className="flex gap-2">
								<Button
									md
									primary
									className="flex gap-2"
									onClick={() => {
										setIsOpenContact(true);
									}}>
									<FaPhoneAlt className="mt-1" />
									Li??n h???
								</Button>
								<Button
									md
									secondary
									onClick={() => {
										setIsOpen(false);
										setIsOffer(ItemPrice.offer._id);
									}}>
									Giao vi???c
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
