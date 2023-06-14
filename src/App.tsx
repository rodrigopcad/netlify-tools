import Navbar from "common/components/navbar/navbar";
import { ReactElement, useContext, useState } from "react";
import { ThemeContext } from "./common/components/theme-wrapper/context";

import style from "./App.module.css";

function App() {
  const theme = useContext(ThemeContext);
  const [element, setElement] = useState<ReactElement>();

  return (
    <div className={`${style.App} ${theme}`}>
      <Navbar setState={setElement} />
      {element}
    </div>
  );
}

export default App;