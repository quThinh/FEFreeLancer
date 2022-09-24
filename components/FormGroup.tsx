import React from "react";

export default function FormGroup({
	children,
	className,
}: {
	children?: React.ReactNode;
	className?: string;
}) {
	return <div className={`mb-6 ${className || ''}`}>{children}</div>;
}
