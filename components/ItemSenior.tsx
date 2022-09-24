import ISenior from "interfaces/EClient";
import Image from "next/image";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi";
import BadgeReputation from "./BadgeReputation";
import BadgeVerify from "./BadgeVerify";
import Button from "./Button";
import { StarRating } from "./StarRating";
import Tag from "./Tag";

interface IItemSeniorProps {
	senior: ISenior;
}
export default function ItemSenior(props: IItemSeniorProps) {
	const route = useRouter();
	return (
		<div className="p-6 shadow-md border">
			<div className="flex items-center gap-4">
				<Image
					src="/icons/default-avatar.svg"
					width={56}
					height={56}
					alt="senior"
				/>
				<div>
					<div>{props?.senior?.fullname || "Tên tiền bối"}</div>
					<div className="mt-1 flex flex-col xs:flex-row gap-2">
						{props?.senior?.status === 1 && <BadgeVerify />}
						<BadgeReputation />
					</div>
				</div>
			</div>
			<div className="mt-4 flex justify-between flex-wrap items-center">
				<div className="gap-4 lg:w-2/3 w-full flex flex-col self-start justify-center">
					<div className="divide-x flex xs:items-center text-sm flex-col xs:flex-row font-medium">
						<span className="pr-3 flex items-center gap-2">
							<FaStar
								className={`w-5 h-5 ${
									props?.senior?.rate_star &&
									"text-yellow-400"
								}`}
							/>
							<span className="text-base font-semibold">
								{props?.senior?.rate_star
									? props.senior.rate_star.toFixed(1)
									: 0}
							</span>
						</span>
						<span className="px-3">
							{props?.senior?.rate_number || 0} Đánh giá &bull;{" "}
							{props?.senior?.sold_time || 0} lượt mua
						</span>
						<span className="px-3">
							{props?.senior?.skill?.length > 0
								? props.senior.skill[0].name
								: null}
						</span>
						{props?.senior?.address ? (
							<span className="px-3">
								{props?.senior?.address}
							</span>
						) : null}
					</div>
					{props?.senior?.introduction ? (
						<div>
							<p className="text-sm font-medium text-neutral-60">
								{props?.senior?.introduction}
							</p>
						</div>
					) : null}
					{props?.senior?.skill?.length > 0 ? (
						<div className="flex items-center gap-2">
							{props?.senior?.skill?.map((tag, index) => (
								<Tag key={index}>{tag.name}</Tag>
							))}
						</div>
					) : null}
				</div>
				<div className="flex flex-col ml-auto gap-2">
					<Button md plain className="text-neutral-80">
						<HiOutlineBookmark className="mr-2" />
						Lưu xem sau
					</Button>
					<Button
						md
						secondary
						onClick={() =>
							route.push(`/senior/${props?.senior?._id}`)
						}>
						Xem thêm
					</Button>
				</div>
			</div>
		</div>
	);
}
