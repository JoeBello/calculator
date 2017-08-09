var Equation = (function(Operand, Operator) {
  'use strict';

  var firstOperand = Operand.create(),
      operator = Operator.create(),
      secondOperand = Operand.create();

  function getCurrentOperand() {
    var currentState = getCurrentState(),
        currentOperand;

    if (currentState === firstOperand) {
      currentOperand = firstOperand;
    } else {
      currentOperand = secondOperand;
    }

    return currentOperand;
  }

  function getCurrentState() {
    var component,
        currentState,
        equation = getFullEquation(),
        variable;

    for (component in equation) {
      variable = equation[component];

      if (variable.isSet()) {
        currentState = variable;
      }
    }

    return currentState || equation.firstOperand;
  }

  function getCurrentValue() {
    var currentState = getCurrentState(),
        currentValue;

    if (currentState === secondOperand) {
      currentValue = secondOperand;
    } else {
      currentValue = firstOperand
    }

    return currentValue.getValue();
  }

  function getFullEquation() {
    return {
      firstOperand: firstOperand,
      operator: operator,
      secondOperand: secondOperand
    }
  }

  function router(value) {
    if (operator.isOperator(value)) {
      if (getCurrentState() === secondOperand) {
        throw new Error();
      } else {
        setOperator(value);
      }
    } else {
      setOperand(value);
    }
  }

  function setOperand(value) {
    var currentOperand = getCurrentOperand();
    currentOperand.setValue(value);
  }

  function setOperator(operation) {
    operator.setValue(operation);
  }

  return {
    getCurrentState: getCurrentState,
    getCurrentValue: getCurrentValue,
    getFullEquation: getFullEquation,
    router: router
  }

})(Operand, Operator);
