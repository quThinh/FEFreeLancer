import { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import Textfield from "./Textfield";

interface IInputWithPostFixProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: IconType;
}

function InputWithPostfix(props: IInputWithPostFixProps) {
  const Icon = props.icon;
  return (
    <label className="bg-white relative">
      <Textfield />
      {Icon && <Icon className="absolute top-[50%] right-0 -translate-x-[50%] -translate-y-[50%]" />}
    </label>
  );
}
export default InputWithPostfix;
