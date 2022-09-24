import * as Yup from "yup";
import { transactionSchema } from "./ETransaction";

export const externalTransactionSchema = transactionSchema.shape({
	refference_code: Yup.string().default(""),
});

type TExternalTransaction = Yup.InferType<typeof externalTransactionSchema>;

export default TExternalTransaction;
