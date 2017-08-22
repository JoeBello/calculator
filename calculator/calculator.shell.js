var Calculator = (function(Core) {
  'use strict';

  var innerScreen,
      outerScreen,
      clear = document.getElementById('clear');

  function clickRouter(inputId) {
    Core.router(inputId);
    renderScreen();
  }

  function init(innerScreenId, inputSourceId, outerScreenId) {
    innerScreen = document.getElementById(innerScreenId);
    outerScreen = document.getElementById(outerScreenId);
    inputListener(inputSourceId);
    renderAC();
    renderScreen();
  }

  function inputListener(inputId) {
    document.getElementById(inputId)
      .addEventListener('click', function inputClick(event) {
        event.stopPropagation();
        clickRouter(event.target.id);
        renderAC();
      })
  }

  function renderAC() {
    var currentState = Core.clearState(),
        clearMap = {
          'one': 'C',
          'all': 'AC'
        };

    clear.innerHTML = clearMap[currentState];
  }

  function renderScreen() {
    resetScreen();
    innerScreen.innerHTML = Core.getCurrentValue();
    watchFontScale();
  }

  function resetScreen() {
    innerScreen.style.fontSize = '100%';
  }

  function watchFontScale() {
    var fontSizeNow = innerScreen.style.fontSize.replace(/\W/g, '');

    while (innerScreen.offsetWidth > outerScreen.offsetWidth ) {
      fontSizeNow -= 1;
      innerScreen.style.fontSize = fontSizeNow + '%';
    }
  }

  return {
    init: init
  }

})(CalculatorCore);
