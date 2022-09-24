import TReview from "interfaces/EReview";
import Image from "next/image";
import {
	HiOutlineShare,
	HiOutlineThumbDown,
	HiOutlineThumbUp,
} from "react-icons/hi";
import { StarRating } from "./StarRating";
import Tag from "./Tag";

interface ItemReviewProps {
	review: TReview;
}

export default function ItemReview({ review }: ItemReviewProps) {
	return (
		<div className="border-b">
			<div className="flex items-center py-3">
				<div>
					<Image
						src="/icons/default-avatar.svg"
						alt="avatar"
						width={36}
						height={36}
					/>
				</div>
				<div className="ml-4">
					<div className="text-sm font-semibold">{review.reviewer_id.fullname}</div>
					<div className="text-xs text-gray-600">{}</div>
				</div>
			</div>
			<div>
				<div>
					<StarRating rating={5} />
				</div>
				<div className="flex gap-4 mt-2">
					<Image src="/work.jpg" alt="work" width={80} height={80} />
				</div>
				<div className="mt-2">
					<p className="text-base text-neutral-80">
						{review.content}
					</p>
				</div>
			</div>
			<div className="mt-2 py-2">
				<div className="flex items-center text-sm text-neutral-60">
					<div>
						<span
							role="button"
							className="inline-flex items-center gap-2">
							<HiOutlineThumbUp />
							Thích
						</span>
						<span
							role="button"
							className="inline-flex items-center ml-3 gap-2">
							<HiOutlineThumbDown />
							Không thích
						</span>
					</div>
					<div className="ml-auto">
						<span
							role="button"
							className="inline-flex items-center gap-2">
							<HiOutlineShare />
							Chia sẻ
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
