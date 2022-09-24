import { Field } from "formik";
import React from "react";
interface FormCheckBoxProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	value: string;
	label: string;
}
export default function FormCheckBox({
	label,
	name,
	value,
	...props
}: FormCheckBoxProps) {
	return (
		<>
			<label
				htmlFor={name}
				className="cursor-pointer inline-flex items-center gap-4">
				<Field
					className="border-neutral-20 border-2 rounded focus:shadow-none form-checkbox focus:outline-none w-6 h-6 checked:bg-brand-primary"
					type="checkbox"
					id={name}
					name={name}
					value={value}
					{...props}
				/>
				{label}
			</label>
		</>
	);
}
