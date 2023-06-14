import { createContext } from "react";

import style from "./theme-wrapper.module.css";

const theme = style.dark;
export const ThemeContext = createContext(theme);