import { IconType } from "react-icons";
import { FaQuestion } from "react-icons/fa";

interface ItemUserStaticsProps {
	icon?: string | IconType;
	label?: string;
	value?: string | number;
}
export default function ItemUserStatics({
	icon = FaQuestion,
	label = "",
	value = "",
}: ItemUserStaticsProps) {
	const Icon = icon;
	return (
		<div className="flex items-center gap-4">
			<span className="rounded-[50%] border p-2.5">
				<Icon className="text-2xl text-brand-primary" />
			</span>
			<div>
				<div className="text-base text-neutral-60">{label}</div>
				<div className="text-base font-semibold text-neutral-100">
					{value}
				</div>
			</div>
		</div>
	);
}
