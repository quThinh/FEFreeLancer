import { FaStar } from "react-icons/fa";
interface StarRatingProps {
	rating?: number;
	onChange?: (rating: number) => void;
}
export function StarRating({
	rating = 0,
	onChange = () => {},
}: StarRatingProps) {
	return (
		<div className="flex items-center">
			{[1, 2, 3, 4, 5].map((i) => (
				<FaStar
					key={i}
					onClick={() => {
						if (onChange) {
							onChange(i);
						}
					}}
					className={i <= rating ? "text-red" : ""}
				/>
			))}
		</div>
	);
}
