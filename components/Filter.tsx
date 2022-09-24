import categoryApi from "@/api/categoryApi";
import { Form, Formik } from "formik";
import { ProductProvidingMethod } from "interfaces/EProduct";
import { useRouter } from "next/router";
import { BsDash } from "react-icons/bs";
import slug from "slug";
import Button from "./Button";
import FormInputText from "./FormInput";
import ListFilter from "./ListFilter";

interface IFilterProps {
	setFilter: (filter: {
		category: string[];
		providing_method: string[];
		lower_bound_fee: number;
		upper_bound_fee: number;
	}) => void;
	filter?: {
		category?: string[];
		providing_method?: string[];
		lower_bound_fee?: number;
		upper_bound_fee?: number;
	};
}
function Filter(props: IFilterProps) {
	const { data: categories } = categoryApi.useCategory();
	const router = useRouter();
	return (
		<Formik<{
			status: string[];
			category: string[];
			providing_method: string[];
			lower_bound_fee: number;
			upper_bound_fee: number;
			work_time: string[];
			gender: string[];
			job_title: string[];
		}>
			initialValues={{
				status: [""],
				category: props?.filter?.category || [""],
				work_time: [""],
				providing_method: props?.filter?.providing_method || [""],
				gender: [""],
				job_title: [""],
				lower_bound_fee: 0,
				upper_bound_fee: 100000000,
			}}
			onSubmit={(values, { setSubmitting }) => {
				props.setFilter({
					category: values.category,
					providing_method: values.providing_method,
					lower_bound_fee: values.lower_bound_fee,
					upper_bound_fee: values.upper_bound_fee,
				});
				console.log(values);
				setSubmitting(false);
			}}
			enableReinitialize>
			{({ values, handleChange, handleSubmit, resetForm }) => (
				<Form>
					<div className="w-64 flex flex-col gap-10 mr-16">
						<ListFilter
							name="status"
							header="Trạng thái"
							filters={[
								{
									label: "Tất cả",
									value: "all",
								},
								{
									label: "Đã xác thực",
									value: "actived",
								},
							]}
						/>
						<ListFilter
							name="category"
							handleSubmit={handleSubmit}
							header="Danh mục"
							filters={categories?.map((item) => ({
								label: item.name,
								value: item.slug,
							}))}
						/>
						<ListFilter
							name="providing_method"
							header="Hình thức làm việc"
							handleSubmit={handleSubmit}
							filters={[
								{
									label: "Online",
									value: ProductProvidingMethod.ONLINE,
								},
								{
									label: "Offline",
									value: ProductProvidingMethod.OFFLINE,
								},
								{
									label: "Hợp đồng",
									value: ProductProvidingMethod.CONTRACT,
								},
								{
									label: "Khác",
									value: ProductProvidingMethod.OTHER,
								},
							]}
						/>
						<ListFilter
							name="fee_range"
							header="Giá tiền"
							handleSubmit={handleSubmit}
							filters={[]}>
							<div className="mt-4">
								<label htmlFor="fee_range" className="w-32">
									Chọn khoảng giá
								</label>
								<div className="flex flex-col gap-2">
									<div className="flex items-center">
										<FormInputText
											type="number"
											min="0"
											max="100000000"
											className="text-sm"
											name="lower_bound_fee"
											placeholder="Trên"
										/>
										<span className="text-neutral-40">
											<BsDash />
										</span>
										<FormInputText
											type="number"
											min="0"
											max="100000000"
											className="text-sm"
											name="upper_bound_fee"
											placeholder="Dưới"
										/>
									</div>
									<Button
										sm
										secondary
										type="submit"
										onClick={() => handleSubmit()}>
										Áp dụng
									</Button>
								</div>
							</div>
						</ListFilter>
						<ListFilter
							name="work_time"
							header="Thời gian làm việc"
							filters={[
								"Toàn thời gian",
								"Bán thời gian",
								"Từ xa",
								"Hợp đồng",
							].map((item) => ({
								label: item,
								value: slug(item),
							}))}
						/>
						<ListFilter
							name="gender"
							header="Giới tính"
							filters={["Nam", "Nữ", "Khác"].map((item) => ({
								label: item,
								value: slug(item),
							}))}
						/>
						<ListFilter
							name="job_title"
							header="Cấp bậc công việc"
							filters={[
								"Người mới",
								"Thành viên",
								"Chuyên gia",
								"Giám đốc",
								"VIP trở lên",
							].map((item) => ({
								label: item,
								value: slug(item),
							}))}
						/>
						<Button
							md
							secondary
							onClick={() => {
								router.push("/services");
							}}
							type="reset"
							className="w-full">
							Xóa bộ lọc
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
export default Filter;
