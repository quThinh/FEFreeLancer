import classNames from "classnames";
import TNews from "interfaces/ENews";
import ItemBlog from "./ItemBlog";

interface NewsGridProps {
	news?: Array<TNews>;
	md?: number;
	sm?: number;
	xs?: number;
	className?: string;
	lg?: number;
	xl?: number;
}

export default function NewsGrid(props: NewsGridProps) {
	const cn = classNames(
		"grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
		[
			props.xs ? `xs:grid-cols-${props.xs}` : "",
			props.sm ? `sm:grid-cols-${props.sm}` : "",
			props.md ? `md:grid-cols-${props.md}` : "",
			props.lg ? `lg:grid-cols-${props.lg}` : "",
			props.xl ? `xl:grid-cols-${props.xl}` : "",
		],
		props.className
	);
	return (
		<div className={cn}>
			{props.news &&
				props.news.map((item, index) => {
					return <ItemBlog key={index} news={item} />;
				})}
		</div>
	);
}
