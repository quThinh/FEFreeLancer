function generateSiteMap(services, jobs, clients, news) {
	return `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<url>
			<loc>${`${process.env.NEXT_PUBLIC_URL}/`}</loc>
		</url>
		<url>
			<loc>${`${process.env.NEXT_PUBLIC_URL}/about`}</loc>
		</url>
		<url>
			<loc>${`${process.env.NEXT_PUBLIC_URL}/news`}</loc>
		</url>

		${services
			.map(
				(service) => `
			<url>
				<loc>${`${process.env.NEXT_PUBLIC_URL}/service/${service._id}`}</loc>
			</url>
		`
			)
			.join("")}
		${jobs
			.map(
				(job) => `
			<url>
				<loc>${`${process.env.NEXT_PUBLIC_URL}/job/${job._id}`}</loc>
			</url>
		`
			)
			.join("")}
		${clients
			.map(
				(client) => `
			<url>
				<loc>${`${process.env.NEXT_PUBLIC_URL}/job/${client._id}`}</loc>
			</url>
		`
			)
			.join("")}
		${news
			.map(
				(news) => `
			<url>
				<loc>${`${process.env.NEXT_PUBLIC_URL}/news/${news._id}`}</loc>
			</url>
		`
			)
			.join("")}
	</urlset>`;
}

export async function getServerSideProps({ res }) {
	const { data: services = [] } = await fetch(
		`${process.env.API_URL}/services?limit=1000&page=1`
	).then((res) => res.json());
	const { data: jobs = [] } = await fetch(
		`${process.env.API_URL}/jobs?limit=1000&page=1`
	).then((res) => res.json());
	const { data: clients = [] } = await fetch(
		`${process.env.API_URL}/clients?limit=1000&page=1`
	).then((res) => res.json());
	const { data: news = [] } = await fetch(
		`${process.env.API_URL}/news/public?limit=1000&page=1`
	).then((res) => res.json());
	res.setHeader("Content-Type", "text/xml");
	res.write(generateSiteMap(services, jobs, clients, news));
	res.end();
	return {
		props: {},
	};
}
export default function SiteMap() {
	return null;
}
