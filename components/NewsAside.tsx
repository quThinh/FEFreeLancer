export default function NewsAside() {
	const categories = [
		{
			name: "Tin tức",
			link: "/tin-tuc",
		},
		{
			name: "Thể thao",
			link: "/the-thao",
		},
		{
			name: "Giải trí",
			link: "/giai-tri",
		},
		{
			name: "Thế giới",
			link: "/the-gioi",
		},
		{
			name: "Giáo dục",
			link: "/giao-duc",
		},
	];

	const populars = [
		{
			tag: "Tin tức",
			link: "/tin-tuc",
			title: "Phát triển kỹ năng giao tiếp tốt tại nơi làm việc",
			create_at: "Jan 1, 2020",
		},
		{
			tag: "Góc báo chí",
			link: "/goc-bao-chi",
			title: "Việt Nam cấp thị thực điện tử cho công dân 40 quốc gia bắt đầu từ tháng 2/2017",
			create_at: "Jan 1, 2020",
		},
		{
			tag: "Blog",
			link: "/blog",
			title: "24 thói quen thiếu chuyên nghiệp có thể khiến bạn mất việc",
			create_at: "Jan 1, 2020",
		},
		{
			tag: "Góc báo chí",
			link: "/goc-bao-chi",
			title: "Báo cáo Linkedin mới về xu hướng nghề nghiệp năm 2016 - Bí mật nhà tuyển dụng nên biết",
			create_at: "Jan 1, 2020",
		},
		{
			tag: "Góc báo chí",
			link: "/goc-bao-chi",
			title: "Phát triển kỹ năng giao tiếp tốt tại nơi làm việc",
			create_at: "Jan 1, 2020",
		},
	];

	return (
		<div>
			<div className="body-3-semibold text-neutral-100">
				Danh mục tin tức
			</div>
			<div className="mt-2 flex flex-col gap-2">
				{categories.map((category, index) => {
					return (
						<a
							href={category.link}
							key={index}
							className="block p-4 body-4-medium bg-grey">
							{category.name}
						</a>
					);
				})}
			</div>
			<div className="mt-8">
				<div className="text-lg text-neutral-80 font-semibold">
					TIN TỨC NỔI BẬT
				</div>
				<div className="mt-2 flex flex-col gap-4 divide-y divide-1-grey">
					{populars.map((popular, index) => {
						return (
							<a
								href={popular.link}
								key={index}
								className="block py-2 pr-6">
								<div className="text-status-green text-base">
									{" "}
									{popular.tag.toUpperCase()}{" "}
								</div>
								<div className="max-w-prose text-neutral-100 body-3-semibold">
									{" "}
									{popular.title}{" "}
								</div>
								<div className="text-neutral-80 body-5-medium">
									{" "}
									{popular.create_at}{" "}
								</div>
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
}
