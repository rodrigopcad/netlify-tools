import React from "react";

import style from "./button.module.css";

interface Props {
    text: string;
    onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
    return <button className={style.button} onClick={onClick}>{text}</button>;
};

export default Button;