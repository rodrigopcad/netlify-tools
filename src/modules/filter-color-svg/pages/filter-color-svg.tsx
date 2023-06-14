import Input from "common/components/input/input";
import { FilterColorSvgController } from "modules/filter-color-svg/controllers/filter-color-svg";
import React, { CSSProperties, useEffect, useState } from "react";

import style from "../styles/filter-color-svg.module.css";

const FilterColorSvg: React.FC = () => {
    const [targetColor, setTargetColor] = useState("");
    const [filter, setFilter] = useState("");
    const [targetStyle, setTargetStyle] = useState<CSSProperties>();
    const [resultStyle, setResultStyle] = useState<CSSProperties>();
    const regHexColor = /^#(([\da-f]){3}){1,2}$/gi;
    const controller = new FilterColorSvgController(targetColor);

    const handleTargetColor = () => {
        const value = targetColor;

        if (value.match(/^[^#]/)) {
            setTargetColor(`#${value}`);
        }

        setTargetStyle({ backgroundColor: value.match(regHexColor) ? value : "transparent" });
    };

    const handleResultColor = () => {
        const value = controller.handleFilterColor();
        setFilter(value ? `filter: ${value};` : "");
        setResultStyle({ filter: value });
    };

    useEffect(() => {
        handleTargetColor();
        handleResultColor();
    }, [targetColor]);

    return <div className={style.container}>
        <div>
            <cite>Código extraído de&nbsp;
                <a href="https://codepen.io/sosuke/pen/Pjoqqp" target="_blank">
                    https://codepen.io/sosuke/pen/Pjoqqp
                </a>
            </cite>
            <p>O objetivo é criar a propriedade CSS <i>filter</i> para colorir um arquivo SVG aplicado a tag
                <i> img</i>.</p>
            <p>Ao filtro, é aplicado inicialmente os valores <b>brightness(0)</b> e&nbsp;
                <b>saturate(100%)</b> para tornar pretas todas as cores do SVG, caso este contenha stilos de
                preechimento e bordas. Se quiser aplicar o filtro a imagens raster, remova os valores citados.</p>

            <p>Exemplo:</p>
            <small>HTML</small>
            <pre>{`
    <img class="imagem-svg" src="/assets/images/file.svg />
            `}</pre>
            <small>CSS</small>
            <pre>{`
    .imagem-svg {
        filter: brightness(0) saturate(100%) invert(45%) sepia(100%) saturate(351%) hue-rotate(32deg) brightness(95%) contrast(98%);
    }
            `}</pre>
        </div>
        <div className={style.placeHorizontal}>
            <div className={style.colorBox} style={targetStyle}></div>
            <Input placeholder="Cor alvo (hexadecimal)" setState={setTargetColor} value={targetColor} />
        </div>
        <div className={style.placeHorizontal}>
            <div className={`${style.colorBox} ${style.bgBlack}`} style={resultStyle}></div>
            <Input placeholder="Filter CSS" setState={setFilter} value={filter} hideIcon
                disabled />
        </div>
    </div>;
};

export default FilterColorSvg;