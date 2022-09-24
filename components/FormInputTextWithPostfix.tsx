import classnames from "classnames";
import {useField} from "formik";
import {InputHTMLAttributes, ReactElement} from "react";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	icon: ReactElement;
}
export default function FormInputTextWithPostfix({
	icon,
	...props
}: IFormInputProps) {
	const [field, meta, helpers] = useField(props);
	const cn = classnames(
		{
			"": !meta?.error,
			"border-status-red": meta.touched && meta?.error,
		},
		"flex items-center border-neutral-20 border w-full",
		props?.className
	);
	return (
		<>
			<div className={cn} tabIndex={10}>
				<input
					{...props}
					{...field}
					id={
						props.type === "radio"
							? String(props.value)
							: props.name
					}
					className={"border-0 grow focus:outline-none"}
				/>
				<span className="ml-auto mr-3">{icon}</span>
			</div>
			{meta.touched && meta?.error && (
				<div className="text-status-red text-xs mt-2">{meta.error}</div>
			)}
		</>
	);
}
