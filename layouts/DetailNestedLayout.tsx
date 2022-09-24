import {ReactElement} from "react";
import Breadcrumb from "../components/Breadcrumb";


export default function DetailNestedLayout({
	children,
}: {
	children: ReactElement;
}) {
	return (
		<div>
			<div>{children}</div>
		</div>
	);
}
