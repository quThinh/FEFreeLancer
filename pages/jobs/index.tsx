import categoryApi from "@/api/categoryApi";
import jobProductApi, { IGetPublicJobList } from "@/api/jobProductApi";
import Button from "@/components/Button";
import FormInputText from "@/components/FormInput";
import { Row } from "@/components/Grid";
import JobsList from "@/components/JobsList";
import ListFilter from "@/components/ListFilter";
import ReactPagination from "@/components/ReactPagination";
import SearchTab from "@/components/SearchTab";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import { Listbox } from "@headlessui/react";
import { Form, Formik } from "formik";
import { ProductProvidingMethod } from "interfaces/EProduct";
import Head from "next/head";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { BsDash } from "react-icons/bs";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import slug from "slug";

export default function SearchJobs() {
	const router = useRouter();
	const { query } = router;
	const [filter, setFilter] = useState<IGetPublicJobList>({
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
				required_level: query?.required_level
					? String(query?.required_level)
					: undefined,
				fee_range: query?.fee_range
					? String(query?.fee_range)
					: undefined,
				address: query?.address ? String(query?.address) : undefined,
			});
		}
	}, [query, router.isReady]);
	const {
		jobs = [],
		pagination,
	} = jobProductApi.usePublicJobs(
		router.isReady
			? {
					...filter,
					category: filter?.category,
					providing_method: filter?.providing_method,
					fee_range: filter?.fee_range,
					required_level: filter?.required_level,
			  }
			: null
	);
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "name", label: "Tăng dần A-Z" },
		{ value: "-name", label: "Giảm dần Z-A" },
	]);

	const { data: categories } = categoryApi.useCategory();
	return (
		<div className="container py-4">
			<SearchTab
				province={query?.address ? String(query?.address) : ""}
				category={query?.category ? String(query?.category) : ""}
				keyword={query.name ? String(query?.name) : ""}
			/>
			<Row>
				<div className="col-span-3 lg:block hidden">
					<Formik<{
						category: string[];
						lower_bound_fee: number;
						upper_bound_fee: number;
						work_time: string[];
						job_title: string[];
						providing_method: string[];
					}>
						initialValues={{
							category: filter?.category?.split(",") || [""],
							work_time: [""],
							providing_method:
								filter?.providing_method?.split(",") || [],
							job_title: filter?.required_level?.split(",") || [],
							lower_bound_fee:
								Number(filter?.fee_range?.split("-")[0]) || 0,
							upper_bound_fee:
								Number(filter?.fee_range?.split("-")[1]) ||
								10000000,
						}}
						onSubmit={(values, { setSubmitting }) => {
							setFilter({
								...filter,
								page: 1,
								category: values.category.join(","),
								fee_range: `${values.lower_bound_fee}-${values.upper_bound_fee}`,
								required_level: values.job_title.join(","),
								providing_method:
									values.providing_method.join(","),
							});
							router.push(
								{
									pathname: router.pathname,
									query: queryString.stringify(
										{
											...filter,
											category: values.category.join(","),
											fee_range: `${values.lower_bound_fee}-${values.upper_bound_fee}`,
											required_level:
												values.job_title.join(","),
											providing_method:
												values.providing_method.join(
													","
												),
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
								<div className="w-64 flex flex-col gap-10 mr-16">
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
									<ListFilter
										name="job_title"
										handleSubmit={handleSubmit}
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
											router.push("/jobs");
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
					<div className="flex items-center w-full flex-wrap justify-between">
						<div>
							<p className="text-2xl font-semibold text-neutral-100">
								Tìm kiếm yêu cầu
							</p>
							<p className="text-base font-normal text-neutral-100">
								Tìm thấy{" "}
								<span className="font-semibold text-brand-primary">
									{pagination ? pagination.total : 0} kết quả
								</span>{" "}
								phù hợp với yêu cầu của bạn.
							</p>
						</div>
						<div>
							<Listbox
								as="div"
								className="relative w-64"
								value={filter.sort}
								onChange={(value) =>
									setFilter({
										...filter,
										sort: value,
									})
								}>
								<Listbox.Button className="w-full text-base text-neutral-60 flex items-center">
									<div className="lg:ml-auto">
										<span className="mr-3">Xếp theo: </span>
										<span className="text-neutral-100 cursor-pointer inline-flex items-center">
											{sortOptions.find(
												(item) =>
													item.value === filter.sort
											)?.label || "Chọn xếp theo"}
											<FaAngleDown className="ml-3" />
										</span>
									</div>
								</Listbox.Button>
								<Listbox.Options className="absolute mt-3 right-0 focus:ring-grey focus:outline-none shadow-md text-base text-neutral-80 bg-white w-full z-10">
									{sortOptions.map((option) => (
										<Listbox.Option
											as={Fragment}
											key={option.value}
											value={option.value}>
											{({ selected, active }) => (
												<div
													className={`px-6 py-3 pl-8 ${
														active || selected
															? "bg-brand-tertiary text-brand-primary"
															: ""
													} cursor-pointer relative`}>
													{selected && (
														<FaCheck className="text-brand-primary text-sm inline-block absolute left-2 translate-y-[50%]" />
													)}
													{option.label}
												</div>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Listbox>
						</div>
					</div>
					<div className="mt-8">
						<div>
							<JobsList jobs={jobs} />
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
			</Row>
		</div>
	);
}
SearchJobs.getLayout = (page: ReactElement) => {
	return (
		<HorizontalLayout>
			<Head>
				<title>Tìm kiếm yêu cầu</title>
			</Head>
			<div>{page}</div>
		</HorizontalLayout>
	);
};
