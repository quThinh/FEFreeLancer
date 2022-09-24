import {FaSearch} from "react-icons/fa";

export default function SearchBar() {
	return (
		<div className="p-2 bg-grey-light rounded">
			<FaSearch className="inline-block mr-3 text-brand-primary text-base"/>
			<input type="text" placeholder="Tìm kiếm hoặc nhập lệnh" className="focus:outline-none border-0 focus:border-0 focus:caret-brand-primary bg-grey-light" />
			<button className="px-3 py-1 bg-white ml-3 font-semibold text-neutral-100 rounded text-base">Ctrl F</button>
		</div>
	);
}
