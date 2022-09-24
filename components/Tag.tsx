import classNames from "classnames";

interface ITagProps {
	children?: string;
	color?: "yellow" | "green" | "blue" | "red" | "grey" | "primary";
	size?: "xs" | "sm" | "md" | "lg";
}
export default function Tag({
	size = "sm",
	children = "Thẻ",
	color = "grey",
}: ITagProps) {
	const cn = classNames("px-2 text-sm font-medium text-center py-1", {
		"bg-grey text-neutral-40": color === "grey",
		"bg-yellow-500/[.12] text-yellow-500/100": color === "yellow",
		"bg-green/[.12] text-green/100": color === "green",
		"bg-blue/[.12] text-blue/100": color === "blue",
		"bg-red/[.12] text-red/100": color === "red",
		"bg-brand-primary/[.12] text-brand-primary/100": color === "primary",
		"text-xs": size === "xs",
		"text-sm": size === "sm",
		"text-base": size === "md",
		"text-lg": size === "lg",
	});
	return <span className={cn}>{children}</span>;
}
