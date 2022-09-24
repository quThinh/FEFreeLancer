import classNames from "classnames";
import ItemService from "./ItemService";

interface ServiceFlexListProps {
	services?: any;
	className?: string;
}

export default function ServiceFlexList(props: ServiceFlexListProps) {
	const cn = classNames("flex flex-wrap", props.className);
	return (
		<div className={cn}>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
			<div className="p-4 xl:w-1/3 md:w-1/2 2xl:w-1/4 w-full">
				<ItemService />
			</div>
		</div>
	);
}
