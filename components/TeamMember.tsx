import Image from "next/image";
import { FiTwitter, FiInstagram } from "react-icons/fi";

interface ITeamMemberProps {
    linkAvt?: string;
    name?: string;
    job?: string;
    description?: string;
}

function TeamMember({ linkAvt, name, job, description }: ITeamMemberProps) {
    return (
        <div className="px-8 py-5 flex flex-col items-center my-8">
            <div>
                <Image
                    src={linkAvt || "/icons/default-avatar.svg"}
                    alt="avatar"
                    className="object-fit object-center"
                    width={150}
                    height={150}
                />
            </div>
            <h1 className="sm:text-[28px] text-[26px] font-bold mt-4 text-neutral-100">{name}</h1>
            <p className="text-base text-neutral-60 mb-4">{job}</p>
            <p className="text-[18px] text-neutral-60 text-center mb-2">{description}</p>
            <div className="flex mt-2 justify-center w-full">
                <div className="mr-4">
                    <FiTwitter />
                </div>
                <div className="ml-4">
                    <FiInstagram />
                </div>
            </div>
        </div>
    )
}

export default TeamMember