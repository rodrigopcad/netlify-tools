import { Dispatch, HTMLInputTypeAttribute, SetStateAction, useRef, useState } from "react";

import style from "./input.module.css";

import iconDelete from "common/images/delete.svg";

interface Props {
    placeholder?: string;
    setState: Dispatch<SetStateAction<string>>;
    type?: HTMLInputTypeAttribute;
    hideIcon?: boolean;
    value?: string;
    disabled?: boolean;
}

const Input: React.FC<Props> = ({ placeholder, value, setState, type = "text", hideIcon = false,
    disabled = false }) => {
    const [showIcon, setShowIcon] = useState(false);
    const iconRef = useRef<HTMLImageElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const iconHandle = () => {
        setState("");
        if (!inputRef.current) return;
        inputRef.current.value = "";
        setShowIcon(false);
    };

    const onChange = (value: string) => {
        setShowIcon(inputRef.current?.value !== "");
        setState(value);
    };

    return <div className={style.searchbar}>
        <img ref={iconRef}
            hidden={!showIcon || hideIcon} src={iconDelete} className={style.icon} onClick={iconHandle} />
        <input ref={inputRef} type={type}
            placeholder={placeholder} onChange={e => onChange(e.target.value)} value={value} disabled={disabled} />
    </div>;
};

export default Input;

