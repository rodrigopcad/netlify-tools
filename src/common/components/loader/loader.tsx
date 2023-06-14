import React from "react";

import style from "./loader.module.css";

const Loader: React.FC = () => {
    return (
        <div className={style.container}>
            <div className={style.loader}></div>
        </div>
    );
};

export default Loader;