import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
interface FormSelectProps {
    name: string;
    onChange?: (value : any) => void;
    value?: string;
    options: Array<{
        label: string;
        value: string;
        disabled?: boolean;
        extra_data?: string;
    }>;
    className?: string;
    defaultValue?: string;
}
export default function Comboboxtext(props: FormSelectProps) {
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(props.options[0]);
    useEffect(() => {
        if (props.defaultValue) {
            let defaultSelected = props.options.find(
                (o) => o.value === props.defaultValue
            );
            setSelected(defaultSelected || props.options[0]);
        }
    }, [props.defaultValue, props.options]);
    const filteredItem =
    query === ''
      ? props.options
      : props.options.filter((item) =>
          item.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
    useEffect(() => {
        props.onChange?.(selected)
    },[selected])
    return (
        <Combobox value={selected} onChange={setSelected}>
            <div className="relative z-40 mt-1">
                <div className="relative border border-neutral-20 w-full cursor-default overflow-hidden bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none h-[50px] pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        placeholder="Chọn ngân hàng"
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <FaAngleDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-36 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredItem.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Không tìm thấy
                            </div>
                        ) : (
                            filteredItem.map((item) => (
                                <Combobox.Option
                                    key={item.value}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={item.value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {item.label} {item.extra_data ? <>- {item.extra_data}</> : <>- {item.value}</> }
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    );
}
