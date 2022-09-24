import classnames from "classnames";
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	lg?: boolean;
	md?: boolean;
	sm?: boolean;
	primary?: boolean;
	secondary?: boolean;
	plain?: boolean;
	className?: string;
	block?: boolean;
}
function Button({
	children,
	plain,
	primary,
	secondary,
	sm,
	md,
	lg,
	block,
	className,
	...rest
}: IButtonProps) {
	const btnClass = classnames(
		{
			"text-sm px-[15px] py-[10px] font-semibold text-center": sm,
			"text-base px-[28.5px] py-[12px] font-semibold text-center": md,
			"text-lg px-[27px] py-[14px] font-semibold text-center": lg,
			"bg-white text-brand-primary": plain,
			"bg-brand-primary text-white": primary,
			"border border-brand-secondary bg-white text-brand-primary":
				secondary,
			"w-full": block,
		},
		"btn focus:outline-none"
	);
	return (
		<button {...rest} className={classnames(btnClass, className)}>
			{children}
		</button>
	);
}

export default Button;
