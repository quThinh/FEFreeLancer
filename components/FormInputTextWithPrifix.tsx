import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import classnames from "classnames";
import InputWithPostfix from "./InputWithPostfix";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}
export default function FormInputText({ ...props }: IFormInputProps) {
	const [field, meta, helpers] = useField(props);
	const cn = classnames(
		{
			"focus:border-brand-primary": !meta?.error,
			"focus:border-status-red": meta.touched && meta?.error,
		},
		"p-3 border-neutral-20 border w-full focus:outline-none",
		props?.className
	);
	return (
		<InputWithPostfix
			{...props}
			{...field}
			id={props.type === "radio" ? String(props.value) : props.name}
			className={cn}
		/>
	);
}
