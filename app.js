const screen = document.querySelector('.screen');
const buttons = document.querySelector('.calc-buttons');

let screenValue = '0';
let previousOperator;
let runningTotal = 0;
const MAX_DIGIT = 15;
let isEqualPressed = false;

// One Event Listener for all the buttons, leveraging Event Bubbling
buttons.addEventListener('click', function (e) {
  buttonClick(e.target.innerText);
});

function buttonClick(value) {
  // For differentiating numbers and symbols click
  if (isNaN(value)) {
    // For symbols
    handleSymbol(value);
  } else {
    // For numbers
    handleNumber(value);
  }
  // Rendering to the screen
  screen.innerText = screenValue;
}

function handleNumber(number) {
  if (screenValue === '0') {
    screenValue = number;
  } else if (screenValue.length === MAX_DIGIT) {
    alert('Please use less digits!');
  } else if (previousOperator && !runningTotal) {
    // After previous operator, screen value should be replaced
    runningTotal = parseInt(screenValue);
    screenValue = number;
  } else if (isEqualPressed) {
    // If '=' was pressed, screen value should be replaced
    screenValue = number;
    isEqualPressed = false;
  } else {
    screenValue += number;
  }
}

function handleSymbol(sym) {
  switch (sym) {
    case 'C':
      clear();
      break;
    case '←':
      backspace();
      break;
    // default case will be applied for '+', '-', '×', '÷' and '='
    default:
      if (screenValue === '0') return;

      // changing previousOperator
      // If a user presses '+'/'-' then '×'/'÷'
      if (previousOperator && !runningTotal) {
        previousOperator = sym;
        return;
      }

      // If Operator exists then it should match with sym
      // e.g. evaluate '5 + 5' and '+', . Not for any other signs except '='
      if (previousOperator && previousOperator !== sym && sym !== '=') return;

      // Filtering Equals
      if (sym === '=' && !runningTotal) return;

      if (runningTotal && previousOperator) {
        evaluate();
      }
      if (sym === '=') {
        isEqualPressed = true;
      } else {
        previousOperator = sym;
        isEqualPressed = false;
      }
  }
}

function clear() {
  screenValue = '0';
  reset();
}

function reset() {
  runningTotal = 0;
  previousOperator = '';
  isEqualPressed = false;
}

function evaluate() {
  switch (previousOperator) {
    case '+':
      runningTotal += parseInt(screenValue);
      break;
    case '−':
      runningTotal -= parseInt(screenValue);
      break;
    case '×':
      runningTotal *= parseInt(screenValue);
      break;
    case '÷':
      runningTotal /= parseInt(screenValue);
  }
  // convert num to string
  let result = runningTotal.toString();
  // Result is trimmed if it is bigger than the MAX_DIGIT
  if (result.length > MAX_DIGIT) {
    result = result.slice(0, 13);
  }

  screenValue = result;
  reset();
}

function backspace() {
  if (screenValue.length === 1) {
    screenValue = '0';
    reset();
  } else {
    screenValue = screenValue.slice(0, -1);
  }
}
