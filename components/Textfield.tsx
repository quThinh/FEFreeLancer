import classnames from 'classnames';

interface ITextfield {
    type?: string;
    textField1?: boolean;
	primary?: boolean;
	secondary?: boolean;
	plain?: boolean;
} 

function Textfield({textField1 = true} : ITextfield) {
    const textfieldClass = classnames({
        'w-[314px] h-[48px] px-[12px] py-[16px] border border-solid bordercolor-[#D6DDEB] outline-[#D6DDEB]': textField1
    }, '')
    return <input type="type" placeholder="This is place holder" className={textfieldClass}></input>
}

export default Textfield;