import Image from "next/image";
interface PriceTagProps {
	width?: number;
	height?: number;
	price: string | number | undefined;
	className?: string;
}
export default function PriceTag(props: PriceTagProps) {
	return (
		<div className={props.className + " flex items-center gap-1"}>
			<Image
				src="/icons/B.svg"
				width={props.width || 20}
				height={props.height || 20}
				alt="B-icon"
			/>
			<span className="font-semibold text-status-yellow">{props.price}</span>
		</div>
	);
}
