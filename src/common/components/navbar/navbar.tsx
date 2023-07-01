import React, { Dispatch, JSXElementConstructor, ReactElement, SetStateAction, useEffect, useState } from "react";

import Endpoint from "modules/endpoint/pages/endpoint";
import ExtractTable from "modules/extract-table/pages/extract-table";
import FilterColorSvg from "modules/filter-color-svg/pages/filter-color-svg";
import GitProcess from "modules/git-process/git-process";
import style from "./navbar.module.css";

interface Page {
    name: string;
    active?: boolean;
    element: ReactElement;
}

interface Props {
    setState: Dispatch<SetStateAction<ReactElement<unknown, string | JSXElementConstructor<unknown>> | undefined>>
}

const Navbar: React.FC<Props> = ({ setState }) => {
    const [pages, setPages] = useState<Page[]>([
        { name: "Endpoints", element: <Endpoint />, active: true },
        { name: "Extrair Tabelas", element: <ExtractTable /> },
        { name: "Filtro para SVG", element: <FilterColorSvg /> },
        { name: "Processo Git", element: <GitProcess /> }
    ]);

    useEffect(() => {
        setState(pages.find(page => page.active)?.element);
    }, [pages]);

    const toggleActive = (page: Page) => {
        const oldies = [...pages];
        oldies.map(old => old.active = old.name === page.name);
        setPages(oldies);
    };

    return <div className={style.navbar}>
        <ul className={style.pages}>
            {pages.map((page, i) => <li key={i} className={page?.active ? style.active : undefined}>
                <a onClick={() => toggleActive(page)}>{page.name}</a>
            </li>)}
        </ul>
    </div>;
};

export default Navbar;