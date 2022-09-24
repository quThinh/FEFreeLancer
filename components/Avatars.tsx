import Image from "next/image";

interface IAvatarprops {
	linkAvt?: string;
	active?: boolean;
}

function Avatars({ linkAvt, active }: IAvatarprops) {
	if (active)
		return (
			<div className="relative flex justify-center">
				<div className="w-32 h-32 rounded-[50%] overflow-hidden">
					<Image
						src={linkAvt || "/icons/default-avatar.svg"}
						alt="avatar"
						className="object-fit object-center"
						width={128}
						height={128}
					/>
				</div>
				<div className="absolute w-[14px] h-[14px] top-4 right-2 z-2 bg-green rounded-[50%] border border-light"></div>
			</div>
		);
	else
		return (
			<div className="relative">
				<div className="w-32 h-32 rounded-[50%] overflow-hidden">
					<Image
						src={linkAvt || "/icons/default-avatar.svg"}
						alt="avatar"
						className="object-fit object-center"
						width={128}
						height={128}
					/>
				</div>
				<div className="absolute w-[14px] h-[14px] top-4 right-2 z-2 bg-neutral-40 rounded-[50%] border border-light"></div>
			</div>
		);
}

export default Avatars;

