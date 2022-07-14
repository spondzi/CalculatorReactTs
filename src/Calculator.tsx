import { default as bemCssModules } from "bem-css-modules";
import { Provider } from "mobx-react";

import { Display, MainKeyboard, MemoryKeyboard } from "components";
import { getRootStores } from "stores/getRootStores";

import { default as CalculatorStyles } from "Calculator.module.scss";

bemCssModules.setSettings({
  modifierDelimiter: "--",
});

const style = bemCssModules(CalculatorStyles);

export function Calculator() {
  return (
    <>
      <div className={style()}>
        <h1 className={style("heading")}>
          Calculator in React + TS{" "}
          <span className={style("heart")}>&hearts;</span>{" "}
        </h1>
        <Provider {...getRootStores()}>
          <Display />
          <MemoryKeyboard />
          <MainKeyboard />
        </Provider>
      </div>
    </>
  );
}
