var CalculatorHelper = (function() {
  'use strict';

  /************************************************************************
    getFixedPoint() resolves rounding differences by using lengthCheck()
    to retrieve the number of places after the decimal point for both
    values, combining those values, and returning the maximum result when
    compared against the defualt fixed point value of 10 places.
    getFixedPoint() defaults to a 10 character fixed point minimum to
    account for instances where an operation involving only integers
    results in a float.
  *************************************************************************/

  function getFixedPoint(num1, num2) {
      var length1 = lengthCheck(num1),
          length2 = lengthCheck(num2),
          minLength = 10,
          maxLength = length1 + length2;

    return Math.max(minLength, maxLength);
  }

  /************************************************************************
    leadTrimmer() is used by trimLeadChar() to recursively trim leading 0's
    from a given number array.
  *************************************************************************/

  function leadTrimmer(numArray) {
    var startFrom = 0;

    if (numArray.length > 1) {
      if (numArray[startFrom] === '-') {
        startFrom += 1;
      }

      if (!notAFloat(numArray)) {
          startFrom += 1;
      }

      if (numArray[startFrom] === '0') {
        numArray.splice(startFrom, 1);
        leadTrimmer(numArray);
      }
    }

    return numArray;
  }

  /************************************************************************
    lengthCheck() is used by getFixedPoint() to check for a decimal in a
    given number. If a decimal is present, the number of places after the
    decimal are counted. The presence of a negative symbol is also
    accounted for.
  *************************************************************************/

  function lengthCheck(num) {
    var floatPointStart,
        floatLength,
        postPointLength = 0;

    if (num.toString().indexOf('.') !== -1) {
      floatPointStart = num.toString().indexOf('.');
      floatLength = num.toString().length;

      // if '-' is present, -1 from the total length
      if (num.toString().indexOf('-') !== -1) {
        floatLength -=1;
      }

      postPointLength = floatLength - floatPointStart;
    }

    return postPointLength;
  }

  /************************************************************************
    notAFloat() checks for the presence of a decimal in a given
    number array.
  *************************************************************************/

  function notAFloat(numArray) {
    return numArray.indexOf('.') === -1;
  }

  /************************************************************************
    trailtrimmer() is used by trimTrailChar() to recursively trim trailing
    0's and decimals from a given number array.
  *************************************************************************/

  function trailTrimmer(numArray) {
    var lastChar = numArray[numArray.length - 1];

    switch (lastChar) {
      case '0':
        numArray.splice(numArray.length - 1, 1);
        trailTrimmer(numArray);
        break;
      case '.':
        numArray.splice(numArray.length - 1, 1);
        break;
    }

    return numArray;
  }

  /************************************************************************
    trimAllChar() implements trimTrailChar() and trimLeadChar() to remove
    all leading 0's, and all trailing 0's and decimals.
  *************************************************************************/

  function trimAllChar(num) {
    num = trimTrailChar(num);
    num = trimLeadChar(num);
    return num;
  }

  /************************************************************************
    trimLeadChar() splits a given number into an array of numbers and
    uses leadTrimmer() to remove leading 0's.
  *************************************************************************/

  function trimLeadChar(num) {
    num = num.toString().split('');
    num = leadTrimmer(num);
    return num.join('');
  }

  /************************************************************************
    trimTrailChar() splits a given number into an array of numbers and
    uses trailTrimmer() to remove trailing 0's and decimals.
  *************************************************************************/

  function trimTrailChar(num) {
    num = num.toString().split('');

    if (!notAFloat(num)) {
      num = trailTrimmer(num);
    }

    return num.join('');
  }

  return {
    getFixedPoint: getFixedPoint,
    notAFloat: notAFloat,
    trimAllChar: trimAllChar,
    trimLeadChar: trimLeadChar,
    trimTrailChar: trimTrailChar
  }

})();
