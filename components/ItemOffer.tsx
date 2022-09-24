import clientApi from "api/clientApi";
import TOffer from "interfaces/EOffer";
import {useState} from "react";
import ItemPriceQuote from "./ItemPriceQuote";

interface IItemOfferProps {
	offer: TOffer;
}
export default function ItemOffer(props: IItemOfferProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { client, isLoading, isError } = clientApi.useItemClient(
		props.offer.provider_id._id
	);
	return (
		<div className="flex flex-col gap-8">
			<div className="p-8 bg-white">
				<ItemPriceQuote
					client={client}
					offer={props.offer}
					onQuote={() => setIsOpen(!isOpen)}
				/>
			</div>
		</div>
	);
}
