import { useField } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, ReactElement, useState } from "react";
import classNames from "classnames";
import { FaAngleUp } from "react-icons/fa";
interface FormSelectProps {
	name: string;
	options: Array<{
		label: string;
		value: string;
		icon: () => ReactElement;
		disabled?: boolean;
	}>;
	className?: string;
}
export default function FormSelect(props: FormSelectProps) {
	const [field, meta, helpers] = useField(props);
	const [selected, setSelected] = useState(props.options[0]);
	return (
		<Listbox
			as="div"
			className="relative"
			value={selected}
			onChange={(select) => {
				helpers.setValue(select.value);
				setSelected(select);
			}}>
			<Listbox.Button
				className={classNames(
					"text-left border p-3 w-full",
					props.className
				)}>
				{selected.label}
			</Listbox.Button>
			<Transition
				as={Fragment}
				leave="transition ease-in duration-100"
				leaveFrom="opacity-100"
				leaveTo="opacity-0">
				<Listbox.Options
					as="div"
					className="max-h-60 rounded mt-1 absolute bg-grey-light z-10 w-full overflow-auto border">
					{props.options.map((option) => {
						const Icon = option.icon;
						return (
							<Listbox.Option
								key={option.value}
								value={option}
								disabled={option.disabled}
								className={({ active }) =>
									`p-3 flex items-center cursor-pointer ${
										active
											? "bg-status-blue text-white"
											: ""
									} ${
										option.disabled ? "text-neutral-60" : ""
									}`
								}>
								{({ active }) => (
									<>
										<div className="flex items-center">
											<Icon />
											<div className="ml-2">
												{option.label}
											</div>
										</div>
										<div className="ml-auto">
											<FaAngleUp
												className={`${
													active
														? "transition rotate-180"
														: ""
												}`}
											/>
										</div>
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
