import TCategory from "interfaces/ECategory";
import TNews from "interfaces/ENews";
import Head from "next/head";
import { ReactElement } from "react";
import Blog from "../components/Blog";
import CategoryList from "../components/CategoryList";
import SearchTab from "../components/SearchTab";
import HorizontalLayout from "../layouts/HorizontalLayout";

export async function getStaticProps() {
	const category: TCategory[] = await fetch(
		`${process.env.API_URL}/categories`
	).then((res) => res.json());

	const news: TNews[] = await fetch(
		`${process.env.API_URL}/news/public?page=1&limit=4`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	return {
		props: {
			categoryList: category,
			news,
		},
	};
}

export default function Services({
	categoryList = [],
	news = [],
}: {
	categoryList: TCategory[];
	news: TNews[];
}) {
	return (
		<>
			<Head>
				<title>Danh mục</title>
			</Head>
			<main>
				<div className="container">
					<SearchTab />
				</div>
				<CategoryList categories={categoryList} all />
				<div className="container p-2 mx-auto">
					<Blog news={news} />
				</div>
			</main>
		</>
	);
}
Services.getLayout = (page: ReactElement) => (
	<HorizontalLayout>{page}</HorizontalLayout>
);
