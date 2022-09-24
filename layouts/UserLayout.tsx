import { ReactNode, useState } from "react";
import { ToastContainer } from "react-toastify";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";
import { AiOutlineMenu } from "react-icons/ai";
import classnames from 'classnames';

interface IUserLayoutProps {
	children?: ReactNode;
}
export default function UserLayout(props: IUserLayoutProps) {
	const [show, setShow] = useState(false)

	return (
		<div className="overflow-hidden">
			<div className="flex justify-between items-center fixed top-0 right-0 left-0 z-50 lg:relative">
				<div
					className="mb-5 text-center py-8 px-6 lg:hidden relative z-50 top-0 bg-white"
					onClick={() => setShow(!show)}
				>
					<AiOutlineMenu />
				</div>
				<Navbar />
			</div>
			<div className="-mt-5 flex user-layout bg-grey-light relative">
				{
					show && (
						<div
							className="bg-black/[.4] fixed z-20 top-0 right-0 left-0 bottom-0 lg:hidden overlay"
							onClick={() => setShow(!show)}
						></div>
					)
				}
				<div className={classnames({
						'left-side-bar--in': show,
						'left-side-bar--not-in': !show
					},
					'fixed h-[90vh] sm:h-[92vh] z-20 top-20 lg:hidden bg-white overflow-y-auto left-side-bar')}
				>
					<LeftSidebar />
				</div>
				<div className="hidden lg:block">
					<LeftSidebar />
				</div>
				<div className="min-h-full w-full px-8 py-4 grow mt-20 lg:mt-[unset]">
					{props.children}
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
