var CalculatorCore = (function(CalculatorHelper, Clear, Equality, Equation) {

  function delegateInput(value) {
    var result;

  /************************************************************************
    If Equation.router() throws an error, this would indicate that the
    value attempting to be set is an operator, while the current state of
    the equation is at the second operand. This conflict is resolved by
    solving the equation in it's current state, inserting the result into
    the equation as the first operand, then inserting the given value into
    the operator position.
  *************************************************************************/
    try {
      Equation.router(value);
    } catch (error) {
      result = solve();
      Clear.allAndSet(Equation);
      Equation.router(result);
      Equation.router(value);
    }
  }

  function clearState() {
    return Clear.getState();
  }

  function getCurrentValue() {
    var current = Equation.getCurrentValue();
    return CalculatorHelper.trimLeadChar(current);
  }

  function router(value) {
    var result;

    switch (value) {
      case 'clear':
        Clear.router(Equation);
        break;
      case 'equals':
        result = solve();
        Clear.allAndSet(Equation);
        Equation.router(result);
        break;
      default:
        Clear.set();
        delegateInput(value);
        break;
    }
  }

  function solve() {
    var result = Equality.solve(Equation);
    return CalculatorHelper.trimAllChar(result);
  }

  return {
    clearState: clearState,
    getCurrentValue: getCurrentValue,
    router: router
  }

})(CalculatorHelper, Clear, Equality, Equation);
