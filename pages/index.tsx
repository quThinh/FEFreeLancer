import Testimonial from "components/Testimonial";
import TopSeniorList from "components/TopSeniorList";
import AuthUtils from "utils/authUtils";
import TCategory from "interfaces/ECategory";
import TClient from "interfaces/EClient";
import TNews from "interfaces/ENews";
import TService from "interfaces/EService";
import Head from "next/head";
import Banner from "components/Banner";
import CategoryList from "components/CategoryList";
import SearchTab from "components/SearchTab";
import ServiceList from "components/ServiceList"
import HorizontalLayout from "layouts/HorizontalLayout";

export async function getStaticProps() {
	const category: TCategory[] = await fetch(
		`${process.env.API_URL}/categories?with-number-of-services=true`
	).then((res) => res.json());
	const hotService: TService[] = await fetch(
		`${process.env.API_URL}/services?page=1&limit=12`
	)
		.then((res) => res.json())
		.then((res) => res.data);
	const sortedCategory = category
		.sort((a, b) => {
			return a.priority - b.priority;
		})
		.slice(0, 4);

	const serviceList1: TService[] = await fetch(
		`${process.env.API_URL}/services?page=1&limit=12&category=${sortedCategory[0].slug}`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	const serviceList2: TService[] = await fetch(
		`${process.env.API_URL}/services?page=1&limit=12&category=${sortedCategory[1].slug}`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	const serviceList3: TService[] = await fetch(
		`${process.env.API_URL}/services?page=1&limit=12&category=${sortedCategory[2].slug}`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	const serviceList4: TService[] = await fetch(
		`${process.env.API_URL}/services?page=1&limit=12&category=${sortedCategory[3].slug}`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	const hotSeniors: TClient[] = await fetch(
		`${process.env.API_URL}/clients?page=1&limit=5`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	const news: TNews[] = await fetch(
		`${process.env.API_URL}/news/public?page=1&limit=4`
	)
		.then((res) => res.json())
		.then((res) => res.data);

	return {
		props: {
			categoryList: category,
			hotServiceList: hotService,
			sortedCategory,
			hotSeniors,
			serviceList1,
			serviceList2,
			serviceList3,
			serviceList4,
			news,
		},
	};
}

export default function Home({
	categoryList = [],
	hotServiceList = [],
	sortedCategory = [],
	serviceList1 = [],
	hotSeniors = [],
	serviceList2 = [],
	serviceList3 = [],
	serviceList4 = [],
	news = [],
}: {
	categoryList?: TCategory[];
	hotServiceList?: TService[];
	hotSeniors?: TClient[];
	sortedCategory?: TCategory[];
	serviceList1?: TService[];
	serviceList2?: TService[];
	serviceList3?: TService[];
	serviceList4?: TService[];
	news?: TNews[];
}) {
	return (
		<>
			<Head>
				<title>Trang chủ</title>
				<meta name="author" content="Truong Quang-Thinh" />
				<meta name="copyright" content="freelancer" />
				<meta name="language" content="vi" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<main>
				{!AuthUtils.isLoggedIn() && <Banner />}
				<div className="container">
					<SearchTab />
				</div>
				<CategoryList categories={categoryList} />
				<div className="container">
					<ServiceList
						title="Dịch vụ nổi bật"
						services={hotServiceList}
					/>
					<TopSeniorList seniors={hotSeniors} />
					<ServiceList
						title={`Dịch vụ ${
							sortedCategory?.length > 0
								? sortedCategory[0].name
								: ""
						}`}
						services={serviceList1}
					/>
					<ServiceList
						title={`Dịch vụ ${
							sortedCategory?.length > 0
								? sortedCategory[1].name
								: ""
						}`}
						services={serviceList2}
					/>
					<ServiceList
						title={`Dịch vụ ${
							sortedCategory?.length > 0
								? sortedCategory[2].name
								: ""
						}`}
						services={serviceList3}
					/>
					<ServiceList
						title={`Dịch vụ ${
							sortedCategory?.length > 0
								? sortedCategory[3].name
								: ""
						}`}
						services={serviceList4}
					/>
					<Testimonial />
				</div>
			</main>
		</>
	);
}
Home.getLayout = function getLayout(page: React.ReactElement) {
	return <HorizontalLayout>{page}</HorizontalLayout>;
};
