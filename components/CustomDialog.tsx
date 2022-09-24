import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { HiOutlineX } from "react-icons/hi";
import Button from "./Button";

interface DialogProps {
	open: boolean;
	onClose: () => void;
	onSubmit: () => void;
	children?: ReactNode;
	title: string;
}

export default function CustomDialog({
	title,
	open,
	children,
	onClose,
	onSubmit,
}: DialogProps) {
	return (
		<Transition show={open}>
			<Dialog
				open={open}
				onClose={() => onClose()}
				className="z-10 relative">
				<Transition.Child>
					<div className="flex inset-0 fixed bg-black opacity-50"></div>
				</Transition.Child>
				<Transition.Child as={Fragment}>
					<div className="flex items-center fixed inset-0 justify-center">
						<div className="bg-white w-1/3 rounded-lg p-6 shadow-lg overflow-hidden">
							<Dialog.Panel>
								<Dialog.Title>
									<div
										className="flex items-center"
										role="button"
										onClick={() => onClose()}>
										<div className="w-9 h-9 ml-auto rounded-full flex items-center justify-center shadow">
											<HiOutlineX size={24} />
										</div>
									</div>
									<div className="text-center body-1-semibold">
										{title}
									</div>
								</Dialog.Title>
								<Dialog.Description>
									{children}
								</Dialog.Description>
							</Dialog.Panel>
						</div>
					</div>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}
