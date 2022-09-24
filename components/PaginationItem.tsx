import classnames from "classnames";

interface IPaginationItemProps {
	id: number;
	content?: number;
	isActive?: boolean;
	noActive?: boolean;
	setPage: (page: number) => void;
}

function PaginationItem({
	content,
	noActive,
	isActive = true,
	setPage,
	id,
}: IPaginationItemProps) {
	const activeClass = classnames(
		{
			"text-neutral-100 bg-light flex items-center text-sm font-semibold":
				noActive,
			"text-white bg-brand-primary font-semibold": isActive,
		},
		"px-3.5 py-2 w-10 text-center"
	);
	return (
		<li className="mx-2" onClick={() => setPage(id)} role="button">
			<div className={activeClass}>{content}</div>
		</li>
	);
}

export default PaginationItem;
