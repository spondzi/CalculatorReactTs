import Button from "components/Button";
import { default as bemCssModules } from "bem-css-modules";
import { default as MemoryKeyboardStyles } from "./MemoryKeyboard.module.scss";
import { FC } from "react";
import { inject, observer } from "mobx-react";
import { CalculatorStore } from "stores/CalculatorStore";

const style = bemCssModules(MemoryKeyboardStyles);

interface MemoryKeyboardProps {
  calculatorStore?: CalculatorStore;
}

const MemoryKeyboard: FC<MemoryKeyboardProps> = (props) => {
  if (!props.calculatorStore) {
    return null;
  }

  const {
    clearMemory,
    readMemory,
    addToMemory,
    subtractFromMemory,
    setMemory,
  } = props.calculatorStore;

  return (
    <div className={style()}>
      <Button content="MC" onClick={clearMemory} isMemory />
      <Button content="MR" onClick={readMemory} isMemory />
      <Button content="M+" onClick={addToMemory} isMemory />
      <Button content="M-" onClick={subtractFromMemory} isMemory />
      <Button content="MS" onClick={setMemory} isMemory />
    </div>
  );
};

const MemoryKeyboardConsumer = inject("calculatorStore")(
  observer(MemoryKeyboard)
);

export default MemoryKeyboardConsumer;
