import * as Yup from "yup";
import { transactionSchema } from "./ETransaction";

export const internalTransactionSchema = transactionSchema.shape({
	order_id: Yup.mixed(),
});

type TInternalTransaction = Yup.InferType<typeof internalTransactionSchema>;

export default TInternalTransaction;
