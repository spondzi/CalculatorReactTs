import Button from "components/Button";
import { default as bemCssModules } from "bem-css-modules";
import { default as KeyboardStyles } from "./Keyboard.module.scss";
import { inject, observer } from "mobx-react";
import { CalculatorStore } from "stores/CalculatorStore";
import { FC } from "react";

const style = bemCssModules(KeyboardStyles);

interface MainKeyboardProps {
  calculatorStore?: CalculatorStore;
}

const MainKeyboard: FC<MainKeyboardProps> = (props) => {
  if (!props.calculatorStore) {
    return null;
  }

  const {
    updateDisplayValueAndContent,
    add,
    subtract,
    multiply,
    divide,
    equal,
    calculatePercent,
    clearCurrentValue,
    clearCurrentAndPreviousValues,
    backspaceCurrentValue,
    getFractionOfCurrentValue,
    getSquareOfCurrentValue,
    getSqrtOfCurrentValue,
    getNegationOfCurrentValue,
    addComma,
  } = props.calculatorStore;

  return (
    <div className={style()}>
      <Button content="%" onClick={calculatePercent} />
      <Button content="CE" onClick={clearCurrentValue} />
      <Button content="C" onClick={clearCurrentAndPreviousValues} />
      <Button content="&#8592;" onClick={backspaceCurrentValue} />
      <Button content="1/x" onClick={getFractionOfCurrentValue} />
      <Button content="x²" onClick={getSquareOfCurrentValue} />
      <Button content="√x" onClick={getSqrtOfCurrentValue} />
      <Button content="÷" onClick={divide} />
      <Button content="7" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="8" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="9" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="&#8339;" onClick={multiply} />
      <Button content="4" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="5" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="6" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="-" onClick={subtract} />
      <Button content="1" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="2" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="3" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="&#8330;" onClick={add} />
      <Button content="+/-" onClick={getNegationOfCurrentValue} isLighter />
      <Button content="0" onClick={updateDisplayValueAndContent} isLighter />
      <Button content="," onClick={addComma} isLighter />
      <Button content="&#8332;" onClick={equal} isEqual />
    </div>
  );
};

const MainKeyboardConsumer = inject("calculatorStore")(observer(MainKeyboard));

export default MainKeyboardConsumer;
