import classnames from 'classnames';

interface IInputBoxProps {
    outLine1?: boolean;
    outLine2?: boolean;
}

function InputBox({outLine2, outLine1 = true} : IInputBoxProps) {
    return <div className="input">
        <input type="text" placeholder='This is placeholder'/>
    </div>
}

export default InputBox