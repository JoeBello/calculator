var Operands = (function(CalculatorHelper) {
  var operandMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'zero': 0
  };

  operandMap.toggleSign = function(operand) {
    // a value of zero cannot be negative
    if (operand.getValue() != 0) {
      if (operand.getValue().charAt(0) !== '-') {
        operand.value.unshift('-')
      } else
        operand.value.shift();
    }
  }

  operandMap.toFloat = function(operand) {
    if (CalculatorHelper.notAFloat(operand.value)) {
      if (operand.value.length === 0) {
        operand.value.push('0')
      }
      operand.value.push('.');
    }
  }

  operandMap.toPercent = function(operand) {
    var percent = operand.getValue() / 100;
    operand.value = percent.toString().split('');
  }

  return operandMap;

})(CalculatorHelper);
