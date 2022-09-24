import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiCheck } from "react-icons/hi";
import Tag from "./Tag";

export default function FormMutipleSelect<T extends { name: string }>({
	array = [],
	selected,
	setSelected,
}: {
	array: Array<T>;
	selected: Array<T>;
	setSelected: (value: T[]) => void;
}) {
	return (
		<div>
			<div className="flex gap-4 items-start">
				<Listbox
					value={selected}
					as="div"
					className="w-1/4 shrink-0"
					onChange={setSelected}
					multiple>
					<div className="relative mt-1">
						<Listbox.Button className="border-2 border-neutral-20 absolute relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
							Thêm mới
						</Listbox.Button>
						<Transition
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0">
							<Listbox.Options className="absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								{array.map((person, personIdx) => (
									<Listbox.Option
										key={personIdx}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active
													? "bg-amber-100 text-amber-900"
													: "text-gray-900"
											}`
										}
										value={person}>
										{({ selected }) => (
											<>
												<span
													className={`block truncate ${
														selected
															? "font-medium"
															: "font-normal"
													}`}>
													{person?.name}
												</span>
												{selected ? (
													<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
														<HiCheck
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
				<div className="flex flex-wrap gap-2">
					{selected && selected.map((item, index) => {
						return <Tag key={index}>{item.name}</Tag>;
					})}
				</div>
			</div>
		</div>
	);
}

