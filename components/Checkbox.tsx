import { InputHTMLAttributes, useState } from "react";
import { HiCheck } from "react-icons/hi";

interface ICheckboxProp extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	name: string;
	label?: string;
}
function Checkbox({ label, ...props }: ICheckboxProp) {
	return (
		<label className="text-base font-normal text-neutral-80 inline-flex cursor-pointer gap-4">	
			<input {...props} type="checkbox" className="border-neutral-20 border-2 rounded focus:shadow-none form-checkbox focus:outline-none w-6 h-6 checked:bg-brand-primary" />
			{label}
		</label>
	);
}
export default Checkbox;
