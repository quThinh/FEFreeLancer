import { FaStar } from "react-icons/fa";

interface RatingProps {
	value: number;
	onChange: (rate_number: number) => void;
}
export default function Rating({ value = 0, onChange }: RatingProps) {
	return (
		<div className="flex items-center">
			{[1, 2, 3, 4, 5].map((i, index) => {
				return (
					<div
						key={index}
						className="cursor-pointer"
						onClick={() => onChange(i)}>
						<FaStar
							className={`${i <= value ? "text-yellow-400" : ""}`}
						/>
					</div>
				);
			})}
		</div>
	);
}
