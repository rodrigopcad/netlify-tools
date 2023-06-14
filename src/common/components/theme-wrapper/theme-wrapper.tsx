import React, { ReactNode, useEffect, useRef, useState } from "react";
import { ThemeContext } from "./context";

import style from "./theme-wrapper.module.css";

import moon from "./images/moon.png";
import sun from "./images/sun.png";

interface Props {
    children: ReactNode;
}

const ThemeWrapper: React.FC<Props> = ({ children }) => {
    const [theme, setTheme] = useState("");
    const storagedTheme = useRef(localStorage.getItem("theme"));

    useEffect(() => {
        const lastTheme = !storagedTheme.current || storagedTheme.current === style.dark ? style.dark : style.light;
        storagedTheme.current = lastTheme === style.light ? style.light : style.dark;
        setTheme(lastTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = storagedTheme.current === style.light ? style.dark : style.light;
        storagedTheme.current = newTheme === style.light ? style.light : style.dark;
        setTheme(newTheme);
        localStorage.setItem("theme", storagedTheme.current);
    };

    return <ThemeContext.Provider value={theme}>
        <>
            <img src={storagedTheme.current === style.light ? moon : sun} alt="change theme" onClick={toggleTheme}
                className={style.toogleTheme} />
            {children}
        </>
    </ThemeContext.Provider>;
};

export default ThemeWrapper;