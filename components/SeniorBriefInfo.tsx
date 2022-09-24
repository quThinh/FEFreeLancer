import TClient, { clientSchema } from "interfaces/EClient";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface SeniorBriefInfoProps {
	seniorInfo?: TClient;
}

export default function SeniorBriefInfo({ seniorInfo }: SeniorBriefInfoProps) {
	return (
		<div className="flex gap-1 xs:gap-0 xs:flex-row flex-col xs:items-center xs:divide-x text-sm xs:divide-border-1">
			<div className="pr-3 flex items-center gap-2">
				<Image
					src={"/work.jpg"}
					alt="media"
					className="rounded-full"
					width={36}
					height={36}
					objectFit="fill"
				/>
				<div>
					<p className="text-neutral-80 font-[400] m-0">
						{seniorInfo?.fullname}
					</p>
					<span className="text-center p-1 text-[10px] bg-gradient-to-r from-[#FF4D97] to-[#FF9500] text-white rounded-tl-lg rounded-br-lg">
						TOP RATE
					</span>
				</div>
			</div>
			<span className="xs:px-3 flex gap-2 items-center text-base font-semibold">
				<FaStar
					className={`${seniorInfo?.rate_star && "text-yellow-400"}`}
				/>
				<span>{seniorInfo?.rate_star}</span>
			</span>
			<span className="xs:px-3">
				{seniorInfo?.rate_number} đánh giá &bull;{" "}
				{seniorInfo?.sold_time} lượt mua
			</span>
		</div>
	);
}
