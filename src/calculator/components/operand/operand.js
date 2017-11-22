var Operand = (function(Operands) {
  'use strict';

  var Operand = {}

  Operand.clearValue = function() {
    this.value = [];
  }

  Operand.getValue = function() {
    return this.value.join('') || this.default;
  }

  Operand.init = function() {
    this.default = 0;
    this.value = [];
  }
  
  Operand.isSet = function() {
    return this.value.length > 0;
  }

  Operand.setValue = function(value) {
    var newValue;

    switch (typeof Operands[value]) {
      case 'number':
        newValue = Operands[value].toString().split('');
        break;
      case 'function':
        Operands[value](this);
        break;
      default:
        newValue = value.toString().split('');
        break;
    }

    if (newValue) { this.value = this.value.concat(newValue); }
  }

  function createOperand() {
    var newOperand = Object.create(Operand);
    newOperand.init();
    return newOperand;
  }

  return {
    create: createOperand
  }

})(Operands);
