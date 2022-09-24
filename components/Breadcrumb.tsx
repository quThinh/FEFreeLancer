import Link from "next/link";
import { Fragment } from "react";
import { FaAngleRight } from "react-icons/fa";

interface IBreadcrumbProp {
	location?: {
		path?: string;
		name: string;
		active?: boolean;
	}[];
}
function Breadcrumb(
	props: IBreadcrumbProp = {
		location: [],
	}
) {
	const location = props.location
		? [{ name: "Trang chủ", path: "/" }, ...props.location]
		: [{ name: "Trang chủ", path: "/" }];
	return (
		<div className="hidden xs:flex container py-6 text-neutral-60 items-center text-base font-normal gap-2">
			{location.map((item, index) => {
				return (
					<Fragment key={index}>
						{!item.active && item.path ? (
							<Link href={item.path}>
								<a>{item.name}</a>
							</Link>
						) : (
							<span>
								{item.name}
							</span>
						)}
						{location.length && index <= location.length - 2 ? (
							<div>
								<FaAngleRight className="inline-block -translate-y-px" />
							</div>
						) : null}
					</Fragment>
				);
			})}
		</div>
	);
}
export default Breadcrumb;
