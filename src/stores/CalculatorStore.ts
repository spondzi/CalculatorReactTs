import { ConcatenateFunction } from "components/Button/Button";
import React from "react";

type TSelectedFunction = (
  event?: React.MouseEvent,
  hasRepeatedValue?: boolean
) => void;

type TOperators = "+" | "-" | "*" | "/";

export class CalculatorStore {
  private memoryValue: number = 0;
  private displayValue: string = "0";
  private previousValue: string | null = null;
  private selectedFunction: TSelectedFunction | null = null;
  private isFunctionDone: boolean = false;
  private repeatedValue: string = "0";
  private wasEqualClicked: boolean = false;
  private wasSpecialButtonClicked: boolean = false;
  private display: HTMLParagraphElement;

  public set displayElement(element: HTMLParagraphElement) {
    this.display = element;
  }

  public clearMemory = (): void => {
    this.memoryValue = 0;
    this.setSpecialButtonClicked(true);
  };

  public readMemory = (): void => {
    this.displayContent = String(this.memoryValue);
    this.setSpecialButtonClicked(true);
  };

  public addToMemory = (): void => {
    this.memoryValue += Number(this.displayContent);
    this.setSpecialButtonClicked(true);
  };

  public subtractFromMemory = (): void => {
    this.memoryValue -= Number(this.displayContent);
    this.setSpecialButtonClicked(true);
  };

  public setMemory = (): void => {
    this.memoryValue = Number(this.displayContent);
    this.setSpecialButtonClicked(true);
  };

  public add: TSelectedFunction = (event, hasRepeatedValue): void => {
    this.callPreviousFunctionOfDifferentKindAndAsignNew(this.add);

    if (this.invokedTwiceInARow()) {
      this.setValuesForFunctionIsDone();
      this.setRepeatedValue();
      return;
    }

    const newValue = this.calculateNewValue("+", hasRepeatedValue);
    this.setRepeatedValue(hasRepeatedValue);
    this.displayContent = newValue;
    this.setPreviousValue(newValue);

    this.setValuesForFunctionIsDone();
  };

  public subtract: TSelectedFunction = (event, hasRepeatedValue): void => {
    this.callPreviousFunctionOfDifferentKindAndAsignNew(this.subtract);

    if (this.invokedTwiceInARow()) {
      this.setValuesForFunctionIsDone();
      this.setRepeatedValue();
      return;
    }

    const newValue: string = this.calculateNewValue("-", hasRepeatedValue);
    this.setRepeatedValue(hasRepeatedValue);
    this.displayContent = newValue;
    this.setPreviousValue(newValue);
    this.setValuesForFunctionIsDone();
  };

  public multiply: TSelectedFunction = (event, hasRepeatedValue): void => {
    this.callPreviousFunctionOfDifferentKindAndAsignNew(this.multiply);

    if (this.invokedTwiceInARow()) {
      this.setValuesForFunctionIsDone();
      this.setRepeatedValue();
      return;
    }

    const newValue: string = this.calculateNewValue("*", hasRepeatedValue);
    this.setRepeatedValue(hasRepeatedValue);
    this.displayContent = newValue;
    this.setPreviousValue(newValue);
    this.setValuesForFunctionIsDone();
  };

  public divide: TSelectedFunction = (event, hasRepeatedValue): void => {
    this.callPreviousFunctionOfDifferentKindAndAsignNew(this.divide);

    if (this.invokedTwiceInARow()) {
      this.setValuesForFunctionIsDone();
      this.setRepeatedValue();
      return;
    }

    const newValue: string = this.calculateNewValue("/", hasRepeatedValue);
    this.setRepeatedValue(hasRepeatedValue);
    this.displayContent = newValue;
    this.setPreviousValue(newValue);

    this.setValuesForFunctionIsDone();
  };

  public updateDisplayValueAndContent: ConcatenateFunction = (event): void => {
    const digit = event.currentTarget.textContent;
    if (digit) {
      this.setPreviousValueIfEqualClicked("0");

      if (this.specialButtonClicked() || this.displayValueLackValue()) {
        this.displayValue = digit;
      } else {
        this.displayValue += digit;
      }

      this.displayContent = this.displayValue;
      this.resetValuesForFunctionIsDone();
    }
  };

  public equal = (): void => {
    this.isFunctionDone = false;
    if (this.selectedFunction) {
      if (this.wasEqualClicked) {
        this.selectedFunction(undefined, true);
      } else {
        this.selectedFunction(undefined, false);
      }
    }
    this.wasEqualClicked = true;
  };

  public calculatePercent = (): void => {
    const newValue = this.percent();
    this.displayContent = newValue;
    this.wasSpecialButtonClicked = true;
  };

  public clearCurrentValue = (): void => {
    if (this.wasEqualClicked) {
      this.resetCurrentAndPreviousValues();
    }
    this.displayContent = "0";
    this.wasSpecialButtonClicked = true;
  };

  public clearCurrentAndPreviousValues = (): void => {
    this.displayContent = "0";
    this.resetCurrentAndPreviousValues();
    this.wasSpecialButtonClicked = true;
  };

  public backspaceCurrentValue = (): void => {
    const length = this.displayValue.length;
    const newDisplayValue = this.displayValue.substring(0, length - 1);
    this.changeDisplayContentBasedOnDisplayValue(
      newDisplayValue ? newDisplayValue : "0"
    );
  };

  public getFractionOfCurrentValue = (): void => {
    const newValue = String(1 / Number(this.displayContent));
    this.setPreviousValueIfEqualClicked(newValue);
    this.displayContent = newValue;
    this.wasSpecialButtonClicked = true;
  };

