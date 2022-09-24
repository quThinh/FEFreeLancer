import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { IconType } from "react-icons";

interface MyPopoverProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	position?: "top" | "bottom" | "left" | "right";
	buttonClassName?: string;
	buttonText?: string;
	containerClassName?: string;
	buttonIcon?: IconType;
}

export default function MyPopover({
	children,
	isOpen,
	buttonClassName = "",
	containerClassName = "",
	buttonText = "",
	position = "top",
	buttonIcon = ChevronDownIcon,
}: MyPopoverProps) {
	const Icon = buttonIcon;
	return (
		<div className={containerClassName}>
			<Popover className="relative">
				{({ open }) => (
					<>
						<Popover.Button className={buttonClassName}>
							<span>{buttonText}</span>
							<Icon
								className={`${isOpen ? "" : "text-opacity-70"}
                  ml-2 h-5 w-5 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80`}
								aria-hidden="true"
							/>
						</Popover.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1">
							<Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
								<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
									<div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
										{children}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
}
