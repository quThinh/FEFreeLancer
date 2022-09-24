import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HiCheck, HiOutlineX, HiSelector } from "react-icons/hi";
import slug from "slug";

interface MultipleComboboxProps<T> {
	options: T[];
	value: T[];
	onChange: (value: T[]) => void;
}

export default function MultipleCombobox<
	T extends { name: string; slug: string }
>(props: MultipleComboboxProps<T>) {
	const [query, setQuery] = useState("");
	const filteredOptions = props.options.filter((option) =>
		option.name.toLowerCase().includes(query.toLowerCase())
	);
	return (
		<Combobox
			multiple
			value={props.value}
			as="div"
			className="relative"
			onChange={props.onChange}>
			<div className="flex p-2 w-full border items-center">
				<div className="items-center flex flex-wrap gap-2">
					{props.value.map((value, i) => (
						<div
							key={i}
							className="flex px-2 py-0.5 bg-brand-tertiary items-center gap-1">
							<span>{value.name}</span>
							<HiOutlineX
								className="cursor-pointer"
								onClick={() =>
									props.onChange(
										props.value.filter((v) => v !== value)
									)
								}
							/>
						</div>
					))}
					<Combobox.Input
						className="border-0"
						placeholder="Nhập kỹ năng"
						onChange={(e) => setQuery(e.target.value)}
					/>
				</div>
				<Combobox.Button className="ml-auto">
					<HiSelector className="w-6 h-6 text-neutral-40" />
				</Combobox.Button>
			</div>
			<div className="absolute w-full rounded-md bg-white shadow-lg z-10 mt-1">
				<Combobox.Options className="max-h-60 overflow-y-scroll shadow-xs focs-outline-none">
					{filteredOptions.map((option, i) => (
						<Combobox.Option key={i} value={option} as={Fragment}>
							{({ selected, active }) => (
								<li
									className={`relative py-2 pl-3 pr-9 cursor-pointer ${
										active
											? "bg-brand-primary text-white"
											: ""
									} ${selected ? "font-semibold" : ""}`}>
									<span className="block">{option.name}</span>
									{selected && (
										<div className="absolute pr-4 flex items-center inset-y-0 right-0">
											<HiCheck
												className={`w-5 h-5 ${
													active
														? "text-white"
														: "text-brand-primary"
												}`}
											/>
										</div>
									)}
								</li>
							)}
						</Combobox.Option>
					))}
					<Combobox.Option
						value={{
							name: query,
							slug: slug(query, "-"),
						}}>
						{({ active }) => (
							<li
								className={`relative py-2 pl-3 pr-9 cursor-pointer ${
									active ? "bg-brand-primary text-white" : ""
								}`}>
								<span className="block">Thêm {query}</span>
							</li>
						)}
					</Combobox.Option>
				</Combobox.Options>
			</div>
		</Combobox>
	);
}
