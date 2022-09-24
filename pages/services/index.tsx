import categoryApi from "@/api/categoryApi";
import serviceProductApi, {
	IGetPublicServiceList,
} from "@/api/serviceProductApi";
import Button from "@/components/Button";
import FormInputText from "@/components/FormInput";
import ListFilter from "@/components/ListFilter";
import MyListBox from "@/components/MyListBox";
import ReactPagination from "@/components/ReactPagination";
import SearchTab from "@/components/SearchTab";
import ServiceGrid from "@/components/ServiceGrid";
import ItemServiceSkeleton from "@/components/skeleton/ItemServiceSkeleton";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import { Form, Formik } from "formik";
import { ProductProvidingMethod } from "interfaces/EProduct";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import { ReactElement, useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa";

export default function SearchServices() {
	const router = useRouter();
	const { query } = router;
	const { data: categories } = categoryApi.useCategory();
	const [filter, setFilter] = useState<IGetPublicServiceList>({
		page: 1,
		limit: 12,
	});
	useEffect(() => {
		if (router.isReady) {
			setFilter({
				category: query?.category ? String(query?.category) : undefined,
				providing_method: query?.providing_method
					? String(query?.providing_method)
					: undefined,
				page: query?.page ? Number(query?.page) : 1,
				limit: Number(query?.limit) || 12,
				name: query?.name ? String(query?.name) : undefined,
				fee_range: query?.fee_range
					? String(query?.fee_range)
					: undefined,
				address: query?.address ? String(query?.address) : undefined,
			});
		}
	}, [query, router.isReady]);
	const { services, pagination, isLoading } =
		serviceProductApi.usePublicServices(
			router.isReady
				? {
						...filter,
						category: filter?.category,
						providing_method: filter?.providing_method,
						fee_range: filter?.fee_range,
				  }
				: null
		);
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "-create_time", label: "Mới nhất" },
		{ value: "create_time", label: "Cũ nhất" },
		{ value: "lower_bound_fee", label: "Giá tăng dần" },
		{ value: "-lower_bound_fee", label: "Giá giảm dần" },
	]);
	return (
		<div className="container py-4">
			<SearchTab
				province={query?.address && String(query?.address)}
				category={query?.category && String(query?.category)}
				keyword={query?.name && String(query?.name)}
			/>
			<div className="grid grid-cols-12 gap-6">
				<div className="col-span-3 hidden lg:block">
					<Formik<{
						category: string[];
						providing_method: string[];
						lower_bound_fee: number;
						upper_bound_fee: number;
						work_time: string[];
						gender: string[];
						job_title: string[];
					}>
						initialValues={{
							category: filter?.category?.split(",") || [""],
							work_time: [""],
							providing_method: filter?.providing_method?.split(
								","
							) || [""],
							gender: [""],
							job_title: [""],
							lower_bound_fee: 0,
							upper_bound_fee: 100000000,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setFilter({
								...filter,
								page: 1,
								category: values.category.join(","),
								providing_method:
									values.providing_method.join(","),
								fee_range: `${values.lower_bound_fee}-${values.upper_bound_fee}`,
							});
							router.push(
								{
									pathname: router.pathname,
									query: queryString.stringify(
										{
											...filter,
											category: values.category.join(","),
											providing_method:
												values.providing_method.join(
													","
												),
											fee_range: `${values.lower_bound_fee}-${values.upper_bound_fee}`,
										},
										{
											arrayFormat: "comma",
											skipEmptyString: true,
										}
									),
								},
								undefined,
								{
									shallow: true,
								}
							);
							setSubmitting(false);
						}}
						enableReinitialize>
						{({ handleSubmit }) => (
							<Form>
								<div className="flex flex-col gap-10">
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
											<label
												htmlFor="fee_range"
												className="w-32">
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
													onClick={() =>
														handleSubmit()
													}>
													Áp dụng
												</Button>
											</div>
										</div>
									</ListFilter>
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
				</div>
				<div className="col-span-12 lg:col-span-9">
					<div className="flex flex-col lg:flex-row flex-wrap lg:items-center w-full lg:justify-between">
						<div>
							<p className="text-2xl font-semibold text-neutral-100">
								Tìm kiếm dịch vụ
							</p>
							<p className="text-base font-normal text-neutral-100">
								Tìm thấy{" "}
								<span className="font-semibold text-brand-primary">
									{pagination ? pagination.total : 0} kết quả
								</span>{" "}
								phù hợp với yêu cầu của bạn.
							</p>
						</div>
						<div className="flex gap-2">
							<MyListBox
								containerClassName="self-center"
								icon={FaAngleDown}
								buttonClassName="px-2 font-semibold text-base"
								items={sortOptions}
								onChange={(value) => {
									setFilter({
										...filter,
										sort: value.value,
									});
								}}
								value={
									sortOptions.find((item) => {
										return item.value === filter.sort;
									}) || sortOptions[0]
								}
							/>
						</div>
					</div>
					<div className="mt-8">
						<div>
							{isLoading ? (
								<ServiceGrid>
									{[...Array(filter.limit)].map(
										(_, index) => (
											<ItemServiceSkeleton key={index} />
										)
									)}
								</ServiceGrid>
							) : (
								<ServiceGrid services={services} />
							)}
						</div>
					</div>
					<div className="mt-8">
						<ReactPagination
							pageCount={
								pagination
									? Math.ceil(
											pagination?.total / filter.limit
									  )
									: 0
							}
							initialPage={filter.page - 1}
							onPageChange={(page) => {
								setFilter({ ...filter, page });
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
SearchServices.getLayout = (page: ReactElement) => {
	return (
		<HorizontalLayout>
			<Head>
				<title>Tìm kiếm dịch vụ</title>
			</Head>
			<div>{page}</div>
		</HorizontalLayout>
	);
};
