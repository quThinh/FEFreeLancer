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
				<title>Chi ti???t ti???n b???i</title>
			</Head>
			<Breadcrumb
				location={[
					{
						path: "/seniors",
						name: "Ti???n b???i",
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
						name={client?.fullname || "Kh??ng x??c ?????nh"}
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
								13 n??m kinh nghi???m UI/UX
							</span>
							<HiOutlineLocationMarker
								width={24}
								height={24}
								className="text-2xl col-span-1"
							/>{" "}
							<span className="col-span-5">
								{client?.address || "Kh??ng x??c ?????nh"}
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
							Gi???i thi???u
						</div>
						<div
							className={`text-sm text-neutral-80 mt-4 ${
								seeMore ? "" : "line-clamp-5"
							}`}>
							<p>
								{client?.introduction || "Ch??a c?? gi???i thi???u"}
							</p>
						</div>
						<div
							className="mt-4 text-status-blue text-base cursor-pointer"
							onClick={() => setSeeMore(!seeMore)}>
							{!seeMore ? "Xem th??m" : "Thu g???n"}
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							K??? n??ng
						</div>
						<div className="flex gap-2 flex-wrap mt-4">
							{client?.skill?.map((skill, index) => (
								<Tag key={index}>{skill.name}</Tag>
							))}
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							?????a ch???
						</div>
						<div className="grid grid-cols-6 gap-2 mt-4">
							<HiOutlineLocationMarker className="col-span-1 text-2xl" />
							<span className="col-span-5 text-status-blue text-sm">
								{client?.address || "Kh??ng x??c ?????nh"}
							</span>
							<HiOutlinePhone className="col-span-1 text-2xl" />
							<span className="col-span-5 text-sm">
								{client?.phone || "Kh??ng x??c ?????nh"}
							</span>
						</div>
					</div>
					<div className="mt-4 p-6 border">
						<div className="text-2xl font-semibold text-neutral-100">
							M???ng x?? h???i
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
								<p>Ch??a c?? m???ng x?? h???i</p>
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
											D???ch v??? cung c???p
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
											Y??u c???u
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
						<p className="text-2xl font-semibold"> ???nh v?? video</p>
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
							M???t s??? ????nh gi?? ng?????i d??ng
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
										'"Ti???n b???i r???t t???n t??m v?? hi???u qu???, v?? c??c chi ti???t trong qu?? tr??nh trang tr?? r???t t???t. Anh ???y ???? cho ch??ng t??i r???t nhi???u g???i ?? c?? gi?? tr??? ????? trang tr?? nh?? c???a. Ch??ng t??i r???t h??i l??ng v?? ?????i ng?? r???t chuy??n nghi???p v?? c?? tr??ch nhi???m, r???t ????ng ????? gi???i thi???u ! "'
									}
									name="Nguy???n V??n A"
									rating={4}
								/>
								<ItemComment
									comment={
										'"Ti???n b???i r???t t???n t??m v?? hi???u qu???, v?? c??c chi ti???t trong qu?? tr??nh trang tr?? r???t t???t. Anh ???y ???? cho ch??ng t??i r???t nhi???u g???i ?? c?? gi?? tr??? ????? trang tr?? nh?? c???a. Ch??ng t??i r???t h??i l??ng v?? ?????i ng?? r???t chuy??n nghi???p v?? c?? tr??ch nhi???m, r???t ????ng ????? gi???i thi???u ! "'
									}
									name="Nguy???n V??n A"
									rating={4}
								/>
							</CustomSlider>
						</div>
					</div>
					<div className="py-8">
						<div className="flex justify-between">
							<span className="text-2xl font-semibold">
								????nh gi?? ng?????i d??ng
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
								D???a tr??n {client?.rate_number || 0} ????nh gi??
							</span>
							<span className="text-status-blue text-sm">
								<Link href="/">
									<a>Chi ti???t</a>
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
										Ch??a c?? ????nh gi?? n??o
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
