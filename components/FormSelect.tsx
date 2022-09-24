import { Listbox, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useField } from "formik";
import { Fragment, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
interface FormSelectProps {
	name: string;
	options: Array<{
		label?: string;
		value?: string;
		disabled?: boolean;
	}>;
	className?: string;
	defaultValue?: string;
}
export default function FormSelect(props: FormSelectProps) {
	const [field, meta, helpers] = useField(props);
	const [selected, setSelected] = useState(props.options[0]);
	useEffect(() => {
		if (props.defaultValue) {
			let defaultSelected = props.options.find(
				(o) => o.value === props.defaultValue
			);
			setSelected(defaultSelected || props.options[0]);
		}
	}, [props.defaultValue, props.options]);
	return (
		<Listbox
			as="div"
			className="relative"
			value={selected}
			onChange={(select: {
				label?: string;
				value?: string;
				disabled?: boolean;
			}) => {
				helpers.setValue(select.value);
				setSelected(select);
			}}>
			<Listbox.Button
				className={classNames(
					"text-left flex items-center border p-3 w-full",
					props.className
				)}>
				<div className="ml-2">{selected.label}</div>
				<div className="ml-auto">
					<FaAngleDown width={24} height={24} />
				</div>
			</Listbox.Button>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-75"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<Listbox.Options
					as="div"
					className="list-none max-h-60 py-1 rounded mt-1 absolute shadow-md bg-white z-10 w-full overflow-auto border">
					{props.options.map((option, index) => {
						return (
							<Listbox.Option
								key={index}
								value={option}
								disabled={option.disabled}
								className={({ active }) =>
									`p-3 cursor-pointer ${
										active
											? "bg-status-blue text-white"
											: ""
									} ${
										option.disabled ? "text-neutral-60" : ""
									}`
								}>
								{({ active }) => (
									<>
										<div>{option.label}</div>
									</>
								)}
							</Listbox.Option>
						);
					})}
				</Listbox.Options>
			</Transition>
		</Listbox>
	);
}
