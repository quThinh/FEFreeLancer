import Button from "@/components/Button";
import CustomSlider from "@/components/CustomSlider";
import MyListBox from "@/components/MyListBox";
import ReactPagination from "@/components/ReactPagination";
import TableDropdown from "@/components/TableDrodown";
import Tag from "@/components/Tag";
import UserLayout from "@/layouts/UserLayout";
import convertToHTMLDate from "@/utils/convertToHTMLDate";
import {Dialog, Switch, Tab, Transition} from "@headlessui/react";
import {default as serviceApi, default as serviceProductApi} from "api/serviceProductApi";
import userApi from "api/userApi";
import Head from "next/head";
import Image from "next/image";
import {useRouter} from "next/router";
import queryString from "query-string";
import {Fragment, ReactElement, useState} from "react";
import {FaAngleDown, FaEdit, FaStar, FaTrashAlt} from "react-icons/fa";
import {
	HiOutlinePaperClip,
	HiOutlinePencilAlt,
	HiOutlineX
} from "react-icons/hi";
import slug from "slug";

export default function MyService() {
	const [active, setActive] = useState(0);
	const router = useRouter();

	const [sort, setSort] = useState<string>("-create_time");
	const [filter, setFilter] = useState<{
		category?: string;
		page: number;
		limit: number;
		sort?: string;
	}>({
		page: 1,
		limit: 5,
		sort: "-create_time",
	});
	const { user } = userApi.useUser();
	const { userService, isLoading, isError, paginationInfo } =
		serviceApi.useUserServices(filter);
	const param = queryString.stringify(filter);
	const imgArray = [
		"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171",
		"https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
		"https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
		"https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
		"https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170",
	];

	let userServiceActive = userService?.filter(function (e) {
		return e.status <= 2;
	});
	let userServiceInActive = userService?.filter(function (e) {
		return e.status == 3;
	});
	const [id, setId] = useState<string>("");
	const { service: currentService } =
		serviceProductApi.useItemPublicService(id);
	const [isOpen, setIsOpen] = useState(false);
	const [sortOptions] = useState<
		{
			value: string;
			label: string;
		}[]
	>([
		{ value: "-create_time", label: "Mới nhất"},
		{ value: "create_time", label: "Cũ nhất"},
		{ value: "lower_bound_fee", label: "Giá tối thiểu tăng dần"},
		{ value: "-lower_bound_fee", label: "Giá tối thiểu giảm dần"},
		{ value: "name", label: "Tên từ A -> Z"},
	]);
	if (isError) return <div>failed to load</div>;
	if (isLoading) return <div>loading...</div>;

	return (
		<div className="bg-white min-h-full">
			<Head>
				<title>Quản lý dịch vụ</title>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<div className="flex items-center flex-wrap sm:flex-nowrap w-full mt-6 sm:mt-[unset] sm:p-6 justify-between">
				<div>
					<p className="text-2xl font-semibold text-neutral-100">
						Tất cả dịch vụ
					</p>
					<p className="text-base font-normal text-neutral-100 inline">
						Tìm thấy
						<span className="text-base font-semibold text-brand-primary inline">
							{" "}
							{userService?.length} kết quả{" "}
						</span>
						phù hợp với yêu cầu của bạn.
					</p>
				</div>
				<div className="mt-2 mb-6 sm:mt-[unset] sm:mb-[unset]">
					<div className="flex gap-2">
						<MyListBox
							containerClassName="self-center"
							icon={FaAngleDown}
							buttonClassName="px-2 font-semibold text-base"
							items={sortOptions}
							onChange={(value) => {
								setSort(value.value);
								setFilter({...filter, sort: value.value});
								console.log(userService)
							}}
							value={
								sortOptions.find((item) => {
									return item.value === sort;
								}) || sortOptions[0]
							}
						/>
					</div>
				</div>
			</div>
			<div className="overflow-x-auto">
				<Tab.Group>
					<Tab.List className="flex gap-6 smgap-10 sm:px-8 text-base font-semibold text-neutral-60 border-b">
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										onClick={() => setActive(0)}
										className={`cursor-pointer focus:outline-none ${selected
											? "border-b text-neutral-100 border-brand-primary font-bold"
											: ""
											}`}>
										All{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{userService?.length}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										onClick={() => setActive(1)}
										className={`cursor-pointer focus:outline-none ${selected
											? "border-b border-brand-primary text-neutral-100 font-bold"
											: ""
											}`}>
										Đã xét duyệt{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{userServiceActive?.length}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
						<Tab as={Fragment}>
							{({ selected }) => {
								return (
									<div
										onClick={() => setActive(2)}
										className={`cursor-pointer focus:outline-none ${selected
											? "border-b border-brand-primary text-neutral-100 font-bold"
											: ""
											}`}>
										Chưa xét duyệt{" "}
										<div className="text-neutral-40 inline">
											(
											<div className="text-base font-semibold text-brand-primary inline">
												{userServiceInActive?.length}
											</div>
											)
										</div>
									</div>
								);
							}}
						</Tab>
					</Tab.List>
				</Tab.Group>
			</div>
			<div className="p-6">
				<div className="grid grid-cols-12 text-sm text-neutral-60 font-semibold">
					<div className="col-span-6">DỊCH VỤ</div>
					<div className="col-span-2">ĐƠN GIÁ</div>
					<div className="col-span-2">THỜI GIAN TẠO</div>
					<div>HIỂN THỊ</div>
				</div>
				{userService
					?.filter(function (e) {
						if (active === 1) return e.status == 1 || e.status == 2;
						else if (active === 2) return e.status == 0;
						return e;
					})
					?.map((item, index) => {
						return (
							<div
								key={index}
								className="grid items-center my-4 border-y grid-cols-12">
								<div
									className="flex col-span-6 items-center gap-4"
									role="button"
									onClick={() => {
										setIsOpen(true);
										setId(item._id);
									}}>
									<Image
										src={imgArray[0]}
										width={"145px"}
										height={"117px"}
										layout="fixed"
										alt="logo"
									/>
									<div>
										<div className="text-base font-medium text-neutral-100">
											{item.name}
										</div>
										<div className="flex items-center">
											<FaStar className="text-lg text-status-yellow mr-1" />{" "}
											<span className="font-bold">{item.number_of_rate}{" "}</span>
											<span className="text-neutral-60 text-md font-medium ml-2">
												{" "}
												&bull; {item.sold_time} Lượt mua
											</span>
										</div>
									</div>
								</div>
								<div className="gap-1 flex col-span-2 items-center text-status-yellow font-semibold">
									<span>{`${item.lower_bound_fee} - ${item.upper_bound_fee}`}</span>
									<Image
										src="/icons/B.svg"
										width="20px"
										height="20px"
										alt="B-icon"
									/>
								</div>
								<div className="col-span-2 body-5-medium text-neutral-80">
									{convertToHTMLDate(item.create_time)}
								</div>
								<div>
									{item.status !== 3 ? (
										<Switch
											checked={
												item.status === 2 ? true : false
											}
											onChange={async () => {
												await serviceApi.updateServiceStatus(
													item._id
												);
											}}
											className={`h-7 w-12 ${item.status === 2
												? "bg-neutral-40"
												: "bg-brand-primary"
												} rounded-full flex items-center`}>
											<span
												className={`${item.status === 2
													? "translate-x-[2px]"
													: "translate-x-[22px]"
													} inline-block w-6 h-6 rounded-full bg-white`}
											/>
										</Switch>
									) : null}
								</div>
								<TableDropdown
									items={[
										{
											name: "Chỉnh sửa",
											icon: FaEdit,
											function: () =>
												router.push(
													`/user/services/edit?id=${item._id}`
												),
										},
										{
											name: "Sao chép đường dẫn",
											icon: HiOutlinePaperClip,
											function: () => {
												navigator.clipboard.writeText(
													`${
														process.env
															.NEXT_PUBLIC_URL
													}/service/${
														item?.slug ||
														slug(item?.name || "")
													}.${item?._id}`
												);
											},
										},
										{
											name: "Xóa dịch vụ",
											icon: FaTrashAlt,
											function: () => {
												serviceApi.deleteService(
													item._id
												);
											},
										},
									]}
								/>{" "}
							</div>
						);
					})}
			</div>
			<div className="w-full">
				<ReactPagination
					pageCount={
						paginationInfo?.total
							? Math.ceil(paginationInfo.total / filter.limit)
							: 0
					}
					initialPage={filter.page - 1}
					onPageChange={(page) => {
						setFilter({
							...filter,
							page,
						});
					}}
				/>
			</div>
			<Transition show={isOpen}>
				<Dialog
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="z-50 relative">
					<Transition.Child>
						<div className="flex inset-0 fixed bg-black opacity-50"></div>
					</Transition.Child>
					<Transition.Child as={Fragment}>
						<div className="flex py-3 items-center fixed inset-0 justify-center">
							<div className="bg-white w-screen max-w-[72rem] overflow-y-scroll h-5/6 rounded-lg p-6 shadow-lg ">
								<Dialog.Panel>
									<Dialog.Title className="mb-8">
										<div
											className="flex items-center"
											role="button"
											onClick={() => setIsOpen(false)}>
											<div
												onClick={() =>
													router.push(
														`services/edit?id=${currentService?._id}`
													)
												}>
												<Button sm secondary>
													<HiOutlinePencilAlt /> Sửa
													dịch vụ{" "}
												</Button>
											</div>
											<div className="w-9 h-9 ml-auto rounded-full flex items-center justify-center shadow">
												<HiOutlineX size={24} />
											</div>
										</div>
									</Dialog.Title>
									<Dialog.Description>
										<div className="max-w-[900px]">
											<div>
												{currentService?.skill &&
													currentService?.skill
														.length > 0 && (
														<div className="flex flex-wrap gap-2 -mx-2">
															{currentService?.skill.map(
																(item) => (
																	<Tag
																		color="yellow"
																		key={
																			item._id
																		}>
																		{
																			item.name
																		}
																	</Tag>
																)
															)}
														</div>
													)}
											</div>
											<div className="grid gap-2 mt-2">
												<p className="text-[1.625rem] text-neutral-100 font-bold">
													{currentService?.name}
												</p>
												<div className="flex items-center divide-x text-sm divide-border-1">
													<div className="h-[38px] pr-3 flex">
														<div className="mr-2 w-[36px] h-[36px] ">
															<Image
																src={"/work.jpg"}
																alt="media"
																className="rounded-[50%]"
																width={"36px"}
																height={"36px"}
															/>
														</div>
														<div>
															<p className="text-neutral-80 font-[400] m-0">
																{user?.fullname}
															</p>
															<div className="text-center text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
																TOP RATE
															</div>
														</div>
													</div>
													<span className="px-3 flex text-base font-semibold">
														<FaStar className="text-lg mt-1 text-status-yellow mr-1" />
														{user?.rate_number}
													</span>
													<span className="px-3 font-medium">
														3125 đánh giá &bull;{" "}
														{currentService?.sold_time}{" "}
														lượt mua
													</span>
												</div>
												<span className="px-3 flex text-base font-semibold">
													<FaStar className="text-lg mt-1 text-status-yellow mr-1" />
													{currentService?.rate}
												</span>
												<span className="px-3 font-medium">
													{
														currentService?.number_of_rate
													}{" "}
													đánh giá &bull;{" "}
													{currentService?.sold_time}{" "}
													lượt mua
												</span>
											</div>


											{currentService &&
												currentService?.image?.length >
												0 ? (
												<div className="w-full min-h-[700px] mt-8 px-12">
													<CustomSlider
														settings={{
															dots: true,
															arrows: true,
															slidesToShow: 1,
															slidesToScroll: 1,
															dotsClass:
																"custom-slick-dots",
															speed: 500,
															customPaging: (
																i
															) => (
																<span className="cursor-pointer">
																	{" "}
																	<Image
																		src={
																			currentService
																				?.image[
																			i
																			]
																		}
																		alt="media"
																		width={
																			72
																		}
																		height={
																			72
																		}
																	/>
																</span>
															),
														}}>
														{currentService.image.map(
															(img, index) => (
																<div
																	key={index}>
																	<Image
																		src={
																			img
																		}
																		alt="media"
																		width="800px"
																		height="900px"
																		objectFit="cover"
																	/>
																</div>
															)
														)}
													</CustomSlider>
												</div>
											) : null}

											<div className="mt-16">
												<div className="mt-20">
													<p className="text-2xl font-semibold">
														Mô tả
													</p>
													<div className="mt-4">
														<p className="text-base font-normal text-neutral-80">
															{
																currentService?.description
															}
														</p>
														<div className="cursor-pointer flex items-center mt-4 text-base font-normal text-status-blue">
															<FaAngleDown className="text-2xl" />
															Xem thêm
														</div>
													</div>
												</div>
											</div>
										</div>
									</Dialog.Description>
								</Dialog.Panel>
							</div>
						</div>
					</Transition.Child>
				</Dialog>
			</Transition>
		</div>
	);
}
MyService.getLayout = (page: ReactElement) => {
	return (
		<UserLayout>
			<div>{page}</div>
		</UserLayout>
	);
};
