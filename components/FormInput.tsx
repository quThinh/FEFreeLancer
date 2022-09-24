import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import classnames from "classnames";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	validate?: (value: any) => string | undefined;
}
export default function FormInputText({ validate, ...props }: IFormInputProps) {
	const [field, meta, helpers] = useField({ validate, ...props });
	const cn = classnames(
		{
			"focus:border-brand-primary": !meta?.error,
			"focus:border-status-red": meta.touched && meta?.error,
			"border border-neutral-20 w-full focus:shadow-none focus:outline-none p-3":
				props.type !== "radio",
		},
		props?.className
	);
	return (
		<>
			<input
				{...props}
				{...field}
				id={props.type === "radio" ? String(props.value) : props.name}
				className={cn}
			/>
			{meta.touched && meta?.error && (
				<div className="text-status-red text-xs mt-2">{meta.error}</div>
			)}
		</>
	);
}
