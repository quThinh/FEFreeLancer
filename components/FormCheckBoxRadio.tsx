import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import Checkbox from "./CheckBoxRadio";

interface IFormCheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	value: string;
}
export default function FormCheckBox({ label, value, ...props }: IFormCheckBoxProps) {
	const [field, meta, helpers] = useField(props);
	return <Checkbox {...field}  label={label} value={value} {...props} checked={field.value === value}  />;
}
