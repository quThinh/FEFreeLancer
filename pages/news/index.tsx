import newsApi, { IGetNewsList } from "@/api/newsApi";
import NewsAside from "@/components/NewsAside";
import NewsGrid from "@/components/NewsGrid";
import ReactPagination from "@/components/ReactPagination";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

export default function SearchServices() {
	const router = useRouter();
	const { query } = router;
	const [filter, setFilter] = useState<IGetNewsList>({
		page: 1,
		limit: 12,
	});
	useEffect(() => {
		if (router.isReady) {
			setFilter({
				category: query?.category ? String(query?.category) : undefined,
				page: query?.page ? Number(query?.page) : 1,
				limit: Number(query?.limit) || 12,
			});
		}
	}, [query, router.isReady]);
	const { news, pagination } = newsApi.useNews(
		router.isReady
			? {
					...filter,
					category: filter?.category
						?.split(",")
						.filter((item) => item.length > 0)
						.join(","),
			  }
			: null
	);
	return (
		<div className="container py-4">
			<div className="flex flex-wrap">
				<div className="lg:w-1/4 lg:pr-6 order-2 w-full lg:order-1">
					<NewsAside />
				</div>
				<div className="lg:w-3/4 w-full order-1 lg:order-2">
					<div className="flex items-center w-full justify-between">
						<div>
							<p className="text-2xl font-semibold text-neutral-100">
								Tin tức sự kiện
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
							<NewsGrid news={news} />
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
				<title>Tin tức</title>
			</Head>
			<div>{page}</div>
		</HorizontalLayout>
	);
};
