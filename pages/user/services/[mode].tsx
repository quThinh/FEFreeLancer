import categoryApi from "@/api/categoryApi";
import serviceProductApi from "@/api/serviceProductApi";
import skillApi from "@/api/skillApi";
import Button from "@/components/Button";
import FormCheckBox from "@/components/FormCheckBox2";
import FormInputText from "@/components/FormInput";
import FormInputTextWithPostfix from "@/components/FormInputTextWithPostfix";
import FormMutipleSelect from "@/components/FormMutipleSelect";
import FormTextArea from "@/components/FormTextArea";
import UserLayout from "@/layouts/UserLayout";
import mediaApi from "api/mediaApi";
import { Form, Formik } from "formik";
import TCategory from "interfaces/ECategory";
import TSkill from "interfaces/ESkill";
import { serviceSchema } from "interfaces/EUser";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { BsDash, BsDashLg } from "react-icons/bs";
import {
	HiArrowLeft,
	HiOutlineInbox,
	HiOutlineInformationCircle,
} from "react-icons/hi";
import * as Yup from "yup";

export default function CreateService() {
	const router = useRouter();
	const query = router.query;
	const { mode, id } = query;
	const { data: category = [] } = categoryApi.useCategory();
	const { data: skill = [] } = skillApi.useSkill();
	const { service } = serviceProductApi.useItemUserService(
		String(mode) === "edit" && id ? String(id) : null
	);
	const [selectedCat, setSelectedCat] = useState<TCategory[]>(
		service?.category || []
	);
	const [selectedSkill, setSelectedSkill] = useState<TSkill[]>(
		service?.skill || []
	);

	return (
		<>
			<Head>
				<title>
					{mode === "edit" ? "Sửa dịch vụ" : "Thêm dịch vụ"}
				</title>
				<meta name="robot" content="noindex,nofollow" />
			</Head>
			<div className="bg-white">
				<div className="flex items-center justify-between px-6 py-4">
					<span className="text-neutral-100 text-2xl font-semibold">
						{mode === "edit" ? "Sửa" : "Thêm"} dịch vụ
					</span>
					<Button
						type="button"
						sm
						secondary
						onClick={() => router.push("/user/services")}>
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
									description: "",
									lower_bound_fee: 0,
									upper_bound_fee: 0,
									providing_method: [],
									finish_estimated_time: 0,
									images: null,
									skills: [],
									expiration_time: "",
								},
								mode === "edit" ? service : {}
							) as {
								name: string;
								description: string;
								lower_bound_fee: number;
								upper_bound_fee: number;
								providing_method: string[];
								finish_estimated_time: number;
								images?: FileList | null;
								skills: string[];
								expiration_time: string;
							}
						}
						validationSchema={
							serviceSchema.pick([
								"name",
								"description",
								"lower_bound_fee",
								"upper_bound_fee",
								"images",
								"expiration_time",
								"finish_estimated_time",
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
							var images = [];
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
								serviceProductApi.updateService({
									id: String(id),
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
									expiration_time: values.expiration_time,
									image: images,
								});
							} else if (String(mode) === "create") {
								serviceProductApi.createService(
									{
										category: selectedCat.map(
											(item) => item._id
										),
										skill: selectedSkill.map((item) => ({
											...item,
											image: "",
										})),
										description: values.description,
										name: values.name,
										providing_method:
											values.providing_method,
										finish_estimated_time:
											values.finish_estimated_time,
										lower_bound_fee: values.lower_bound_fee,
										upper_bound_fee: values.upper_bound_fee,
										expiration_time: values.expiration_time,
										image: images,
									},
									() => {
										router.push("/user/services");
									}
								);
							}
						}}
						enableReinitialize>
						{({ values, setFieldValue, resetForm }) => {
							return (
								<Form className="divide-y divide-grey-1">
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="name"
												className="font-semibold text-neutral-100">
												Tiêu đề dịch vụ
											</label>
											<p className="text-sm text-neutral-60">
												Tiêu đề dịch vụ phải được mô tả
												một cách ngắn gọn nhưng vẫn đủ ý
												nghĩa
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
												Mô tả dịch vụ
											</label>
											<p className="text-sm text-neutral-60">
												Mô tả chi tiết dịch vụ bạn đưa
												ra
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormTextArea
												name="description"
												rows={4}
												maxLength={500}
												placeholder="Nhập mô tả dịch vụ"
											/>
											<p className="flex justify-between text-sm text-neutral-60">
												<span>Tối đa 500 ký tự </span>
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
												Giá cả dịch vụ
											</label>
											<p className="text-sm text-neutral-60">
												Vui lòng nhập mức giá ước tính
												cho dịch vụ
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<label className="inline-flex mb-4 items-center text-base font-semibold text-neutral-100">
												Nhập giá của dịch vụ{" "}
												<HiOutlineInformationCircle />
											</label>{" "}
											<span className="bg-neutral-100 text-sm rounded text-white p-1">
												{" "}
												1000 VNĐ = 1 Bi
											</span>
											<div className="flex items-center gap-4">
												<FormInputTextWithPostfix
													type="number"
													max="100000"
													min="1"
													name="lower_bound_fee"
													placeholder="Nhập giá của dịch vụ"
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
													placeholder="Nhập giá của dịch vụ"
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
												htmlFor="providing_method"
												className="font-semibold text-neutral-100">
												Hình thức tư vấn
											</label>
											<p className="text-sm text-neutral-60">
												Bạn có thể chọn nhiều loại hình
												thức tư vấn dịch vụ
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<div className="flex flex-col gap-5">
												<FormCheckBox
													name="providing_method"
													value="online"
													label="Từ xa"
												/>
												<FormCheckBox
													name="providing_method"
													value="offline"
													label="Offline"
												/>
												<FormCheckBox
													name="providing_method"
													value="contract"
													label="Hợp đồng"
												/>
												<FormCheckBox
													name="providing_method"
													value="other"
													label="Khác"
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
												Chọn một danh mục cho dịch vụ
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<label>Chọn danh mục dịch vụ</label>
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
												Là thời gian cần thiết để hoàn
												thành dịch vụ
											</p>
										</div>
										<div className="col-span-7 col-start-5">
											<FormInputText
												max={59000}
												min={0}
												type="number"
												name="finish_estimated_time"
												// placeholder=" Nhập thời gian để hoàn thành dịch vụ"
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
												placeholder=" Nhập thời gian để hoàn thành dịch vụ"
											/>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="images"
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
																) => (
																	<div
																		key={
																			index
																		}
																		className="col-span-1">
																		<Image
																			src={
																				typeof image ===
																				"string"
																					? image
																					: URL.createObjectURL(
																							image
																					  )
																			}
																			alt="img"
																			width="100%"
																			height="100%"
																			layout="responsive"
																			objectFit="cover"
																		/>
																	</div>
																)
														  )
														: null}
												</div>
											</div>
											<label
												id="images"
												className="cursor-pointer">
												<div className="mt-4 p-6 bg-grey border-brand-primary border border-dashed">
													<div className="flex flex-col justify-center items-center">
														<HiOutlineInbox
															size={40}
															className="text-brand-primary"
														/>
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
															hoặc kéo và thả từ
															file máy tính của
															bạn
														</p>
														<p className="text-base text-center text-neutral-60">
															{" "}
															SVG, PNG, JPG or GIF
															(max 400x400px)
														</p>
													</div>
												</div>
											</label>
										</div>
									</div>
									<div className="py-6 grid grid-cols-12 gap-6">
										<div className="col-span-3">
											<label
												htmlFor="skill"
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
											<Button type="reset" md secondary>
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
CreateService.getLayout = (page: ReactElement) => {
	return <UserLayout>{page}</UserLayout>;
};
