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
  // For the numbers
  if (parseInt(value) || parseInt(value) === 0) {
    displayNumber(value);
  }
  // For other stuffs
  else {
    switch (value) {
      case 'C':
        clear();
        break;
      case '←':
        backspace();
        break;
      case '÷':
      case '×':
      case '−':
      case '+':
        operator = value;
        break;
      case '=':
        let result = calculate(previousValue, operator, parseInt(screenValue));
        // convert num to string
        result = result.toString();
        // Result is trimmed if it is bigger than MAX_DIGIT
        if (result.length > MAX_DIGIT) {
          result = result.slice(0, 13);
        }

        screenValue = result;
        displayValue(screenValue);
        previousValue = 0;
        operator = '';
    }
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

function displayNumber(value) {
  if (screenValue === '0') {
    screenValue = value;
  } else if (screenValue.length === MAX_DIGIT) {
    alert('Please use less numbers!');
    return;
  } else if (operator && !previousValue) {
    previousValue = parseInt(screenValue);
    screenValue = value;
  } else {
    screenValue += value;
  }
  displayValue(screenValue);
}

function clear() {
  screenValue = '0';
  displayValue(screenValue);
}

function backspace() {
  if (screenValue === '0') return;
  screenValue = screenValue.slice(0, -1);
  // For empty strings
  if (screenValue === '') {
    screenValue = '0';
  }
  displayValue(screenValue);
}
function displayValue(value) {
  screen.innerText = value;
}
