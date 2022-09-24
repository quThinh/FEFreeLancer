import Tag from "@/components/Tag";
import DetailNestedLayout from "@/layouts/DetailNestedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import { NextPageContext } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import Head from "next/head";
import { ReactElement } from "react";
import JobCart from "@/components/JobCart";
import ServiceList from "@/components/ServiceList";
import { useRouter } from "next/router";
import TJob from "interfaces/EJob";
import TService from "interfaces/EService";

export async function getServerSideProps(context: NextPageContext) {
	const { slug } = context.query;
	const job = await fetch(
		`${process.env.API_URL}/jobs/others/detail/${String(slug)}`
	).then((res) => res.json());
	const categories = job?.category?.join(",");
	const { data: services = [] } = await fetch(
		`${process.env.API_URL}/services?page=1&limit=10&category=${categories}`
	).then((res) => res.json());
	return {
		props: {
			job,
			services,
		},
	};
}

export default function DetailRequest({
	job,
	services = [],
}: {
	job: TJob;
	services: TService[];
}) {
	const router = useRouter();
	const { slug } = router.query;
	return (
		<>
			<Head>
				<title>Chi tiết yêu cầu</title>
			</Head>
			<Breadcrumb
				location={[
					{
						name: "Yêu cầu",
						path: "/jobs",
					},
					{
						name: job.name,
						active: true,
					},
				]}
			/>
			<div className="grid grid-cols-12 container">
				<div className="lg:col-span-7 col-span-12">
					<div className="flex gap-3">
						{job?.category?.map((skill, index) => (
							<Tag color="yellow" key={index}>
								{skill.name}
							</Tag>
						))}
					</div>
					<p className="text-2xl font-bold mt-8">{job?.name}</p>
					<div className="mt-8 text-neutral-80">
						{job?.description || "Chưa có mô tả"}
					</div>
					{job?.skill && job.skill.length > 0 ? (
						<div className="mt-8">
							<p className="text-2xl font-bold">Kỹ năng</p>
							<div className="flex flex-wrap gap-3 mt-4">
								{job?.skill?.map((skill, index) => (
									<Tag color="primary" key={index}>
										{skill.name}
									</Tag>
								))}
							</div>
						</div>
					) : null}
				</div>
				<div className="lg:col-span-4 lg:col-start-9 col-span-12">
					<JobCart id={String(slug)} job={job} />
				</div>
			</div>
			<div className="bg-grey mt-8">
				<div className="container -mb-8">
					<ServiceList
						services={services}
						title="Dịch vụ liên quan"
					/>
				</div>
			</div>
		</>
	);
}
DetailRequest.getLayout = (page: ReactElement) => (
	<HorizontalLayout>
		<DetailNestedLayout>{page}</DetailNestedLayout>
	</HorizontalLayout>
);
