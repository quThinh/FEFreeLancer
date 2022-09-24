import { InputHTMLAttributes, useState } from "react";
import { HiCheck } from "react-icons/hi";

interface ICheckboxProp extends InputHTMLAttributes<HTMLInputElement> {
	id?: string;
	name: string;
	label?: string;
}
function Checkbox({ label, ...props }: ICheckboxProp) {
	const [clicked, setClicked] = useState(false);
	return (
		<label
			className="cursor-pointer relative font-normal text-neutral-100 text-base flex gap-2"
			onChange={() => setClicked(!clicked)}>
			<input {...props} type="checkbox" className="border-neutral-20 border-2 rounded focus:shadow-none form-checkbox focus:outline-none w-6 h-6 checked:bg-brand-primary" />
			{label}
		</label>
	);
}
export default Checkbox;
