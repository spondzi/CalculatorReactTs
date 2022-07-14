import { FC, useEffect, useRef } from "react";
import { default as bemCssModules } from "bem-css-modules";
import { default as DisplayCSS } from "./Display.module.scss";
import { inject, observer } from "mobx-react";
import { CalculatorStore } from "stores/CalculatorStore";

const style = bemCssModules(DisplayCSS);

interface DisplayProps {
  calculatorStore?: CalculatorStore;
}

const Display: FC<DisplayProps> = (props) => {
  const displayRef = useRef<HTMLParagraphElement>(null);
  const previousDisplayRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (displayRef.current !== null) {
      props.calculatorStore!.displayElement = displayRef.current;
    }
  }, [displayRef, previousDisplayRef, props.calculatorStore]);

  if (!props.calculatorStore) {
    return null;
  }

  return (
    <div className={style()}>
      <p ref={displayRef}>0</p>
    </div>
  );
};

const DisplayConsumer = inject("calculatorStore")(observer(Display));

export default DisplayConsumer;
