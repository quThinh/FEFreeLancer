import TOffer from "interfaces/EOffer";
import ItemOffer from "./ItemOffer";
interface ItemOfferProps {
	offers: TOffer[];
}
export default function OfferList(props: ItemOfferProps) {
	const acceptedgOffer = props.offers?.filter(item => item.status === 1)
	if(acceptedgOffer?.length === 0)
	return (
		<div className="flex flex-col gap-4 mt-10 border-b">
			{props.offers && props?.offers?.map((offer, index) => (
				<ItemOffer key={index} offer={offer} />
			))}
		</div>
	)
	else return(
		<div>
			<ItemOffer offer = {acceptedgOffer[0]}/>
		</div>
		
	)
}
