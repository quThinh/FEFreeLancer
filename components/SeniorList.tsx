import TClient from "interfaces/EClient";
import ItemSenior from "./ItemSenior";
interface ItemSeniorProps {
	seniors: TClient[];
}

export default function SeniorList(props: ItemSeniorProps) {
	return (
		<div className="flex flex-col gap-4">
			{props.seniors.map((senior, index) => (
				<ItemSenior key={index} senior={senior} />
			))}
		</div>
	);
}
