import reviewApi, { IGetReviewsOfService } from "@/api/reviewApi";
import serviceProductApi from "@/api/serviceProductApi";
import Breadcrumb from "@/components/Breadcrumb";
import CustomSlider from "@/components/CustomSlider";
import { Row } from "@/components/Grid";
import ItemComment from "@/components/ItemComment";
import ItemReview from "@/components/ItemReview";
import ReactPagination from "@/components/ReactPagination";
import SeniorBriefInfo from "@/components/SeniorBriefInfo";
import ServiceCart from "@/components/ServiceCart";
import { StarRating } from "@/components/StarRating";
import Tag from "@/components/Tag";
import DetailNestedLayout from "@/layouts/DetailNestedLayout";
import HorizontalLayout from "@/layouts/HorizontalLayout";
import TService from "interfaces/EService";
import { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiOutlineChat } from "react-icons/hi";
import { MdImageNotSupported } from "react-icons/md";

// export async function getServerSideProps(context: NextPageContext) {
// 	const { slug } = context.query;
// 	console.log(slug)
// 	const id = slug ? String(slug).split(".")[1] : "";
// 	if (!id) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	const service = await fetch(
// 		`${process.env.API_URL}/services/others/detail/${id}`
// 	)
// 		.then((res) => {
// 			if (res.status === 200) {
// 				return res.json();
// 			}
// 			return null;
// 		})
// 		.catch(() => {
// 			return null;
// 		});
// 	if (!service) {
// 		return {
// 			notFound: true,
// 		};
// 	}
// 	return {
// 		props: {
// 			service,
// 		},
// 	};
// }

export default function DetailService(/*{ service }: { service: TService }*/) {
	const router = useRouter();
	const {query} = router;
	const {slug} = query;
	const id = slug ? String(slug).split(".")[1] : "";
	const [reviewFilter, setReviewFilter] = useState<IGetReviewsOfService>({
		page: 1,
		limit: 12,
		serviceId: id,
	});
	const {service} = serviceProductApi.useItemPublicService(id || null)
	const [isOpenDescription, setIsOpenDescription] = useState(false);
	const { data: reviews = [], paginationInfo } =
		reviewApi.useReviewsOfServices(reviewFilter.serviceId ? reviewFilter : null);
	const [errorLoadingImage, setErrorLoadingImage] = useState(false);
	return (
		<>
			<Head>
				<title>{service?.slug} - Freelancer</title>
			</Head>
			<Breadcrumb
				location={[
					{
						name: "D???ch v???",
						path: "/services",
					},
					{
						name: service?.name || "",
						active: true,
					},
				]}
			/>
			<div className="container pt-6 xs:pt-0">
				<Row>
					<div className="col-span-12 lg:col-span-8">
						<div className="flex flex-wrap gap-2">
							{service?.skill?.map((skill, index) => (
								<Tag key={index} color="yellow">
									{skill.name}
								</Tag>
							))}
						</div>
						<p className="text-[1.625rem] text-neutral-100 font-semibold">
							{service?.name}
						</p>
						<SeniorBriefInfo seniorInfo={service?.user_id} />
						<div className="w-full aspect-w-1 aspect-h-1 mt-8">
							<CustomSlider
								settings={{
									dots: true,
									arrows: true,
									slidesToShow: 1,
									infinite: true,
									slidesToScroll: 1,
									dotsClass: "custom-slick-dots",
									speed: 500,
									customPaging: (i) =>
									service && service?.image?.length > 0 ? (
											<span className="cursor-pointer">
												<Image
													src={service.image[i]}
													alt="media"
													width={72}
													height={72}
												/>
											</span>
										) : (
											<span className="cursor-pointer">
												<div className="w-16 h-16 flex items-center justify-center bg-slate-700"></div>
											</span>
										),
								}}>
								{service && service?.image?.length > 0 &&
								!errorLoadingImage ? (
									service.image.map((img, index) => (
										<div key={index}>
											<Image
												src={img}
												alt="media"
												width={"100%"}
												height={"100%"}
												layout="responsive"
												objectFit="cover"
												onError={() => {
													setErrorLoadingImage(true);
												}}
											/>
										</div>
									))
								) : (
									<div>
										<div className="w-full aspect-w-1 aspect-h-1 bg-slate-700">
											<div className="w-full h-full flex text-neutral-20 flex-col gap-3 items-center justify-center">
												<MdImageNotSupported className=" w-16 h-16" />
												<div>
													Kh??ng th??? t???i h??nh ???nh.
												</div>
											</div>
										</div>
									</div>
								)}
							</CustomSlider>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-4">
						<ServiceCart service={service} />
					</div>
				</Row>
				<Row>
					<div className="mt-[6.75rem] col-span-12 lg:col-span-8">
						<p className="text-2xl font-semibold">
							M???t s??? ????nh ng?????i d??ng
						</p>
						<div className="mt-4">
							<CustomSlider
								settings={{
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
						<div className="mt-9">
							<p className="text-2xl font-semibold">M?? t???</p>
							<div className="mt-4">
								<p
									className={`text-base ${
										isOpenDescription ? "" : "line-clamp-2"
									} font-normal text-neutral-80`}>
									{service?.description}
								</p>
								{!isOpenDescription ? (
									<div
										className="cursor-pointer flex items-center mt-4 text-base font-normal text-status-blue"
										onClick={() =>
											setIsOpenDescription(true)
										}>
										<FaAngleDown className="text-2xl" />
										Xem th??m
									</div>
								) : (
									<div
										className="cursor-pointer flex items-center mt-4 text-base font-normal text-status-blue"
										onClick={() =>
											setIsOpenDescription(false)
										}>
										<FaAngleUp className="text-2xl" />
										Thu g???n
									</div>
								)}
							</div>
							<div className="mt-9">
								<div className="flex items-center gap-2">
									<span className="text-3xl font-bold text-neutral-100">
										{service?.rate}
									</span>
									<span>
										<StarRating rating={service?.rate} />
									</span>
									<span className="text-neutral-60 text-sm">
										D???a tr??n {service?.number_of_rate} ????nh
										gi??
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
							</div>
						</div>
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
				</Row>
			</div>
		</>
	);
}

DetailService.getLayout = (page: ReactElement) => (
	<HorizontalLayout>
		<DetailNestedLayout>{page}</DetailNestedLayout>
	</HorizontalLayout>
);