  public getSquareOfCurrentValue = (): void => {
    const newValue = String(Math.pow(+this.displayContent, 2));
    this.setPreviousValueIfEqualClicked(newValue);
    this.displayContent = newValue;
    this.wasSpecialButtonClicked = true;
  };

  public getSqrtOfCurrentValue = (): void => {
    const newValue: string = String(Math.sqrt(+this.displayContent));
    this.setPreviousValueIfEqualClicked(newValue);
    this.displayContent = newValue;
    this.wasSpecialButtonClicked = true;
  };

  public getNegationOfCurrentValue = (): void => {
    const newValue = String(Number(-this.displayContent));
    this.setPreviousValueIfEqualClicked(newValue);
    this.displayContent = newValue;
  };

  public addComma = (): void => {
    if (this.wasEqualClicked) {
      this.resetValuesForFunctionIsDone();
      this.setPreviousValue("0");

      this.changeDisplayContentBasedOnDisplayValue("0.");
    }

    if (this.displayContent.includes(".")) {
      return;
    }

    this.displayValue += ".";
    this.displayContent = this.displayValue;
  };

  private changeDisplayContentBasedOnDisplayValue(
    newDisplayValue: string
  ): void {
    this.displayValue = newDisplayValue;
    this.displayContent = this.displayValue;
  }

  private setPreviousValueIfEqualClicked(newValue: string): void {
    if (this.wasEqualClicked) {
      this.setPreviousValue(newValue);
    }
  }

  private resetCurrentAndPreviousValues(): void {
    this.displayValue = "0";
    this.previousValue = "0";
  }

  private percent(): string {
    const newValue = this.previousValue
      ? (Number(this.displayValue) / 100) * Number(this.previousValue)
      : 0;
    return String(newValue);
  }

  private callPreviousFunctionOfDifferentKindAndAsignNew(
    currentFunction: TSelectedFunction
  ): void {
    if (
      this.selectedFunction !== null &&
      currentFunction !== this.selectedFunction
    ) {
      this.selectedFunction();
    }
    this.setSelectedFunction(currentFunction);
  }

  private invokedTwiceInARow(): boolean {
    return this.isFunctionDone;
  }

  private setRepeatedValue(hasRepeatedValue?: boolean): void {
    if (hasRepeatedValue) {
      this.repeatedValue = this.repeatedValue;
    } else if (this.wasEqualClicked) {
      this.repeatedValue = this.getPreviousValue();
    } else {
      this.repeatedValue = this.displayContent;
    }
  }

  private calculateNewValue(
    operator: TOperators,
    hasRepeatedValue?: boolean
  ): string {
    const [currentValue, previousValue] =
      this.getCalculationValues(hasRepeatedValue);

    switch (operator) {
      case "+":
        return this.addValues(currentValue, previousValue);
      case "-":
        return this.subtractValues(
          currentValue,
          previousValue,
          hasRepeatedValue
        );
      case "*":
        return this.multiplyValues(currentValue, previousValue);
      case "/":
        return this.divideValues(currentValue, previousValue, hasRepeatedValue);
      default:
        throw new Error(`${operator} this operator is inproper`);
    }
  }

  private getCalculationValues(hasRepeatedValue?: boolean): [number, number] {
    const currentValue = Number(this.displayContent);
    const previousValue = hasRepeatedValue
      ? Number(this.repeatedValue)
      : Number(this.getPreviousValue());
    return [currentValue, previousValue];
  }

  private addValues(currentValue: number, previousValue: number): string {
    return String(previousValue + currentValue);
  }

  private subtractValues(
    currentValue: number,
    previousValue: number,
    hasRepeatedValue?: boolean
  ): string {
    return hasRepeatedValue
      ? String(+this.displayContent - +this.repeatedValue)
      : previousValue
      ? String(previousValue - currentValue)
      : String(currentValue);
  }

  private multiplyValues(currentValue: number, previousValue: number): string {
    return previousValue
      ? String(previousValue * currentValue)
      : String(currentValue);
  }

  private divideValues(
    currentValue: number,
    previousValue: number,
    hasRepeatedValue?: boolean
  ): string {
    return hasRepeatedValue
      ? String(+this.displayContent / +this.repeatedValue)
      : previousValue
      ? String(previousValue / currentValue)
      : String(currentValue);
  }

  private resetValuesForFunctionIsDone(): void {
    this.setSpecialButtonClicked(false);
    this.isFunctionDone = false;
    this.wasEqualClicked = false;
  }

  private getPreviousValue(hasRepeatedValue?: boolean): string {
    return this.previousValue === null
      ? "0"
      : hasRepeatedValue
      ? this.repeatedValue
      : this.previousValue;
  }

  private setPreviousValue(newValue: string): void {
    this.previousValue = newValue;
  }

  private setValuesForFunctionIsDone(): void {
    this.displayValue = "0";
    this.setSpecialButtonClicked(true);
    this.isFunctionDone = true;
    this.wasEqualClicked = false;
  }

  private displayValueLackValue(): boolean {
    return this.displayValue === "0" || this.displayValue === null;
  }

  private specialButtonClicked(): boolean {
    return this.wasSpecialButtonClicked || this.wasEqualClicked;
  }

  private setSpecialButtonClicked(newFlag: boolean): void {
    this.wasSpecialButtonClicked = newFlag;
  }

  private setSelectedFunction(newFunction: TSelectedFunction): void {
    this.selectedFunction = newFunction;
  }

  private get displayContent() {
    return this.display.textContent!;
  }

  private set displayContent(newContent: string) {
    this.display.textContent = newContent;
  }
}
