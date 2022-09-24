import Image from "next/image";
import { HiStar } from "react-icons/hi";

interface IItemCommentProps {
	rating?: number;
	comment?: string;
	avatar?: string;
	name?: string;
}
export default function ItemComment({
	rating = 0,
	comment = "Không có bình luận",
	avatar = "/icons/default-avatar.svg",
	name = "",
}: IItemCommentProps) {
	return (
		<div className="bg-grey p-6 flex flex-col gap-2">
			<div className="flex items-center text-lg">
				{[1, 2, 3, 4, 5].map((item) => (
					<HiStar
						key={item}
						className={`${
							item - 1 < rating ? "text-red" : ""
						}`}
					/>
				))}
			</div>
			<div className="font-normal text-base">{comment}</div>
			<div className="flex items-center">
				<Image src={avatar} alt="user-avatar" width={36} height={36} />
				<div className="ml-2">
					<div className="font-medium text-sm">{name}</div>
				</div>
			</div>
		</div>
	);
}
