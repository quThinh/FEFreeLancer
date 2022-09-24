import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import Checkbox from "./Checkbox";

interface IFormCheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	handleSubmit?: () => void;
	value: string;
}
export default function FormCheckBox({
	label,
	handleSubmit,
	value,
	...props
}: IFormCheckBoxProps) {
	const [field, meta, helpers] = useField(props);
	return (
		<Checkbox
			label={label}
			{...props}
			{...field}
			onChange={(e) => {
				field.onChange(e);
				if (handleSubmit) {
					handleSubmit();
				}
			}}
			checked={field.value?.length > 0 && field.value.includes(value)}
			value={value}
		/>
	);
}
