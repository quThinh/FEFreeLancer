import categoryApi from "@/api/categoryApi";
import clientApi, {IGetClientList} from "@/api/clientApi";
import Button from "@/components/Button";
import {Row} from "@/components/Grid";
import ListFilter from "@/components/ListFilter";
import ReactPagination from "@/components/ReactPagination";
import SearchTab from "@/components/SearchTab";
import SeniorList from "@/components/SeniorList";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import {Form, Formik} from "formik";
import Head from "next/head";
import {useRouter} from "next/router";
import queryString from "query-string";
import {ReactElement, useEffect, useState} from "react";

export default function SearchServices() {
	const router = useRouter();
	const { query } = router;
	const [filter, setFilter] = useState<IGetClientList>({
		page: 1,
		limit: 12,
	});
	useEffect(() => {
		if (router.isReady) {
			setFilter({
				category: query?.category ? String(query?.category) : undefined,
				page: query?.page ? Number(query?.page) : 1,
				limit: Number(query?.limit) || 12,
				name: query?.name ? String(query?.name) : undefined,
				address: query?.address ? String(query?.address) : undefined,
			});
		}
	}, [query, router.isReady]);
	const {
		clients = [],
		pagination,
		isLoading,
		isError,
	} = clientApi.useClientList(
		router.isReady
			? {
					...filter,
					category: filter?.category,
			  }
			: null
	);

	const { data: categories } = categoryApi.useCategory();
	return (
		<div className="container py-4">
			<SearchTab
				province={query?.address ? String(query?.address) : undefined}
				category={query?.category ? String(query?.category) : undefined}
				keyword={query?.name ? String(query?.name) : undefined}
			/>
			<Row>
				<div className="col-span-3 hidden lg:block">
					<Formik<{
						category: string[];
					}>
						initialValues={{
							category: filter?.category?.split(",") || [""],
						}}
						onSubmit={(values, { setSubmitting }) => {
							setFilter({
								...filter,
								page: 1,
								category: values.category.join(","),
							});
							router.push(
								{
									pathname: router.pathname,
									query: queryString.stringify(
										{
											...filter,
											category: values.category.join(","),
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
									<Button
										md
										secondary
										onClick={() => {
											router.push("/seniors");
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
								Tìm kiếm tiền bối
							</p>
							<p className="text-base font-normal text-neutral-100">
								Tìm thấy{" "}
								<span className="font-semibold text-brand-primary">
									{pagination ? pagination.total : 0} kết quả
								</span>{" "}
								phù hợp với yêu cầu của bạn.
							</p>
						</div>
					</div>
					<div className="mt-8">
						<div>
							<SeniorList seniors={clients} />
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
SearchServices.getLayout = (page: ReactElement) => {
	return (
		<HorizontalLayout>
			<Head>
				<title>Tìm kiếm tiền bối</title>
			</Head>
			<div>{page}</div>
		</HorizontalLayout>
	);
};
