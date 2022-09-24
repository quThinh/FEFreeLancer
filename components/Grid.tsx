import classNames from "classnames";
import { ReactElement, ReactNode } from "react";

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

interface ColProps extends ReactElement {
	children: ReactElement[];
	className?: string;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	offsetXs?: number;
	offsetSm?: number;
	offsetMd?: number;
	offsetLg?: number;
	offsetXl?: number;
}

export function Row(props: RowProps) {
	return (
		<div className={classNames("gap-6 grid grid-cols-12", props.className)}>
			{props.children}
		</div>
	);
}

export function Col(props: ColProps) {
	return (
		<div
			className={classNames({
				[`xs:col-span-${props.xs}`]: props.xs,
				[`sm:col-span-${props.sm}`]: props.sm,
				[`md:col-span-${props.md}`]: props.md,
				[`lg:col-span-${props.lg}`]: props.lg,
				[`xl:col-span-${props.xl}`]: props.xl,
			})}>
			{props.children}
		</div>
	);
}
