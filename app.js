const screen = document.querySelector('.screen');
const buttons = document.querySelector('.calc-buttons');

let screenValue = '0';
let operator;
let previousValue = 0;
const MAX_DIGIT = 15;
let isEqualPressed = false;

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
  } else if (operator && !previousValue) {
    previousValue = parseInt(screenValue);
    screenValue = number;
  } else if (isEqualPressed) {
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
      // If Operator exists then it should match with sym
      // e.g. evaluate '5 + 5' and '+', . Not for any other signs except '='
      if (operator && operator !== sym && sym !== '=') return;

      // Filtering Equals
      if (sym === '=' && !previousValue) return;

      if (previousValue && operator) {
        evaluate();
      }
      if (sym === '=') {
        isEqualPressed = true;
      } else {
        operator = sym;
        isEqualPressed = false;
      }
  }
}

function clear() {
  screenValue = '0';
  reset();
}

function reset() {
  previousValue = 0;
  operator = '';
  isEqualPressed = false;
}

function evaluate() {
  let result = calculate(previousValue, operator, parseInt(screenValue));
  // convert num to string
  result = result.toString();
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

function calculate(operand1, operator, operand2) {
  switch (operator) {
    case '÷':
      return operand1 / operand2;
      break;
    case '×':
      return operand1 * operand2;
      break;
    case '−':
      return operand1 - operand2;
      break;
    case '+':
      return operand1 + operand2;
  }
}
