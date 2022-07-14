import { default as bemCssModules } from "bem-css-modules";
import React, { FC } from "react";
import { default as ButtonStyles } from "./Button.module.scss";

const style = bemCssModules(ButtonStyles);

type CalculatorFunction = () => void;
export type ConcatenateFunction = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void;

interface ButtonProps {
  content: string;
  isEqual?: boolean;
  isLighter?: boolean;
  isMemory?: boolean;
  onClick: CalculatorFunction | ConcatenateFunction;
}

const Button: FC<ButtonProps> = (props) => {
  const modifiers = {
    "is-equal": props.isEqual,
    "is-lighter": props.isLighter,
    "is-memory": props.isMemory,
  };

  const onClickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    props.onClick(event);
  };

  return (
    <button className={style(modifiers)} onClick={onClickHandler}>
      {props.content}
    </button>
  );
};

export default Button;
