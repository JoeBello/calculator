var Clear = (function() {
  'use strict';

  var state = 'all';

  function all(equationObj) {
    var component,
        equation = equationObj.getFullEquation(),
        variable;

    for (component in equation) {
      variable = equation[component];
      variable.clearValue();
    }
  }

  function one(equationObj) {
    var current = equationObj.getCurrentState();
    current.clearValue();
  }

  function router(equationObj) {
    if (state === 'one') {
      one(equationObj);
      state = 'all';
    } else {
      all(equationObj);
      state = 'all';
    }
  }

  function allAndSet(equationObj) {
    all(equationObj);
    set();
  }

  function allAndReset(equationObj) {
    all(equationObj);
    setToAll();
  }

  function getState() {
    return state;
  }

  function set() {
    state = 'one';
  }

  function setToAll() {
    state = 'all';
  }

  return {
    allAndSet: allAndSet,
    allAndReset: allAndReset,
    getState: getState,
    router: router,
    set: set
  }

})();
