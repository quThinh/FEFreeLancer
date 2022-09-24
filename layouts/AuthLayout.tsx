import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
interface ILayoutProp {
	children?: React.ReactNode;
}
export default function AuthLayout(props: ILayoutProp) {
	useEffect(() => {
		document.body.classList.add("bg-auth");
		return () => {
			document.body.classList.remove("bg-auth");
		};
	});

	return (
		<div className="min-h-screen flex items-center justify-center ">
			<div className="w-full xs:max-w-fit">
				{props.children}
			</div>
			<ToastContainer />
		</div>
	);
}
