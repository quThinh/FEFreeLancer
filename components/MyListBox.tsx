import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { Fragment } from "react";
import {IconType} from "react-icons";

type Value = {
	label: string;
	value: string;
};

interface MyListBoxProps {
	items?: Array<Value>;
	onChange: (value: Value) => void;
	value: Value;
	buttonClassName?: string;
	containerClassName?: string;
	placeholder?: string;
	isLoading?: boolean;
	isError?: boolean;
	icon?: IconType;
}

export default function MyListBox({
	items = [],
	onChange,
	icon,
	value,
	buttonClassName = "",
	containerClassName = "max-w-72",
}: MyListBoxProps) {
	const Icon = icon || SelectorIcon;
	return (
		<div className={containerClassName}>
			<Listbox value={value} onChange={onChange}>
				<div className="relative">
					<Listbox.Button
						className={`relative text-left w-full flex justify-between items-center gap-2 cursor-pointer ${classNames(
							buttonClassName
						)}`}>
						<span className="block truncate"><span className="font-medium">Sắp xếp theo:</span> {value.label}</span>
						<span className="pointer-events-none flex ml-auto items-center">
							<Icon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-68 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{items.map((item, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? "bg-amber-100 text-amber-900"
												: "text-gray-900"
										}`
									}
									value={item}>
									{({ selected }) => (
										<>
											<span
												className={`block truncate ${
													selected
														? "font-medium"
														: "font-normal"
												}`}>
												{item.label}
											</span>
											{selected ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
													<CheckIcon
														className="h-5 w-5"
														aria-hidden="true"
													/>
												</span>
											) : null}
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
