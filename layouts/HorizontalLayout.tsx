import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface ILayoutProp {
	children?: React.ReactNode;
}

export default function HorizontalLayout(props: ILayoutProp) {
	return (
		<div className="overflow-x-hidden">
			<Navbar />
			<div className="-mt-5">{props.children}</div>
			<Footer />
			<ToastContainer />
		</div>
	);
}
