import TNews from "interfaces/ENews";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaAngleRight, FaFire } from "react-icons/fa";
import { string } from "yup";

interface IItemBlog {
	news?: TNews;
}
function ItemBlog(props: IItemBlog) {
	const router = useRouter();
	const [errorImage, setErrorImage] = useState(false);
	console.log(string().url().isValid(props?.news?.thumbnail));
	return (
		<div
			className="shadow-md bg-white cursor-pointer"
			onClick={() => router.push(`/news/${props?.news?._id}`)}>
			<div className="w-[100%] relative h-0 pt-[75%] overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-[75%]">
					<Image
						src={
							!errorImage &&
							props?.news?.thumbnail &&
							props?.news?.thumbnail.match(/^http/)
								? props?.news?.thumbnail
								: "/images/placeholder.webp"
						}
						alt="service"
						width="100%"
						height="100%"
						layout="responsive"
						onError={() => setErrorImage(true)}
						objectFit="cover"
					/>
				</div>
			</div>
			<div className="w-[100%] p-[20px] bg-white">
				<div className="w-[71px] text-[12px]  rounded-3xl bg-green/[.12] text-green px-[8px] py-[4px]">
					<FaFire className="inline-block align-top w-[16px] h-[16px]" />
					<span className="">
						{props?.news?.category
							? props.news.category[0].name
							: "Tin tức"}
					</span>
				</div>
				<p className="text-left text-neutral-100 font-[500] mt-4">
					{props?.news?.title ? props.news.title : "Tiêu đề bài viết"}
				</p>
				<div className="mt-4 text-brand-primary text-left">
					<span>Đọc thêm</span>
					<FaAngleRight className="inline-block" />
				</div>
			</div>
		</div>
	);
}
export default ItemBlog;
