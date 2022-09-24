import { Menu } from "@headlessui/react";
import { Fragment } from "react";
import { IconType } from "react-icons";
import { HiDotsHorizontal } from "react-icons/hi";

interface TableDropdownProps {
	items: Array<{
		name: string;
		icon: IconType;
		function: () => void;
	}>;
}

export default function TableDropdown(props: TableDropdownProps) {
	return (
		<Menu as="div" className="relative ml-auto px-3">
			<Menu.Button as="div" className="cursor-pointer">
				<HiDotsHorizontal />
			</Menu.Button>
			<Menu.Items className="focus:outline-none absolute min-w-[280px] z-50 mt-3 bg-white shadow p-4 right-0">
				{props.items.map((item, index) => {
					const Icon = item.icon;
					return (
						<Menu.Item key={index} as={Fragment}>
							{({ active }) => (
								<div
									onClick={item.function}
									className={` ${
										active
											? "bg-grey text-neutral-100"
											: "text-neutral-60"
									} flex items-center text-base p-2 cursor-pointer`}>
									<Icon className="text-lg" />
									<span className="ml-2">{item.name}</span>
								</div>
							)}
						</Menu.Item>
					);
				})}
			</Menu.Items>
		</Menu>
	);
}
