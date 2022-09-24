import classNames from "classnames";
import TService from "interfaces/EService";
import ItemService from "./ItemService";

interface ServiceGridProps {
	services?: Array<TService>;
	className?: string;
	children?: React.ReactNode;
}

export default function ServiceGrid(props: ServiceGridProps) {
	const cn = classNames(
		"grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1",
		props.className
	);
	return (
		<div className={cn}>
			{props.services &&
				props.services.map((service: TService, index) => (
					<ItemService key={index} service={service} />
				))}
			{props.children}
		</div>
	);
}
