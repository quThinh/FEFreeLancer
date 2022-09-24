import { useField } from "formik";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import classnames from "classnames";

interface IFormTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	validate?: (value: any) => string | undefined;
}

export default function FormTextArea({ validate, ...props }: IFormTextAreaProps) {
	const [field, meta, helpers] = useField({validate, ...props});
	const cn = classnames(
		{
			"focus:border-brand-primary": !meta?.error,
			"focus:border-status-red": meta.touched && meta?.error,
		},
        "p-3 border border-neutral-20 w-full resize-none focus:outline-none",
		props?.className
	);
	return (
		<>
			<textarea
				{...props}
				{...field}
				id={props.name}
				className={cn}
			/>
			{meta.touched && meta?.error && (
				<div className="text-status-red text-xs mt-2">{meta.error}</div>
			)}
		</>
	);
}
