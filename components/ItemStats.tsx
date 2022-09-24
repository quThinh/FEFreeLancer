import { BsArrowUpRight } from "react-icons/bs";
interface ItemStatsProps {
	title: string;
	stats: {
		value: number;
		percentage: number;
		trend: string;
	};
	subtitle: string;
}
export default function ItemStats(props: ItemStatsProps) {
	return (
		<div>
			<div className="text-sm flex items-center">
				<div className="text-neutral-60"> {props.title} </div>
				<BsArrowUpRight
					className={`${
						props.stats.trend === "up"
							? "text-status-green"
							: "text-status-red"
					} ml-auto`}
				/>
			</div>
			<div className="mt-4 text-2xl font-semibold">{props.stats.value}</div>
			<div className="flex text-xs font-medium items-center justify-between">
				<div> {props.subtitle} </div>
				<div
					className={`${
						props.stats.trend === "up"
							? "text-status-green"
							: "text-status-red"
					}`}>
					{props.stats.percentage}%
				</div>
			</div>
		</div>
	);
}
