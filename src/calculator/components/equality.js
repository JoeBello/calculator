var Equality = (function() {
  'use strict';

  function solve(equationObj) {
    var equation = equationObj.getFullEquation(),
        firstValue = equation.firstOperand.getValue(),
        operator = equation.operator,
        secondValue = equation.secondOperand.getValue() || firstValue;

    return operator.solve(firstValue, secondValue);
  };

  return {
    solve: solve
  }

})();
