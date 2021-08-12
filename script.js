// Get elements
const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const key = Array.prototype.slice.call(
  document.getElementsByClassName("child")
);
key.shift(key.shift());
const enterBtn = document.getElementById("enter");

let originalDisplay = display.textContent;
let displayText = "";
let currentNum = '';
let current;
let enteredSym = "";
let operator = '';
let previousSym; 
let firstNum = '';

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

const input = (element) => {
  previousSym = current;
  current = element.target.textContent;  
  const operators = [current == "+", current == "x", current == "-", current == "/"];
  if (current == "CLEAR") {
    clear();
  } else if (operators.includes(true)) {
    operator = current;
    updateDisplay(current);
    console.log(current);

  } else if (current== "=") {
    operate(operator, parseInt(firstNum), parseInt(currentNum));
  } else {
    previousSym = parseInt(currentNum);
    if (typeof(previousSym) == 'number') {
      firstNum = firstNum + currentNum ;
    } else {
      firstNum = ''
    }
    currentNum = current;
    updateDisplay(currentNum);
    console.log(`this is previoussym ${typeof(previousSym)}`) 
    console.log(`firstNum is ${firstNum}`);
    console.log(`currentNum is ${currentNum}`);

    
  }    

  return current;
};

const updateDisplay = (current) => {
  display.style.animation = "none";
  display.textContent = enteredSym + current;
  enteredSym = display.textContent;
};

const operate = (operator, a, b) => {
  if (operator == "+") {
    result = add(a, b);
  } else if (operator == "-") {
    result = subtract(a, b);
  } else if (operator == "x") {
    result = multiply(a, b);
  } else if (operator == "/") {
    result = divide(a, b);
  }
  clear();
  updateDisplay(result);
  currentNum = result;
  return currentNum;
};

const clear = () => {
  display.style.animation = "";
  display.textContent = originalDisplay;
  displayText = originalDisplay;
  enteredSym = "";
  currentNum = '';
  firstNum = '';
};

display.addEventListener("click", updateDisplay);
key.forEach((element) => {
  console.log(element);
  element.addEventListener("click", input);
});
clearBtn.addEventListener("click", clear);

enterBtn.addEventListener("click", operate);
