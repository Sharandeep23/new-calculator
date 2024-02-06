const screen = document.querySelector('.screen');
const buttons = document.querySelector('.calc-buttons');
let currentValue = 0;

buttons.addEventListener('click', function (e) {
  const currentElementText = e.target.innerText;

  if (parseInt(currentElementText) || parseInt(currentElementText) === 0) {
    displayNumber(currentElementText);
  } else {
    switch (currentElementText) {
      case 'C':
        clear();
        break;
      case '←':
        backspace();
        break;
      case '÷':
        // dividing function
        break;
      case '×':
        // multiplication function
        break;
      case '−':
        // minus function
        break;
      case '+':
        // addition function
        break;
      case '=':
        // equal function
        break;
    }
  }
});

function displayNumber(value) {
  if (currentValue === 0) {
    screen.innerText = value;
  } else {
    screen.innerText += value;
  }
  //   setting the current value for calculations
  currentValue = parseInt(screen.innerText);
}

function clear() {
  screen.innerText = 0;
  currentValue = 0;
}

function backspace() {
  if (currentValue === 0) return;
  screen.innerText = screen.innerText.slice(0, -1);
  // For empty strings
  if (screen.innerText === '') {
    screen.innerText = '0';
  }
  currentValue = parseInt(screen.innerText);
}
