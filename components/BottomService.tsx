import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import Slider from 'react-slick'
import ItemService from './ItemService'
interface IServiceListProps {}

function PrevArrow({onClick, ...rest}: any) {
    return (
        <div
           onClick={onClick} 
            role="button"
            className="z-[100] top-1/2 rounded-[50%] absolute w-10 h-10 bg-white -left-0 -translate-y-5 shadow-md opacity-80 hover:opacity-100"
        >
            <FaAngleLeft className="w-6 h-6 mx-auto translate-y-2" />
        </div>
    )
}
function NextArrow({onClick, ...rest}: any) {
    return (
        <div
           onClick={onClick} 
            role="button"
            className="w-10 top-1/2 -translate-y-1/2 rounded-[50%] absolute h-10 bg-white -right-0 shadow-md opacity-80 hover:opacity-100"
        >
            <FaAngleRight className="w-6 h-6 mx-auto translate-y-2" />
        </div>
    )
}
function ServiceList(props: IServiceListProps) {
    return (
        <div className="w-full py-9 bg-white">
			<div className="font-[600] text-2xl">
				<span>Các dịch vụ khác của: </span><span className="text-brand-primary">Tên người dùng</span> 
			</div>
            <div className="slider-wrapper">
                <Slider
                    className="custom-slider"
                    accessibility
                    slidesToShow={5}
                    prevArrow={<PrevArrow />}
                    nextArrow={<NextArrow />}
                >
                    <ItemService />
                    <ItemService />
                    <ItemService />
                    <ItemService />
                    <ItemService />
                    <ItemService />
                    <ItemService />
                </Slider>
            </div>
        </div>
    )
}
export default ServiceList
