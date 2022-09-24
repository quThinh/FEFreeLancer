import Image, { StaticImageData } from 'next/image';
import badge from '../public/icons/badge.svg'
import verifyAvt from '../public/icons/verified-acc.svg';
import defaultAvt from '../public/icons/default-acc.svg';
import { HiArrowNarrowUp } from 'react-icons/hi'

interface ICreatorProps {
    name: string;
    numService: number;
    linkAvt: StaticImageData;
}

function Creator({name, numService, linkAvt} : ICreatorProps) {
    return <div className='w-[225px] bg-grey-light p-6 border border-light rounded'>
        <div className='flex justify-between'>
            <Image src={badge} alt="badge" />
            <HiArrowNarrowUp className='text-xl text-neutral-60 rotate-45 mt-1' />
        </div>
        <div className='w-full h-[1px] bg-neutral-20 mt-6'></div>
        <div className='relative mt-6 flex justify-center'>
            <div className='w-16 h-16 rounded-[50%] overflow-hidden'>
            <Image src={linkAvt} alt="avatar" className="object-fill " />
            </div>
            <div className="absolute right-[52px] bottom-[-10px] z-10">
                <Image src={verifyAvt} alt="avatar" />
            </div>
        </div>
        <div className='mt-6 flex flex-col items-center'>
            <h3 className='text-neutral-100 text-sm font-medium mb-2'>{name}</h3>
            <h3 className='text-xs font-semibold text-neutral-100'>{numService} <span className='text-neutral-60'>Dịch vụ</span></h3>
        </div>
    </div>  
}

export default Creator
