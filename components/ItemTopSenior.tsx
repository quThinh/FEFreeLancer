import Image from "next/image";
import { useRouter } from "next/router";
import { BsArrowUpRight } from "react-icons/bs";
import BadgeSenior from "./BadgeSenior";

interface ItemTopSeniorProps {
	index: number;
	numOfServices: number;
	name: string;
	id: string;
}
export default function ItemTopSenior(props: ItemTopSeniorProps) {
	const router = useRouter();
	return (
		<div
			className="p-6 bg-grey col-span-1 cursor-pointer"
			onClick={() => router.push(`/senior/${props.id}`)}>
			<div className="flex items-center justify-betweeen">
				<BadgeSenior index={props.index} />
				<BsArrowUpRight className="ml-auto text-xl text-neutral-80 font-semibold" />
			</div>
			<hr className="my-4" />
			<div className="gap-4 items-center flex flex-col">
				<div className="text-center">
					<Image
						src="/icons/default-avatar.svg"
						width={128}
						height={128}
						alt="senior-avatar"
					/>
					<div className="font-normal text-neutral-100">
						{props.name}
					</div>
					<div>
						<span className="text-sm font-semibold">
							{props.numOfServices}
						</span>{" "}
						dịch vụ
					</div>
				</div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
