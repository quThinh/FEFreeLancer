import Blog from "@/components/Blog";
import Breadcrumb from "@/components/Breadcrumb";
import NewsAside from "@/components/NewsAside";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import TNews from "interfaces/ENews";
import Head from "next/head";
import { ReactElement } from "react";

export const getServerSideProps = async (ctx: any) => {
	const { id } = ctx.query;
	const news_item = await fetch(
		`${process.env.API_URL}/news/public/${id}`
	).then((res) => res.json());
	const news: TNews[] = await fetch(
		`${process.env.API_URL}/news/public?page=1&limit=4`
	)
		.then((res) => res.json())
		.then((res) => res.data);
	return {
		props: { news_item, news },
	};
};
export default function NewsDetail({
	news_item,
	news,
}: {
	news_item?: TNews[];
	news: TNews[];
}) {
	const createMarkup = (html: string) => {
		return { __html: html };
	};
	return (
		<>
			<Head>
				<title>
					{news_item && news_item.length > 0
						? news_item[0]?.title
						: "Tin tức"}{" "}
					- Niubi
				</title>
			</Head>
			<div className="container py-4">
				<div className="grid sm:grid-cols-12 gap-6">
					<div className="lg:col-span-3 sm:col-span-4 order-2 sm:order-[unset]">
						<NewsAside />
					</div>
					<div className="lg:col-span-9 sm:col-span-8 order-1 sm:order-[unset]">
						<div>
							{news_item && news_item.length > 0 ? (
								<>
									<div className="-ml-4">
										<Breadcrumb
											location={[
												{
													name: "Tin tức",
													path: "/news",
												},
												{
													name: news_item[0]?.title,
													path: `/news/${news_item[0]?._id}`,
												},
											]}
										/>
									</div>
									<div>
										<div className="text-3xl font-semibold text-neutral-100">
											{news_item[0].title}
										</div>
										<div
											className="mt-3"
											dangerouslySetInnerHTML={createMarkup(
												news_item[0].content
											)}></div>
									</div>
								</>
							) : (
								<div className="text-3xl font-semibold text-neutral-100">
									Không tìm thấy bài viết
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-grey">
				<div className="container">
					<Blog news={news} />
				</div>
			</div>
		</>
	);
}
NewsDetail.getLayout = (page: ReactElement) => {
	return (
		<HorizontalLayout>
			<div>{page}</div>
		</HorizontalLayout>
	);
};
