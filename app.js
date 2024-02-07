const screen = document.querySelector('.screen');
const buttons = document.querySelector('.calc-buttons');

let screenValue = '0';
let operator;
let previousValue = 0;
const MAX_DIGIT = 13;

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
      if (previousValue && operator) {
        evaluate();
      }
      if (sym !== '=') operator = sym;
  }
}

function clear() {
  screenValue = '0';
  reset();
}

function reset() {
  previousValue = 0;
  operator = '';
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
  if (screenValue === '0') return;
  screenValue = screenValue.slice(0, -1);
  // For empty strings
  if (screenValue === '') {
    screenValue = '0';
    reset();
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
