import { useState } from "react";
import {
	HiOutlineBriefcase,
	HiOutlineInformationCircle,
	HiOutlineLocationMarker,
	HiSearch,
} from "react-icons/hi";
import Button from "./Button";
import Link from "next/link";

interface ISearchProp {
	entity?: "senior" | "service" | "request";
}

function Search(props: ISearchProp) {
	return (
		<div className="w-[100%] h-[314px] bg-white py-[32px]">
			<div className="container">
				<p className="text-[32px] font-[600] text-left mb-[32px]">
					{props.entity === "service"
						? "Tìm kiếm dịch vụ"
						: props.entity === "senior"
						? "Tìm kiếm tiền bối"
						: "Tìm kiếm yêu cầu"}
				</p>
				<div>
					<div className=" shadow-lg shadow-[#170F490D]">
						<div className="w-[100%] h-[38px] text-center flex">
							<Link href="/service/search-services">
								<a>
									<span
										className={`focus:ring h-[100%] px-[24px] py-[11px] ${

											props.entity === "service"
												? "bg-white text-brand-primary"
												: "bg-grey text-neutral-40"
										} text-[12px] font-[700] cursor-pointer`}>
										DỊCH VỤ
										<HiOutlineInformationCircle className="ml-2 inline-block" />
									</span>
								</a>
							</Link>
							<Link href="/search-seniors">
								<a>
									<span
										className={`focus:ring h-[100%] px-[24px] py-[11px] ${
											props.entity === "senior"
												? "bg-white text-brand-primary"
												: "bg-grey text-neutral-40"
										} text-[12px] font-[700] cursor-pointer`}>
										TIỀN BỐI <HiOutlineInformationCircle className="ml-2 inline-block" />
									</span>
								</a>
							</Link>
							<Link href="/search-request">
								<a>
									<span
										className={`h-[100%] px-[24px] py-[11px] ${
											props.entity === "request"
												? "bg-white text-brand-primary"
												: "bg-grey text-neutral-40"
										} text-[12px] font-[700] cursor-pointer`}>
									YÊU CẦU	
										<HiOutlineInformationCircle className="ml-2 inline-block" />
									</span>
								</a>
							</Link>
						</div>
						<div className="w-[100%] h-[74px] flex p-[12px] gap-[8px] mb-[16px] text-[14px]">
							<div className="h[50px] grow relative pl-[56px] pr-[16px]">
								<HiSearch className="absolute top-[50%] left-[16px] text-[24px] -translate-y-[50%]" />
								<input
									className={`w-[100%] h-[100%] border-b focus:outline-none focus:border-b-brand-primary`}
									placeholder="Từ khóa tìm kiếm"
								/>
							</div>
							<div className="h-[50px] grow relative pl-[56px] pr-[16px]">
								<HiOutlineBriefcase className="absolute top-[50%] left-[16px] text-[24px] -translate-y-[50%]" />
								<select
									className={`w-[100%] h-[100%] border-b bg-white focus:border-white`}>
									<option>Chọn dịch vụ</option>
								</select>
							</div>
							<div className="h-[50px] grow w-[350px] h-[50px] relative pl-[56px] pr-[16px]">
								<HiOutlineLocationMarker className="absolute top-[50%] left-[16px] text-[24px] -translate-y-[50%]" />
								<select
									className={`w-[100%] h-[100%] bg-white border-b focus:outline-none focus:border-b-brand-primary`}>
									<option>Chọn tất cả địa điểm</option>
								</select>
							</div>
							<Button md primary className="ml-auto">
								Tìm kiếm
							</Button>
						</div>
					</div>
					<div className="flex items-center">
						<span className="ml-[32px] text-[14px] text-neutral-100 font-[500]">
							Tìm kiếm phổ biến
						</span>
						<div className="ml-[48px] d-flex items-center text-[14px]">
							<span className="text-neutral-60 mx-[16px]">
								<u>Từ khóa 1</u>
							</span>
							<span className="text-neutral-60 mx-[8px]">
								<u>Từ khóa 2</u>
							</span>
							<span className="text-neutral-60 mx-[8px]">
								<u>Từ khóa 3</u>
							</span>
							<span className="text-neutral-60 mx-[8px]">
								<u>Từ khóa 4</u>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Search;
