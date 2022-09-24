import classnames from 'classnames';
import {InputHTMLAttributes} from 'react';

interface INumberBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    numberBoxHasContent?: boolean;
	primary?: boolean;
	secondary?: boolean;
	plain?: boolean;
	name: string;
} 

function NumberBox({numberBoxHasContent = true, primary, plain, secondary, ...props} : INumberBoxProps) {
    const NumberBox = classnames({
        'w-[104px] h-[136px] px-[40px] py-[44px] text-4xl text-[#25324B] font-semibold border bordercolor-[#EFF0F6] outline-[#EFF0F6]': numberBoxHasContent
    }, 'bg-light')
    return <input className={NumberBox} {...props}></input>
}

export default NumberBox;
