import { FaTrophy } from "react-icons/fa";

export default function BadgeSenior({ index }: { index: number }) {
	return (
		<div className="flex gap-2 items-center bg-brand-primary rounded-full p-2 text-white">
			<FaTrophy /> <span># {index}</span>
		</div>
	);
}
