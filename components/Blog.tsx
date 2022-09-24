import TNews from "interfaces/ENews";
import Link from "next/link";
import Button from "./Button";
import ItemBlog from "./ItemBlog";

interface IBlogProps {
	news: TNews[];
}

function Blog(props: IBlogProps) {
	return (
		<div className="text-center py-[32px] w-[100%]">
			<div className="text-[32px] font-[600] mb-[32px]">
				Tin tức nổi bật
			</div>
			<div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 mb-8">
				{props.news.map((item, index) => {
					return <ItemBlog key={index} news={item} />;
				})}
			</div>
			<div className="mb-[32px]">
				<Link href="/news">
					<a className="btn btn-secondary btn-lg">
						Xem thêm
					</a>
				</Link>
			</div>
		</div>
	);
}
export default Blog;
