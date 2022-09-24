import * as Yup from "yup";
import TProduct, {productSchema} from "./EProduct";


export const serviceSchema = productSchema.shape({
	sold_time: Yup.number().default(0),
	rate: Yup.number().default(0),
	number_of_rates: Yup.number().default(0),
});

type TService = TProduct & {
	sold_time: string;
	rate: number;
	number_of_rate: number;
}

export default TService;
