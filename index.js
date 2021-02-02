const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    // select the element with class of `calculator-screen`
   const display = document.querySelector('.calculator-screen'); 
   // update the value of the element with the contents of `displauValue`
   display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys")
keys.addEventListener( "click", (event) => { 
    const { target } = event;
    const { value } = target;
    keys.addEventListener('click', event => {
        const { target } = event;
        const { value } = target;
        if (!target.matches('button')) {
          return;
        }
      
        switch (value) {
          case '+':
          case '-':
          case '*':
          case '/':
          case '=':
            handleOperator(value);
            break;
          case '.':
            inputDecimal(value);
            break;
          case 'all-clear':
            resetCalculator();
            break;
          default:
            // check if the key is an integer
            if (Number.isInteger(parseFloat(value))) {
              inputDigit(value);
            }
        }
      
        updateDisplay();
      });
      
    
    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains("operator")){
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
    }

    if (target.classList.contains('all-clear')) {
       resetCalculator()
       updateDisplay() ;
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

function inputDigit(digit) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit; 

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    
    console.log(calculator);
}

function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.watingForSecondOperand = false;
        return
    }
    if (!calculator.displayValue.includes(dot)) {
        //Append the decimal point
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator

    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
    
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
      return firstOperand + secondOperand;
  } else if (operator === '-') {
      return firstOperand - secondOperand;
  } else if (operator === '*') {
      return firstOperand * secondOperand;
  } else if (operator === '/') {
      return firstOperand / secondOperand;
  }

  return secondOperand;
}
function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}