import React, { createContext, useState } from "react";

export const CalculatorContext = createContext();

export const Provider = ({ children }) => {
  const [displayValue, setDisplayValue] = useState({
    value: "0",
    prevValue: null,
    content: "0",
  });
  const [specialButtonsState, setSpecialButtonsState] = useState({
    wasSpecialButtonClicked: false,
    isFunctionDone: false,
    wasEqualClicked: false,
  });

  return (
    <CalculatorContext.Provider
      value={{
        displayValue,
        setDisplayValue,
        specialButtonsState,
        setSpecialButtonsState,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
