import skillApi from "@/api/skillApi";
import userApi from "@/api/userApi";
import Avatars from "@/components/Avatars";
import BadgeReputation from "@/components/BadgeReputation";
import BadgeVerify from "@/components/BadgeVerify";
import Button from "@/components/Button";
import FormInputText from "@/components/FormInput";
import ItemUserStatics from "@/components/ItemUserStatics";
import MultipleCombobox from "@/components/MultipleCombobox";
import UserLayout from "@/layouts/UserLayout";
import { FieldArray, Form, Formik } from "formik";
import { userSchema } from "interfaces/EUser";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import {
	HiOutlineFire,
	HiOutlineMinus,
	HiOutlinePencilAlt,
	HiOutlinePlus,
	HiOutlineThumbUp,
	HiOutlineUsers,
} from "react-icons/hi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import convertToHTMLDate from "utils/convertToHTMLDate";
import categoryApi from "@/api/categoryApi";
import FormTextArea from "@/components/FormTextArea";
import FormRichText from "@/components/FormRichText";
import { EditorState } from "draft-js";
export default function EditUserProfile() {
	const { data: skill = [] } = skillApi.useSkill();
	const { data: category = [] } = categoryApi.useCategory();
	const { user } = userApi.useUser();
	{
		/*const [optionTime, setOptionTime] = useState("Full-time");
	const [expOpen, setExpOpen] = useState(false);
	const [eduOpen, setEduOpen] = useState(false);
	const [indexOfExp, setIndexOfExp] = useState(0);
	const [indexOfEdu, setIndexOfEdu] = useState(0);*/
	}
	const [showLink, setShowLink] = useState(true);
	const [showIntroduction, setShowIntroduction] = useState(true);
	// if (isError) return <div>failed to load</div>;
	// if (isLoading) return <div>loading...</div>;
	const router = useRouter();
	const [editorState, onEditorStateChange] = useState("Type Here")
	return (
		<>
			<Head>
				<title> Chỉnh sửa trang cá nhân</title>
				<meta name="robots" content="noindex" />
			</Head>
			<div className="flex gap-6 flex-col bg-white h-full w-full sm:p-8">
				<div className="pb-6 border-b">
					<div className="flex gap-6 flex-wrap sm:flex-nowrap justify-center">
						<div>
							<Avatars />
						</div>
						<div className="grow">
							<div className="flex justify-between">
								<div>
									<h1 className="text-3xl font-semibold">
										{user?.fullname}
									</h1>
								</div>
							</div>
							<div className="mt-2 sm:mt-[unset]">
								<BadgeReputation />
								<BadgeVerify />
							</div>
							<div className="flex flex-wrap gap-10 mt-4">
								<ItemUserStatics
									icon={HiOutlineFire}
									label="Dịch vụ"
									value={"20"}
								/>
								<ItemUserStatics
									icon={HiOutlineUsers}
									label="Số người đã mua"
									value={"40+"}
								/>
								<ItemUserStatics
									icon={HiOutlineThumbUp}
									label=" Đánh giá"
									value="4.5"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="text-[20px] font-semibold text-grey-100">
						Thông tin cá nhân
					</div>
					<div className="mt-6">
						<Formik
							initialValues={{
								fullname: user?.fullname || "",
								email: user?.email || "",
								phone: user?.phone || "",
								birthday: convertToHTMLDate(user?.birthday),
								address: user?.address || "",
								sex: user?.sex || "male",
								introduction: EditorState.createEmpty(),
								skill: user?.skill || [],
								social_media_contact:
									user?.social_media_contact.map(
										(item: any) => item.link
									) || [""],
								experience: user?.experience || [{}],
								category: user?.category || [],
							}}
							validationSchema={userSchema
								.shape({
									social_media_contact: Yup.array().of(
										Yup.string().url("Chưa đúng định dạng")
									),
								})
								.pick([
									"fullname",
									"email",
									"phone",
									"social_media_contact",
								])}
							onSubmit={(values) => {
								userApi
									.editProfile({
										fullname: values.fullname,
										birthday: values.birthday
											? values.birthday
											: undefined,
										phone: values.phone,
										introduction: values.introduction
											? String(values.introduction)
											: undefined,
										skill: values.skill,
										social_media_contact:
											values.social_media_contact.map(
												(item) => ({ link: item })
											),
										address: values.address,
										category: values.category,
									})
									.then((res) => {
										toast.success("Cập nhật thành công");
									})
									.catch((err) => {
										toast.error(
											`Cập nhật thất bại: ${err.response.data.message}`
										);
									});
							}}
							enableReinitialize>
							{({ values, setFieldValue }) => {
								return (
									<Form>
										<div className="grid sm:grid-cols-2 gap-6">
											<div>
												<div className="mb-1">
													<label>Tên đầy đủ *</label>
												</div>
												<FormInputText
													placeholder="Nhập tên của bạn"
													name="fullname"
												/>
											</div>
											<div>
												<div className="mb-1">
													<label>Ngày sinh *</label>
												</div>
												<FormInputText
													name="birthday"
													type="date"
													placeholder="Nhập ngày sinh của bạn"
												/>
											</div>
										</div>
										<div className="grid sm:grid-cols-2 gap-6 mt-6">
											<div>
												<div className="mb-1">
													<label>
														Số điện thoại *
													</label>
												</div>
												<FormInputText
													placeholder="+84 353 454 679"
													name="phone"
													type="tel"
												/>
											</div>
											<div>
												<div className="mb-1">
													<label>Email *</label>
												</div>
												<FormInputText
													name="email"
													type="email"
													placeholder="username@niubi.vn"
												/>
											</div>
											<div>
												<div className="mb-1">
													<label>Địa chỉ</label>
												</div>
												<FormInputText
													name="address"
													type="text"
													placeholder="Hà Nội..."
												/>
											</div>
										</div>
										<div className="mt-6 mb-6">
											<label>Giới tính</label>
											<div className="flex gap-5 mt-1">
												<label
													className="inline-flex gap-2 text-neutral-100"
													htmlFor="male">
													<FormInputText
														type="radio"
														name="sex"
														value="male"
														className="my-auto"
													/>
													Nam
												</label>
												<label
													className="inline-flex gap-2 text-neutral-100"
													htmlFor="female">
													<FormInputText
														type="radio"
														name="sex"
														value="female"
														className="my-auto"
													/>
													Nữ
												</label>
												<label
													className="inline-flex gap-2 text-neutral-100"
													htmlFor="other">
													<FormInputText
														type="radio"
														name="sex"
														value="other"
														className="my-auto"
													/>
													Khác
												</label>
											</div>
										</div>
										<div className="p-6 mt-6 border">
											<div className="flex justify-between mb-4">
												<div className="text-[20px] font-semibold text-neutral-100">
													Mô tả về bản thân
												</div>
												<div>
													<Button
														type="button"
														onClick={() => {
															setShowIntroduction(
																!showIntroduction
															);
														}}
														className="w-10 h-10 border text-brand-primary inline-flex items-center justify-center">
														<HiOutlinePencilAlt className="text-base" />
													</Button>
												</div>
											</div>
											{/* <div className="h-72"> */}
												<FormRichText name="introduction" placeholder="Type some thing..." />
											{/* </div> */}
										</div>

										<div className="p-6 mt-6 border">
											<div className="flex justify-between">
												<div className="text-[20px] font-semibold text-neutral-100">
													Liên kết mạng xã hội
												</div>
												<div>
													<Button
														type="button"
														onClick={() => {
															setShowLink(
																!showLink
															);
														}}
														className="w-10 h-10 border text-brand-primary inline-flex items-center justify-center">
														<HiOutlinePencilAlt className="text-base" />
													</Button>
												</div>
											</div>
											{showLink ? (
												values.social_media_contact.map(
													(item) => {
														// console.log(typeof(item.link))
														return (
															<>
																<Link href="/">
																	<a>
																		<div className="flex items-center border w-full pt-3 pb-3 pl-4 mt-4">
																			<FaFacebook className="text-brand-primary mr-2" />
																			<span className="text-neutral-80">
																				{
																					item
																				}
																			</span>
																		</div>
																	</a>
																</Link>
																{/* <Link href="/user/service">
													<a>
														<div className="flex items-center border w-full py-3 pl-4 mt-4">
															<FaInstagram className="text-brand-primary mr-2" />
															<span className="text-neutral-80">
																@a2ztech.vn
															</span>
														</div>
													</a>
												</Link> */}
															</>
														);
													}
												)
											) : (
												<FieldArray
													name="social_media_contact"
													render={(helpers) => (
														<div>
															{values
																.social_media_contact
																.length > 0 ? (
																values.social_media_contact.map(
																	(
																		item,
																		index
																	) => (
																		<div
																			key={
																				index
																			}
																			className="flex gap-4 my-4">
																			<FormInputText
																				name={`social_media_contact.${index}`}
																			/>
																			<Button
																				type="button"
																				onClick={() =>
																					helpers.remove(
																						index
																					)
																				}
																				className="w-10 h-10 border text-brand-primary inline-flex items-center justify-center my-auto">
																				<HiOutlineMinus className="text-base" />
																			</Button>
																			<Button
																				type="button"
																				onClick={() =>
																					helpers.insert(
																						index +
																						1,
																						""
																					)
																				}
																				className="w-10 h-10 border text-brand-primary inline-flex items-center justify-center mr-2 my-auto">
																				<HiOutlinePlus className="text-base" />
																			</Button>
																		</div>
																	)
																)
															) : (
																<button
																	type="button"
																	onClick={() =>
																		helpers.push(
																			""
																		)
																	}>
																	<div className="hover:bg-grey cursor-pointer p-3 text-base font-semibold text-brand-primary text-center">
																		Thêm
																		liên kết
																		mạng xã
																		hội
																	</div>
																</button>
															)}
														</div>
													)}
												/>
											)}
										</div>
										<div className="mt-6 p-6 border">
											<div className="text-[20px] font-semibold text-neutral-100">
												Kỹ năng
												{/*<FormMutipleSelect<TSkill>
														array={skill}
														selected={userSkill}
														setSelected={(value) =>
															setUserSkill(value)
														}
													/>*/}
											</div>
											<div className="mt-3">
												<MultipleCombobox
													options={[...skill]}
													value={values.skill}
													onChange={(value) =>
														setFieldValue(
															"skill",
															value
														)
													}
												/>
											</div>
										</div>
										{/* <div className="mt-6 p-6 border">
											<div className="text-[20px] font-semibold text-neutral-100">
												Danh mục
											</div>
											<div className="mt-3">
												<MultipleCombobox
													options={[...category]}
													value={values.category}
													onChange={() =>
														setFieldValue(
															"category",
															values.category
														)
													}
												/>
											</div>
										</div> */}
										{/*	<div className="p-6 mt-6 border">
											<div className="text-[20px] font-semibold text-neutral-100">
												Ảnh và video
											</div>
											<div className="flex gap-4 mt-4">
												<Image
													src="/work.jpg"
													alt="work"
													width={80}
													height={80}
													objectFit="cover"
												/>
												<Image
													src="/work.jpg"
													alt="work"
													width={80}
													height={80}
													objectFit="cover"
												/>
												<Image
													src="/work.jpg"
													alt="work"
													width={80}
													height={80}
													objectFit="cover"
												/>
												<Image
													src="/work.jpg"
													alt="work"
													width={80}
													height={80}
													objectFit="cover"
												/>
											</div>
										</div>*/}
										<div className="flex mt-4 justify-end">
											<Button
												type="submit"
												primary
												md
											// onClick={() => {
											// 	router.reload();
											// }}
											>
												Lưu thay đổi
											</Button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</div>
				</div>
			</div>
		</>
	);
}

EditUserProfile.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
