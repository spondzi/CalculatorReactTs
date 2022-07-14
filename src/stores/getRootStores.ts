import { CalculatorStore } from "./CalculatorStore";

interface RootStore {
  calculatorStore: CalculatorStore;
}

export const getRootStores = (): RootStore => ({
  calculatorStore: new CalculatorStore(),
});
