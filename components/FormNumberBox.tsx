import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import classnames from "classnames";

interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}
export default function FormNumberBox({ ...props }: IFormInputProps) {
	const [field, meta, helpers] = useField(props);
	const cn = classnames(
		"w-[104px] h-[136px] px-[40px] py-[44px] text-4xl text-[#25324B] font-semibold border bordercolor-[#EFF0F6] outline-[#EFF0F6]",
		"bg-light",
		props?.className
	);
	return <input {...props} {...field} id={props.name} className={cn} />;
}
