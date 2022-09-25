import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo/logo32.svg";
import CategoryBoardDropdown from "./CategoryBoardDropdown";
import CreateNewDropdown from "./CreateNewDropdown";
import DropdownAccount from "./DropdownAccount";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import NotificationDropdown from "./NotificationDropdown";
import AuthUtils from "@/utils/authUtils";

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		setIsLoggedIn(AuthUtils.isLoggedIn());
	}, []);
	return (
		<div className="container md:max-w-full px-6 h-20 shadow-sm mb-5 bg-white flex items-center z-10 relative">
			<Link href="/">
				<a className="flex items-center">
					<Image alt="logo" src={logo} width={100} height={32} />
				</a>
			</Link>
			<div className="ml-16 hidden xl:block">
				<SearchBar />
			</div>
			<div className="flex ml-auto">
				<div className="gap-[28px] pr-[36px] border-r lg:flex items-center hidden">
					<div className="cursor-pointer">
						<CategoryBoardDropdown position="center" />
					</div>
					<div className="text-base font-normal">
						<Link href="/about">Về Niubi</Link>
					</div>
				</div>
				{!isLoggedIn ? (
					<div className="ml-auto flex items-center">
						<Link href="/auth/login">
							<a className="btn btn-plain btn-sm mr-3">
								Đăng nhập
							</a>
						</Link>
						<Link href="/user/register">
							<a className="btn btn-primary btn-sm">Đăng kí</a>
						</Link>
					</div>
				) : (
					<div className="ml-auto gap-3 flex items-center">
						<NotificationDropdown />
						<div className="hidden xs:block">
							<CreateNewDropdown />
						</div>
						<DropdownAccount />
					</div>
				)}
			</div>
		</div>
	);
}
export default Navbar;
