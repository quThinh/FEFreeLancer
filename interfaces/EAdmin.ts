import { InferType } from "yup";
import { userSchema } from "./EUser";

export const adminSchema = userSchema.shape({});
export const adminSchemaDefault = adminSchema.getDefault();

type TAdmin = InferType<typeof userSchema>;

export default TAdmin;
