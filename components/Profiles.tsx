import Image from "next/image";
import { useRouter } from "next/router";
import { HiOutlineBookmark, HiOutlinePencil } from "react-icons/hi";
import facebook from "../public/icons/Facebook.svg";
import line from "../public/icons/line-fill.svg";
import linkedIn from "../public/icons/linkedin-box-fill.svg";
import twitter from "../public/icons/twitter-fill.svg";
import whatsApp from "../public/icons/whatsapp-fill.svg";
import Avatars from "./Avatars";
import BadgeReputation from "./BadgeReputation";
import BadgeVerify from "./BadgeVerify";
import { StarRating } from "./StarRating";
import {
	FacebookShareButton,
	TwitterShareButton,
	LineShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
} from "react-share";
import Link from "next/link";

interface IProfileProps {
	name: string;
	numEvaluation: number;
	linkAvt?: string;
	isUserView?: boolean;
	isVerified?: boolean;
	rating?: number;
	email?: string;
}

function Profiles({
	name,
	numEvaluation,
	isVerified,
	rating = 0,
	email = "",
	linkAvt,
	isUserView,
}: IProfileProps) {
	const router = useRouter();

	return (
		<div className="border flex flex-col justify-center items-center bg-light px-3 pt-5 pb-5">
			<Avatars active linkAvt={linkAvt} />
			<div className="mt-4">
				<h3 className="text-lg font-medium text-neutral-100 mb-2 text-center">
					{name}
				</h3>
				<div className="flex justify-center mb-4">
					<StarRating rating={rating} />
					<span className="text-xs text-neutral-60 font-normal mt-[3px] mx-1">
						{numEvaluation} Đánh giá
					</span>
				</div>
				<div className="flex mb-5 justify-center">
					<BadgeReputation />
					{isVerified && <BadgeVerify />}
				</div>
				<div className="flex flex-col justify-center items-center">
					{isUserView ? (
						<>
							<Link href={`mailto:${email}`}>
								<a className="btn flex items-center justify-center min-w-[222px] h-[42px] bg-brand-primary text-base font-medium text-light mb-4">
									Liên hệ
								</a>
							</Link>
							<button className="flex justify-center items-center min-w-[222px] h-[42px] border border-brand-primary bg-light text-base font-medium text-brand-primary">
								<HiOutlineBookmark className="text-base" />
								<span className="ml-2">Lưu xem sau</span>
							</button>
						</>
					) : (
						<button
							className="flex justify-center items-center min-w-[222px] h-[42px] bg-brand-primary text-base font-medium text-light"
							onClick={() => router.push("/user/edit-profile")}>
							<HiOutlinePencil className="text-xl" />
							<span className="ml-2">Chỉnh sửa</span>
						</button>
					)}
					<span className="text-sm font-normal text-neutral-60 mt-3">
						Chia sẻ trang cá nhân tiền bối
					</span>
				</div>
				<div className="mt-4 flex justify-between">
					<FacebookShareButton
						url={window.location.href}
						quote={name}>
						<Image src={facebook} alt="facebook" />
					</FacebookShareButton>
					<TwitterShareButton url={window.location.href}>
						<Image src={twitter} alt="twitter" />
					</TwitterShareButton>
					<LineShareButton url={window.location.href}>
						<Image src={line} alt="line" />
					</LineShareButton>
					<LinkedinShareButton url={window.location.href}>
						<Image src={linkedIn} alt="linkedIn" />
					</LinkedinShareButton>
					<WhatsappShareButton url={window.location.href}>
						<Image src={whatsApp} alt="whatsApp" />
					</WhatsappShareButton>
				</div>
			</div>
		</div>
	);
}

export default Profiles;
