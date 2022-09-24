import jobProductApi from "@/api/jobProductApi";
import Button from "@/components/Button";
import MyListBox from "@/components/MyListBox";
import OfferList from "@/components/OfferList";
import Tag from "@/components/Tag";
import UserLayout from "@/layouts/UserLayout";
import offerApi from "api/offerApi";
import JobCart from "components/JobCart2";
import Head from "next/head";
import {useRouter} from "next/router";
import {ReactElement, useState} from "react";
import {AiOutlineArrowLeft} from "react-icons/ai";

export default function DetailRequest() {
	const router = useRouter();
	const { id } = router.query;
	const { job } = jobProductApi.useItemUserJob(String(id));
	const [filter, setFilter] = useState<{
		page: number;
		limit: number;
		sortBy: string;
	}>({
		page: 1,
		limit: 20,
		sortBy: "create_time"
	});
	const { offerList = [] } = offerApi.useOfferList(filter, String(id));
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "create_time", label: "Cũ nhất" },
		{ value: "-create_time", label: "Mới nhất" },
		{ value: "offer_price", label: "Giá đề nghị tăng dần" },
		{ value: "-offer_price", label: "Giá đề nghị giảm dần" },
		{ value: "offer_finish_estimated_time", label: "Thời gian hoàn thành nhanh nhất" },
		{ value: "-offer_finish_estimated_time", label: "Thời gian hoàn thành lâu nhất" },
	]);
	const [sort, setSort] = useState<string>("name");
	return (
		<>
			<Head>
				<title>Chi tiết yêu cầu</title>
			</Head>
			<div className="bg-white p-6">
				<div className="py-3 mb-6 flex justify-between border-b">
					<span className="text-2xl font-semibold inline">
						Quản lý yêu cầu
					</span>
					<Button
						onClick={() => router.push(`/user/requests`)}
						md
						secondary>
						<AiOutlineArrowLeft /> Quay lại{" "}
					</Button>
				</div>
				<div className="flex gap-10 mb-8">
					<div className="w-3/5">
						<div className="flex flex-wrap gap-3">
							{job?.category?.map((category, index) => (
								<Tag color="yellow" key={index}>
									{category.name}
								</Tag>
							))}
						</div>
						<p className="text-2xl font-bold mt-8">{job?.name}</p>
						<div className="mt-8 text-neutral-80">
							{job?.description || "Chưa có mô tả"}
						</div>
						{job?.skill && job?.skill?.length > 0 && (
							<div className="mt-8">
								<p className="text-2xl font-bold">Kĩ năng</p>
								<div className="flex flex-wrap gap-3 mt-4">
									{job?.skill?.map((skill, index) => (
										<Tag color="primary" key={index}>
											{skill.name}
										</Tag>
									))}
								</div>
							</div>
						)}
					</div>
					<div className="w-4/12">
						<JobCart id={job?._id as string} job={job} />
					</div>
				</div>
			</div>
			<div>
				<div className="flex px-8 items-center bg-white justify-between mt-4 border-b py-4">
					<div className="body-1-semibold text-neutral-100">
						Danh sách báo giá
					</div>
					<div className="mx-12">
						<div className="flex gap-2">
							<div className="font-normal">Sắp xếp theo: </div>
							<MyListBox
								items={sortOptions}
								containerClassName="w-36"
								value={
									sortOptions.find(
										(item) => item.value === sort
									) || sortOptions[0]
								}
								onChange={(value) => {
									setSort(value.value);
									setFilter({...filter, sortBy: value.value})
								}}
							/>
						</div>
					</div>
				</div>
				<OfferList offers={offerList} />
			</div>
		</>
	);
}
DetailRequest.getLayout = (page: ReactElement) => (
	<UserLayout>{page}</UserLayout>
);
