import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import FormCheckBox from "./FormCheckBox";

interface IListFilterProps {
	header?: string;
	filters?: Array<{
		label: string;
		value: string;
	}>;
	name: string;
	children?: React.ReactNode;
	handleSubmit?: () => void;
}
function ListFilter(
	props: IListFilterProps = {
		header: "",
		filters: [],
		name: "",
	}
) {
	const [isDrop, setIsDrop] = useState(true);
	return (
		<div>
			<div
				className="flex items-center cursor-pointer"
				onClick={() => setIsDrop(!isDrop)}>
				<span className="w-2/3 text-[18px] font-[600]">{props?.header}</span>
				{isDrop ? (
					<FaAngleDown className="mx-auto" />
				) : (
					<FaAngleUp className="mx-auto" />
				)}
			</div>
			{isDrop ? (
				<>
					<div className="flex flex-col gap-5 mt-5">
						{props?.filters?.map((item, index) => (
							<FormCheckBox
								name={`${props.name}`}
								handleSubmit={props.handleSubmit}
								key={index}
								label={item.label}
								value={item.value}
							/>
						))}
					</div>
					{props.children}
				</>
			) : null}
		</div>
	);
}
export default ListFilter;
