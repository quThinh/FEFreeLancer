import clientApi from "@/api/clientApi";
import jobProductApi from "@/api/jobProductApi";
import reviewApi, {IGetReviewsOfClient} from "@/api/reviewApi";
import serviceProductApi from "@/api/serviceProductApi";
import userApi from "@/api/userApi";
import Breadcrumb from "@/components/Breadcrumb";
import CustomSlider from "@/components/CustomSlider";
import ItemComment from "@/components/ItemComment";
import ItemReview from "@/components/ItemReview";
import JobsList from "@/components/JobsList";
import Profiles from "@/components/Profiles";
import ReactPagination from "@/components/ReactPagination";
import ServiceGrid from "@/components/ServiceGrid";
import {StarRating} from "@/components/StarRating";
import Tag from "@/components/Tag";
import DetailNestedLayout from "@/layouts/DetailNestedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import {Tab} from "@headlessui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import {Fragment, ReactElement, useState} from "react";
import {FaPercentage} from "react-icons/fa";
import {
	HiOutlineChat,
	HiOutlineClock,
	HiOutlineLink,
	HiOutlineLocationMarker,
	HiOutlinePhone, HiOutlineUsers
} from "react-icons/hi";
import createTime from '../../utils/createTime';

export default function DetailSenior() {
	const [servicePage, setServicePage] = useState(1);
	const [limit] = useState(12);
	const [requestPage, setRequestPage] = useState(1);
	const router = useRouter();
	const { id } = router.query;
	const { client } = clientApi.useItemClient(String(id));
	const { user } = userApi.useUser();
	const isUserView = user && client && user._id === client._id;
	const { services = [], pagination: servicePagination } =
		serviceProductApi.usePublicServices({
			user_id: String(id),
			page: servicePage,
			limit: limit,
		});
	const { jobs = [], pagination: requestPagination } =
		jobProductApi.usePublicJobs({
			user_id: String(id),
			page: requestPage,
			limit: limit,
		});
	const [reviewFilter, setReviewFilter] = useState<IGetReviewsOfClient>({
		page: 1,
		limit: 12,
		user_id: client?._id || "",
	});
	const { data: reviews = [], paginationInfo } = reviewApi.useReviewsOfUser(
		client?._id ? reviewFilter : null
	);
	const [seeMore, setSeeMore] = useState(false);
	return (
		<>
			<Head>
				<title>Chi tiết tiền bối</title>
			</Head>
			<Breadcrumb
				location={[
					{
						path: "/seniors",
						name: "Tiền bối",
					},
					{
						name: client?.fullname || "",
						active: true,
					},
				]}
			/>
			<div className="flex container gap-8">
				<div className="w-full lg:w-1/3">
					<Profiles
						name={client?.fullname || "Không xác định"}
						numEvaluation={client?.rate_number || 0}
						rating={client?.rate_star || 0}
						isUserView={!isUserView}
						isVerified={client?.status === 1}
						email={client?.email || ""}
					/>
					<div className="p-6 border mt-4">
						<div className="grid items-center grid-cols-6 gap-2 text-sm text-neutral-80">
							<FaPercentage
								width={24}
								height={24}
								className="text-2xl col-span-1"
							/>{" "}
							<span className="col-span-5">
								{client?.successful_rate || 0} %
							</span>
							<HiOutlineClock
								width={24}
								height={24}
								className="text-2xl"
							/>{" "}
							<span className="col-span-5">
								13 năm kinh nghiệm UI/UX
							</span>
							<HiOutlineLocationMarker
								width={24}
								height={24}
								className="text-2xl col-span-1"
							/>{" "}
							<span className="col-span-5">
								{client?.address || "Không xác định"}
							</span>
							<HiOutlineUsers
								width={24}
								height={24}
								className="text-2xl col-span-1"
							/>{" "}
							<span className="col-span-5">
								Tham gia {createTime(client?.create_time || "")}
							</span>
						</div>
					</div>
					<div className="p-6 border mt-4">
						<div className="text-2xl font-semibold text-neutral-100">
							Giới thiệu
						</div>
						<div
							className={`text-sm text-neutral-80 mt-4 ${
								seeMore ? "" : "line-clamp-5"
							}`}>
							<p>
								{client?.introduction || "Chưa có giới thiệu"}
							</p>
						</div>
						<div
							className="mt-4 text-status-blue text-base cursor-pointer"
							onClick={() => setSeeMore(!seeMore)}>
							{!seeMore ? "Xem thêm" : "Thu gọn"}
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							Kỹ năng
						</div>
						<div className="flex gap-2 flex-wrap mt-4">
							{client?.skill?.map((skill, index) => (
								<Tag key={index}>{skill.name}</Tag>
							))}
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							Địa chỉ
						</div>
						<div className="grid grid-cols-6 gap-2 mt-4">
							<HiOutlineLocationMarker className="col-span-1 text-2xl" />
							<span className="col-span-5 text-status-blue text-sm">
								{client?.address || "Không xác định"}
							</span>
							<HiOutlinePhone className="col-span-1 text-2xl" />
							<span className="col-span-5 text-sm">
								{client?.phone || "Không xác định"}
							</span>
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							Mạng xã hội
						</div>
						{client && client?.social_media_contact?.length > 0 ? (
							client?.social_media_contact.map(
								(social, index) => (
									<div
										key={index}
										className="flex gap-2 mt-4">
										<HiOutlineLink className="text-2xl" />
										<span className="text-sm text-status-blue">
											<Link
												href={social.link}
												target="_blank">
												<a>{social.link}</a>
											</Link>
										</span>
									</div>
								)
							)
						) : (
							<div className="text-sm text-neutral-80 mt-4">
								<p>Chưa có mạng xã hội</p>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-col w-3/4 gap-4 divide-y divide-grey-1">
					<div className="pb-8">
						<Tab.Group>
							<Tab.List className="border-b text-neutral-60">
								<Tab as={Fragment}>
									{({ selected }) => (
										<button
											className={`py-2 focus:outline-none text-base font-semibold  ${
												selected
													? "border-b-2  border-status-blue text-neutral-100"
													: ""
											}`}>
											Dịch vụ cung cấp
										</button>
									)}
								</Tab>

								<Tab as={Fragment}>
									{({ selected }) => (
										<button
											className={`py-2 ml-8 focus:outline-none text-base font-semibold  ${
												selected
													? "border-b-2 border-status-blue text-neutral-100"
													: ""
											}`}>
											Yêu cầu
										</button>
									)}
								</Tab>
							</Tab.List>
							<Tab.Panels className="mt-4">
								<Tab.Panel>
									<ServiceGrid services={services} />
									<div className="mt-4">
										<ReactPagination
											pageCount={
												servicePagination
													? Math.ceil(
															servicePagination.total
													  ) / limit
													: 0
											}
											initialPage={servicePage - 1}
											onPageChange={(page) => {
												setServicePage(page);
											}}
										/>
									</div>
								</Tab.Panel>
								<Tab.Panel>
									<JobsList jobs={jobs} />
									<ReactPagination
										pageCount={
											requestPagination
												? Math.ceil(
														requestPagination.total
												  ) / limit
												: 0
										}
										initialPage={requestPage - 1}
										onPageChange={(page) => {
											setRequestPage(page);
										}}
									/>
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div>
					<div className="py-8">
						<p className="text-2xl font-semibold"> Ảnh và video</p>
						<div className="mt-4 flex gap-4">
							<Image
								src="/work.jpg"
								alt="work"
								width={144}
								height={144}
								objectFit={"cover"}
							/>
							<Image
								src="/work.jpg"
								alt="work"
								width={144}
								height={144}
								objectFit={"cover"}
							/>
							<Image
								src="/work.jpg"
								alt="work"
								width={144}
								height={144}
								objectFit={"cover"}
							/>
							<Image
								src="/work.jpg"
								alt="work"
								width={144}
								height={144}
								objectFit={"cover"}
							/>
							<Image
								src="/work.jpg"
								alt="work"
								width={144}
								height={144}
								objectFit={"cover"}
							/>
						</div>
					</div>
					<div className="py-8">
						<p className="text-2xl font-semibold">
							Một số đánh giá người dùng
						</p>
						<div className="mt-4">
							<CustomSlider
								settings={{
									infinite: true,
									slidesToShow: 1,
									slidesToScroll: 1,
									arrows: true,
								}}>
								<ItemComment
									comment={
										'"Tiền bối rất tận tâm và hiệu quả, và các chi tiết trong quá trình trang trí rất tốt. Anh ấy đã cho chúng tôi rất nhiều gợi ý có giá trị để trang trí nhà cửa. Chúng tôi rất hài lòng và đội ngũ rất chuyên nghiệp và có trách nhiệm, rất đáng để giới thiệu ! "'
									}
									name="Nguyễn Văn A"
									rating={4}
								/>
								<ItemComment
									comment={
										'"Tiền bối rất tận tâm và hiệu quả, và các chi tiết trong quá trình trang trí rất tốt. Anh ấy đã cho chúng tôi rất nhiều gợi ý có giá trị để trang trí nhà cửa. Chúng tôi rất hài lòng và đội ngũ rất chuyên nghiệp và có trách nhiệm, rất đáng để giới thiệu ! "'
									}
									name="Nguyễn Văn A"
									rating={4}
								/>
							</CustomSlider>
						</div>
					</div>
					<div className="py-8">
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">
								Đánh giá người dùng
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-3xl font-bold text-neutral-100">
								{client?.rate_star}
							</span>
							<span>
								<StarRating rating={client?.rate_star} />
							</span>
							<span className="text-neutral-60 text-sm">
								Dựa trên {client?.rate_number || 0} đánh giá
							</span>
							<span className="text-status-blue text-sm">
								<Link href="/">
									<a>Chi tiết</a>
								</Link>
							</span>
						</div>
						<div className="mt-4 border-t">
							<div className="flex flex-col">
								{reviews.length > 0 ? (
									reviews.map((review, index) => (
										<ItemReview
											key={index}
											review={review}
										/>
									))
								) : (
									<div className="flex items-center flex-col justify-center text-neutral-40 my-3 text-neutral-80 h-32">
										<HiOutlineChat className="text-4xl" />
										Chưa có đánh giá nào
									</div>
								)}
							</div>
						</div>
						<div className="mt-3">
							<ReactPagination
								pageCount={
									paginationInfo?.total
										? Math.ceil(
												paginationInfo.total /
													reviewFilter.limit
										  )
										: 0
								}
								initialPage={1}
								onPageChange={(page) => {
									setReviewFilter({
										...reviewFilter,
										page: page,
									});
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

DetailSenior.getLayout = (page: ReactElement) => (
	<HorizontalLayout>
		<DetailNestedLayout>{page}</DetailNestedLayout>
	</HorizontalLayout>
);
