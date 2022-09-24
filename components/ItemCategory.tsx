import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Image from "next/image";
import { useRouter } from "next/router";
import TCategory, { categorySchema } from "interfaces/ECategory";

interface IService {
	category?: TCategory;
}

function Service({ category = categorySchema.getDefault() }: IService) {
	const router = useRouter();
	return (
		<div
			className="p-4 bg-light border border-[#D6DDEB] cursor-pointer"
			onClick={() => {
				router.push({
					pathname: router.basePath + `/services`,
					query: {
						category: [category.slug],
					},
				});
			}}>
			<div className="w-9 h-9">
				<Image
					priority={true}
					width={36}
					height={36}
					src={category?.image || "/images/an-uong.svg"}
					alt="service-icon"
				/>
			</div>
			<p className="text-base font-semibold text-neutral-100 pt-[18px] text-left">
				{category.name}
			</p>
			<div className="flex justify-between pt-[14px]">
				<p className="text-base font-normal text-neutral-60">
					{category.number_of_service}
				</p>
				<a href="#" className="pr-2 hover:cursor-pointer">
					<HiOutlineArrowNarrowRight className="text-neutral-100 text-2xl" />
				</a>
			</div>
		</div>
	);
}

export default Service;
