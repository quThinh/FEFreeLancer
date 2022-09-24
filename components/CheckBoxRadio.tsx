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
            className="input-control cursor-pointer relative font-normal text-neutral-100 text-base"
            onChange={() => setClicked(!clicked)}>
            <input {...props} type="radio" className="w-4 h-4 my-auto" />
            <div className="inline ml-2">{label}</div>
        </label>
    )
}
export default Checkbox;
