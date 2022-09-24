import { HiBadgeCheck } from "react-icons/hi";
export default function BadgeVerify() {
	return (
		<span className="bg-green/[.12] px-2 rounded-xl py-1 text-green text-xs">
			<HiBadgeCheck className="inline-block w-4 h-4" /> Đã xác minh
		</span>
	);
}
