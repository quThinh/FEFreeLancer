import categoryApi from "@/api/categoryApi";
import jobProductApi from "@/api/jobProductApi";
import mediaApi from "@/api/mediaApi";
import skillApi from "@/api/skillApi";
import Button from "@/components/Button";
import FormCheckBox from "@/components/FormCheckBox2";
import FormCheckBoxRadio from "@/components/FormCheckBoxRadio";
import FormInputText from "@/components/FormInput";
import FormInputTextWithPostfix from "@/components/FormInputTextWithPostfix";
import FormMutipleSelect from "@/components/FormMutipleSelect";
import FormTextArea from "@/components/FormTextArea";
import UserLayout from "@/layouts/UserLayout";
import { Form, Formik } from "formik";
import TCategory from "interfaces/ECategory";
import { jobSchema } from "interfaces/EJob";
import TSkill from "interfaces/ESkill";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import * as Yup from "yup";

import {
	HiArrowLeft,
	HiOutlineInbox,
	HiOutlineInformationCircle,
} from "react-icons/hi";
import {BsDashLg} from "react-icons/bs";

export default function CreateRequest() {
	const router = useRouter();
	const query = router.query;
	const { mode, id } = query;
	const { data: category = [] } = categoryApi.useCategory();
	const { data: skill = [] } = skillApi.useSkill();
	const [selectedCat, setSelectedCat] = useState<TCategory[]>([]);
	const [selectedSkill, setSelectedSkill] = useState<TSkill[]>([]);
	const { job } = jobProductApi.useItemUserJob(
		String(mode) === "edit" && id ? String(id) : null
	);
	return (
		<>
			<Head>
				<title>
					{String(mode) === "edit" ? "Sửa yêu cầu" : "Tạo yêu cầu"}
				</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="bg-white">
				<div className="flex items-center justify-between px-8 py-4">
					<span className="text-neutral-100 text-2xl font-semibold">
						{String(mode) === "edit"
							? "Sửa yêu cầu"
							: "Tạo yêu cầu"}
					</span>
					<Button
						onClick={() => router.push("/user/requests")}
						type="button"
						sm
						secondary>
						{" "}
						<HiArrowLeft /> Quay lại
					</Button>
				</div>
				<div className="p-6">
					<Formik
						initialValues={
							Object.assign(
								{
									name: "",
									skills: [],
									description: "",
									providing_method: [],
									finish_estimated_time: 0,
									lower_bound_fee: 0,
									upper_bound_fee: 0,
									required_level: [],
									images: null,
									payment_method: "",
									expiration_time: "",
								},
								mode === "edit" ? job : {}
							) as {
								name: string;
								skills?: string[];
								description: string;
								providing_method: string[];
								finish_estimated_time: number;
								lower_bound_fee: number;
								upper_bound_fee: number;
								required_level: string[];
								images?: FileList | null;
								payment_method: string;
								expiration_time: string;
							}
						}
						validationSchema={
							jobSchema.pick([
								"name",
								// "description",
								"providing_method",
								"finish_estimated_time",
								"lower_bound_fee",
								"upper_bound_fee",
								"payment_method",
								"required_level",
								// "images",
								"expiration_time",
							]) &&
							Yup.object().shape({
								name: Yup.string()
									.required("Tên yêu cầu không được để trống")
									.max(80, "Tên yêu cầu có tối đa 80 kí tự"),
								description: Yup.string()
									.required("Mô tả không được để trống")
									.max(500, "Mô tả có tối đa 500 ký tự"),
							})
						}
						onSubmit={async (values) => {
							const images = [];
							if (values.images)
								for (
									let i = 0;
									i < values?.images?.length;
									i++
								) {
									let formData = new FormData();
									formData.append("file", values.images[i]);
									formData.append("objectId", "1");
									formData.append("objectType", "avatar");
									formData.append("type", "avatar");
									let data = await mediaApi.getURLImages(
										formData
									);
									images.push(data);
								}
							if (String(mode) === "edit") {
								jobProductApi.updateJob({
									id: String(id),
									name: values.name,
									category: selectedCat.map(
										(item) => item._id
									),
									skill: selectedSkill.map((item) => ({
										...item,
										image: "",
									})),
									description: values.description,
									providing_method: values.providing_method,
									finish_estimated_time:
										values.finish_estimated_time,
									lower_bound_fee: values.lower_bound_fee,
									upper_bound_fee: values.upper_bound_fee,
									payment_method: values.payment_method,
									required_level: values.required_level,
									expiration_time: values.expiration_time,
									image: ["https://facebook.com"],
								});
							} else if (String(mode) === "create") {
								jobProductApi.createJob({
									category: selectedCat.map(
										(item) => item._id
									),
									skill: selectedSkill.map((item) => ({
										...item,
										image: "",
									})),
									description: values.description,
									name: values.name,
									providing_method: values.providing_method,
									finish_estimated_time:
										values.finish_estimated_time,
									lower_bound_fee: values.lower_bound_fee,
									upper_bound_fee: values.upper_bound_fee,
									required_level: values.required_level,
									payment_method: values.payment_method,
									expiration_time: values.expiration_time,
									image: images,
								});
							}
						}}
						enableReinitialize>
						{({ values, setFieldValue, errors }) => {
							return (
								<Form className="divide-y divide-grey-1">
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="name"
												className="font-semibold text-neutral-100">
												Nhập tên công việc
											</label>
											<p className="text-sm text-neutral-60">
												Tên công việc phải được mô tả
												một cách ngắn gọn nhưng vẫn đầy
												đủ ý nghĩa
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormInputText
												name="name"
												placeholder="VD: Thiết kế website bằng Figma"
											/>
											<p className="text-sm text-neutral-60">
												Tối đa 80 ký tự
											</p>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="description"
												className="font-semibold text-neutral-100">
												Mô tả yêu cầu
											</label>
											<p className="text-sm text-neutral-60">
												Mô tả chi tiết yêu cầu tuyển
												dụng
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormTextArea
												name="description"
												className="border p-4 h-32"
												placeholder="Nhập mô tả yêu cầu"
											/>
											<p className="flex justify-between text-sm text-neutral-60">
												<span> Tối đa 500 ký tự </span>
												<span>
													{values.description.length}
													/500
												</span>
											</p>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="price"
												className="font-semibold text-neutral-100">
												Giá cả yêu cầu
											</label>
											<p className="text-sm text-neutral-60">
												Vui lòng nhập mức giá ước tính
												cho yêu cầu
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<label className="inline-flex mb-4 items-center text-base font-semibold text-neutral-100">
												Nhập giá của yêu cầu{" "}
												<HiOutlineInformationCircle />
											</label>{" "}
											<span className="bg-neutral-100 text-sm rounded text-white p-1">
												{" "}
												1000 VNĐ = 1 Bi
											</span>
											<div className="flex items-center gap-3">
												<FormInputTextWithPostfix
													type="number"
													max="100000"
													min="1"
													name="lower_bound_fee"
													placeholder="Nhập giá tối thiểu của yêu cầu"
													icon={
														<Image
															src="/icons/B.svg"
															alt="Bi"
															width="20px"
															height="20px"
														/>
													}
												/>
												<BsDashLg />
												<FormInputTextWithPostfix
													type="number"
													max="100000"
													min="1"
													name="upper_bound_fee"
													placeholder="Nhập giá tối đa của yêu cầu"
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
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="required_level"
												className="font-semibold text-neutral-100">
												Yêu cầu ứng viên
											</label>
											<p className="text-sm text-neutral-60">
												Bạn cần tìm ứng viên có kinh
												nghiệm như thế nào?
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="flex flex-col gap-5">
												<FormCheckBox
													name="required_level"
													value="fresher"
													label="Mới đi làm"
												/>
												<FormCheckBox
													name="required_level"
													value="specialist"
													label="Chuyên viên"
												/>
												<FormCheckBox
													name="required_level"
													value="expert"
													label="Chuyên gia"
												/>
											</div>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="payment_method"
												className="font-semibold text-neutral-100">
												Hình thức trả lương
											</label>
											<p className="text-sm text-neutral-60">
												Bạn sẽ trả lương cho ứng viên
												theo hình thức nào
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="flex flex-col gap-5">
												<FormCheckBoxRadio
													name="payment_method"
													value="pay-per-project"
													label="Trả theo dự án"
												/>
												<FormCheckBoxRadio
													name="payment_method"
													value="pay-per-hour"
													label="Trả theo giờ"
												/>
											</div>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="providing_method"
												className="font-semibold text-neutral-100">
												Hình thức làm việc
											</label>
											<p className="text-sm text-neutral-60">
												Bạn có thể chọn nhiều loại hình
												thức làm việc
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="flex flex-col gap-5">
												<FormCheckBox
													name="providing_method"
													value="online"
													label="Online"
												/>
												<FormCheckBox
													name="providing_method"
													value="offline"
													label="Offline"
												/>
												<FormCheckBox
													name="providing_method"
													value="contract"
													label="Contract"
												/>
												<FormCheckBox
													name="providing_method"
													value="other"
													label="Other"
												/>
											</div>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="category"
												className="font-semibold text-neutral-100">
												Danh mục
											</label>
											<p className="text-sm text-neutral-60">
												Chọn một danh mục công việc
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<label>Chọn danh mục yêu cầu</label>
											<FormMutipleSelect<TCategory>
												array={category}
												selected={selectedCat}
												setSelected={(value) =>
													setSelectedCat(value)
												}
											/>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="finish_estimated_time"
												className="font-semibold text-neutral-100">
												Thời gian dự kiến hoàn thành
											</label>
											<p className="text-sm text-neutral-60">
												Là thời gian cần thiết để người
												thực hiện hoàn thành yêu cầu
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormInputText
												max="59000"
												type="number"
												min={0}
												name="finish_estimated_time"
												// placeholder="Nhập thời gian để hoàn thành yêu cầu"
											/>
											<p className="text-sm text-neutral-60">
												Tính theo ngày
											</p>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="expiration_time"
												className="font-semibold text-neutral-100">
												Thời gian hết hạn
											</label>
											<p className="text-sm text-neutral-60">
												Thời gian hết hạn
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormInputText
												type="date"
												name="expiration_time"
												placeholder="Nhập thời gian để hoàn thành yêu cầu"
											/>
											<p className="text-sm text-neutral-60">
												Tối đa 40 ký tự
											</p>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="title"
												className="font-semibold text-neutral-100">
												Thêm ảnh hoặc video yêu cầu
											</label>
											<p className="text-sm text-neutral-60">
												Bạn có thể thêm 1 hoặc nhiều ảnh
												kèm video đính kèm
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="flex flex-col gap-5">
												<div className="grid grid-cols-3 gap-4">
													{values?.images &&
													values?.images?.length > 0
														? Array.from(
																values?.images
														  ).map(
																(
																	image,
																	index
																) => {
																	console.log(
																		values.images
																	);
																	return (
																		<div
																			key={
																				index
																			}
																			className="col-span-1">
																			<Image
																				src={URL.createObjectURL(
																					image
																				)}
																				alt="img"
																				width="100%"
																				height="100%"
																				layout="responsive"
																				objectFit="cover"
																			/>
																		</div>
																	);
																}
														  )
														: null}
												</div>
											</div>
											<div className="mt-4 p-6 bg-grey border-brand-primary border border-dashed">
												<div className="flex flex-col justify-center items-center">
													<HiOutlineInbox className="text-2xl text-brand-primary" />
													<div>
														<label id="images">
															<p className="text-center font-medium text-base">
																{" "}
																<input
																	className="hidden"
																	multiple
																	id="image"
																	name="image"
																	type="file"
																	accept="image/*"
																	onChange={(
																		e
																	) => {
																		if (
																			e
																				.currentTarget
																				.files
																		) {
																			setFieldValue(
																				"images",
																				e
																					.target
																					.files
																			);
																		}
																	}}
																/>
																Nhấn để thay thế{" "}
																hoặc kéo và thả
																từ file máy tính
																của bạn
															</p>
															<p className="text-base text-center text-neutral-60">
																{" "}
																SVG, PNG, JPG or
																GIF (max
																400x400px)
															</p>
														</label>
														{/* <div className="">{ values?.images?.length > 0 ? Array.from(values?.images).map((item) => {
														return <div>{item.name}</div>
													})
													 : null}
													</div> */}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="title"
												className="font-semibold text-neutral-100">
												Kĩ năng cần thiết
											</label>
											<p className="text-sm text-neutral-60">
												Thêm kĩ năng cần thiết cho yêu
												cầu
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="items-center">
												<span className="text-base font-semibold text-neutral-80 mr-3">
													<FormMutipleSelect<TSkill>
														array={skill}
														selected={selectedSkill}
														setSelected={(value) =>
															setSelectedSkill(
																value
															)
														}
													/>
												</span>
												<p className="ml-auto text-sm text-neutral-60">
													<span className="font-semibold text-neutral-100">
														{selectedSkill.length}
													</span>
													/{skill.length} Tags
												</p>
											</div>
										</div>
									</div>
									<div className="py-6">
										<div className="flex gap-4 justify-end">
											<Button type="button" md secondary>
												Hủy bỏ
											</Button>
											<Button type="submit" md primary>
												Xác nhận
											</Button>
										</div>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
			</div>
		</>
	);
}
CreateRequest.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
