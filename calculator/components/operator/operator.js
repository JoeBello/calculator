var Operator = (function(Operations) {
  'use strict';

  var Operator = {};

  Operator.clearValue = function() {
    this.value = '';
  }

  Operator.init = function() {
    this.value = '';
  }

  Operator.isOperator = function (operator) {
    return Operations.hasOwnProperty(operator);
  }

  Operator.isSet = function() {
    return this.value.length > 0;
  }

  Operator.setValue = function(operator) {
    this.value = Operations[operator] ? operator : '';
  }

  Operator.solve = function(firstOperand, secondOperand) {
    var solution;

    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);

    if (this.value) {
      solution = Operations[this.value](firstOperand, secondOperand);
    } else {
      solution = firstOperand;
    }

    return solution;
  }

  function createOperator() {
    var newOperator = Object.create(Operator);
    newOperator.init();
    return newOperator;
  }

  return {
    create: createOperator
  }

})(Operations);
