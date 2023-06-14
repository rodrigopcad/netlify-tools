import Button from "common/components/button/button";
import { ThemeContext } from "common/components/theme-wrapper/context";
import { ExtractTableController } from "modules/extract-table/controllers/extract-table";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import themeStyle from "common/components/theme-wrapper/theme-wrapper.module.css";
import style from "../styles/extract-table.module.css";

import iconDelete from "common/images/delete.svg";

const ExtractTable: React.FC = () => {
    const theme = useContext(ThemeContext);
    const controller = useMemo(() => new ExtractTableController(), []);
    const [cssClass, setCssClass] = useState("");
    const [showIcon, setShowIcon] = useState(false);
    const refInput = useRef<HTMLTextAreaElement>(null);
    const refOutput = useRef<HTMLTextAreaElement>(null);
    const iconRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        theme === themeStyle.light
            ? setCssClass(style.light)
            : setCssClass("");
    }, [theme]);

    const generate = () => {
        const data = controller.generate(refInput.current?.value || "");
        if (!refOutput.current) return;
        refOutput.current.value = data;
    };

    const iconHandle = () => {
        if (!refInput.current || !refOutput.current) return;
        refInput.current.value = "";
        refOutput.current.value = "";
        setShowIcon(false);
    };

    const onChange = () => {
        setShowIcon(refInput.current?.value !== "");
    };

    return <div className={style.container}>
        <div className={style.header}>
            <Button text="Gerar" onClick={generate} />
        </div>

        <div className={style.textContainer}>
            <img ref={iconRef} hidden={!showIcon} src={iconDelete} className={style.icon} onClick={iconHandle} />
            <textarea className={`${style.text} ${cssClass}`} ref={refInput} onChange={onChange}
                placeholder="Cole aqui a stored procedure. Toque no botão &quot;Gerar&quot; para extrair a lista de 
                tabelas utilizadas no procedimento." />
        </div>
        <div className={style.textContainer}>
            <textarea ref={refOutput} className={`${style.text} ${cssClass}`} placeholder="Tabelas"
                readOnly={true} />
        </div>
    </div>;
};

export default ExtractTable;