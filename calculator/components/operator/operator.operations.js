var Operations = (function CalculatorMath(CalculatorHelper) {
  'use strict';

  function add(num, more) {
    var fixedPoint = CalculatorHelper.getFixedPoint(num, more);
    return (num + more).toFixed(fixedPoint);
  }

  function divide(num, divisor) {
    var fixedPoint = CalculatorHelper.getFixedPoint(num, divisor);
    return (num / divisor).toFixed(fixedPoint);
  }

  function multiply(num, multiplier) {
    var fixedPoint = CalculatorHelper.getFixedPoint(num, multiplier);
    return (num * multiplier).toFixed(fixedPoint);
  }

  function subtract(num, less) {
    var fixedPoint = CalculatorHelper.getFixedPoint(num, less);
    return (num - less).toFixed(fixedPoint);
  }

  return {
    add: add,
    divide: divide,
    multiply: multiply,
    subtract: subtract
  }

})(CalculatorHelper)
