import Image from "next/image";
import { ReactElement } from "react";
import HorizontalLayout from "../layouts/HorizontalLayout";
import TeamMember from "@/components/TeamMember";
import { FiCheck } from "react-icons/fi";
import Head from "next/head";
import Link from "next/link";

export default function About() {
	return (
		<div className="container py-8 h-full">
			<Head>
				<title>Về Freelancer</title>
			</Head>
			<div className="flex lg:h-[40rem] sm:h-[36rem] justify-between sm:flex-row flex-col">
				<div className="lg:w-1/3 sm:w-1/2 w-full flex items-start justify-center flex-col gap-4 lg:ml-8 xl:ml-[unset] sm:ml-2 translate-y-[-48px]">
					<div className="sm:text-[3rem] font-bold text-[2.4rem] mt-8 sm:mt-[unset]">
						Nền tảng kết nối việc làm 
					</div>
					<div className="font-normal sm:text-xl text-lg">
						Một nền tảng phi tập trung cho sự thay đổi, tìm kiếm các
						tiền bối với nhiều kinh nghiệm trong các lĩnh vực hàng
						đầu có thể giúp bạn nhiều hơn nữa trong công việc lẫn
						cuộc sống
					</div>
					<Link href="/auth/login">
						<a className="btn btn-primary btn-lg">Tham gia ngay</a>
					</Link>
				</div>

				<div className="sm:w-1/2 w-full">
					<div className="bg-gradient-to-r relative w-full h-[32rem] from-[#D8F9EF] via-[#D9F9EF] to-[#D6E0FC]">
						<div className="w-full h-[36rem] overflow-hidden absolute top-10 left-10">
							<div className="w-full h-full">
								<Image
									src="/images/homepage.png"
									alt="niubi-home-page"
									width="100%"
									height="100%"
									layout="responsive"
									objectFit="cover"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid sm:grid-cols-2 grid-cols-1 mt-4 mb-6">
				<div className="flex items-center order-2 sm:order-[unset] mt-12 sm:mt-[unset] mb-12 sm:mb-[unset]">
					<Image
						src="/images/about_image.png"
						className="object-fit object-center"
						alt="niubi-about-image"
						width={553}
						height={473}
					/>
				</div>

				<div className="xl:pl-20 lg:pl-10 pr-2 py-6 order-1 sm:order-[unset]">
					<h1 className="sm:text-5xl font-bold mt-6 text-[2.4rem]">
						Phát triển hơn thế nữa
					</h1>
					<p className="sm:text-[18px] text-lg text-neutral-60 pr-10 mt-8 mb-4">
						Tham gia các cộng đồng dành riêng cho các nguyên nhân
						bạn đam mê, gây quỹ cho kho bạc thay đổi thế giới của
						bạn và bỏ phiếu cho các dự án nào nhận được số tiền họ
						cần để tạo ra tác động.
					</p>
					<ul>
						<li className="py-3 sm:text-[18px] text-lg text-neutral-100 border-b border-[#EFF0F6] flex items-center">
							<div className="bg-[#28A745]/[0.2] w-[24px] h-[24px] flex justify-center items-center rounded-[50%]">
								<FiCheck className="text-[#28a745]" />
							</div>
							<span className="ml-2">
								Aliquid delectus animi pariatur ut.
							</span>
						</li>
						<li className="py-3 sm:text-[18px] text-lg text-neutral-100 border-b border-[#EFF0F6] flex items-center">
							<div className="bg-[#28A745]/[0.2] w-[24px] h-[24px] flex justify-center items-center rounded-[50%]">
								<FiCheck className="text-[#28a745]" />
							</div>
							<span className="ml-2">
								Ipsum architecto et eaque.
							</span>
						</li>
						<li className="py-3 sm:text-[18px] text-lg text-neutral-100 border-b border-[#EFF0F6] flex items-center">
							<div className="bg-[#28A745]/[0.2] w-[24px] h-[24px] flex justify-center items-center rounded-[50%]">
								<FiCheck className="text-[#28a745]" />
							</div>
							<span className="ml-2">
								Enim qui inventore sequi quaerat est soluta.
							</span>
						</li>
						<li className="py-3 sm:text-[18px] text-lg text-neutral-100 flex items-center">
							<div className="bg-[#28A745]/[0.2] w-[24px] h-[24px] flex justify-center items-center rounded-[50%]">
								<FiCheck className="text-[#28a745]" />
							</div>
							<span className="ml-2">
								Hic quibusdam beatae totam est fugit.
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="flex items-center flex-col mt-16">
				<h1 className="sm:text-5xl font-bold sm:mb-6 text-[2.4rem]">
					Meet the team
				</h1>
				<div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2">
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
					<TeamMember
						name="Phúc Nguyễn"
						job="Design UX/UI"
						description="Mollitia quos quasi officiis voluptate. Dolor suscipit officiis maiores. Ab deserunt sed dolores sed totam. Est consequatur sint rerum asperiores"
					/>
				</div>
			</div>
		</div>
	);
}
About.getLayout = (page: ReactElement) => {
	return <HorizontalLayout>{page}</HorizontalLayout>;
};
