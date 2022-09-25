import categoryApi from "@/api/categoryApi";
import geoApi from "@/api/geoApi";
import { Tab } from "@headlessui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import queryString from "query-string";
import { Fragment, useEffect, useState } from "react";
import {
	HiOutlineBriefcase,
	HiOutlineClipboardList,
	HiOutlineInformationCircle,
	HiOutlineLocationMarker,
	HiOutlineUser,
	HiSearch,
} from "react-icons/hi";
import Button from "./Button";
import FormInputText from "./FormInput";
import FormSelect from "./FormSelect";

interface SearchTabProps {
	tab?: number;
	category?: string;
	keyword?: string;
	province?: string;
}

export default function SearchTab({
	category = "",
	keyword = "",
	province = "",
}: SearchTabProps) {
	const router = useRouter();
	const [selectedTab, setSelectedTab] = useState(0);
	useEffect(() => {
		if (router.isReady) {
			if (router.pathname.includes("/services")) {
				setSelectedTab(0);
			} else if (router.pathname.includes("/seniors")) {
				setSelectedTab(1);
			} else if (router.pathname.includes("/jobs")) {
				setSelectedTab(2);
			}
		}
	}, [router.isReady, router.pathname]);
	const tabs = [
		{ label: "Dịch vụ", value: "services" },
		{ label: "Tiền bối", value: "seniors" },
		{ label: "Yêu cầu", value: "jobs" },
	];

	const { data: categories = [] } = categoryApi.useCategory();
	const { provinces = [] } = geoApi.useProvinces();
	return (
		<div className="py-8">
			<p className="mb-8 sm:text-3xl sm:text-left text-2xl text-center font-bold text-neutral-100">
				Tìm kiếm {tabs[selectedTab].label.toLowerCase()}
			</p>
			<Tab.Group
				as="div"
				className="shadow-md"
				selectedIndex={selectedTab}>
				<Tab.List className="text-xs flex">
					{tabs.map((tab, index) => (
						<Tab as={Fragment} key={index}>
							{({ selected }) => (
								<button
									onClick={() => setSelectedTab(index)}
									className={`font-bold focus:outline-none h-[100%] px-6 py-2.5 w-full sm:w-[unset] ${
										selected
											? "bg-white text-brand-primary"
											: "bg-grey text-neutral-40"
									}`}>
									<span className="hidden xs:inline-block">
										{tab.label.toUpperCase()}
									</span>
									<HiOutlineInformationCircle className="ml-2 xs:inline-block hidden" />
									{tab.label === "Dịch vụ" && (
										<HiOutlineBriefcase className="xs:hidden ml-2 inline-block" />
									)}
									{tab.label === "Tiền bối" && (
										<HiOutlineUser className="xs:hidden ml-2 inline-block" />
									)}
									{tab.label === "Yêu cầu" && (
										<HiOutlineClipboardList className="xs:hidden ml-2 inline-block" />
									)}
								</button>
							)}
						</Tab>))}
				</Tab.List>
				<Formik
					initialValues={{
						keyword: keyword,
						address: province,
						category: category,
					}}
					enableReinitialize
					onSubmit={(values) => {
						const _query = queryString.stringify(
							{
								name: values.keyword.trim(),
								address: values.address,
								category: values.category,
							},
							{ skipEmptyString: true }
						);
						switch (tabs[selectedTab].value) {
							case "services":
								router.push({
									pathname: `/services`,
									query: _query,
								});
								break;
							case "seniors":
								router.push({
									pathname: `/seniors`,
									query: _query,
								});
								break;
							case "jobs":
								router.push({
									pathname: `/jobs`,
									query: _query,
								});
								break;
							default:
								break;
						}
					}}>
					<Form>
						<div className="flex lg:items-center flex-col gap-2 lg:gap-0 lg:flex-row p-[12px] mb-[16px] text-[14px]">
							<div className="py-3 grow relative pl-[56px] pr-[16px]">
								<HiSearch className="absolute top-[50%] left-[16px] text-[24px] -translate-y-[50%]" />
								<FormInputText
									name="keyword"
									className={`p-3 w-full !border-x-white !border-t-white border-b !focus:outline-none !focus:border-b-brand-primary`}
									placeholder="Từ khóa tìm kiếm"
								/>
							</div>
							<div className="py-3 grow relative pl-[56px] pr-[16px]">
								<HiOutlineBriefcase className="absolute top-[50%] left-[16px] text-[24px] -translate-y-[50%]" />
								<FormSelect
									name="category"
									defaultValue={category}
									options={[
										{
											value: "",
											label: "Chọn danh mục",
										},
										...categories.map((item) => ({
											label: item.name,
											value: item.slug,
										})),
									]}
									className={`border-x-white border-t-white`}
								/>
							</div>
							<Button md primary className="grow md:grow-0">
								Tìm kiếm
							</Button>
						</div>
					</Form>
				</Formik>
			</Tab.Group>
		</div>
	);
}
