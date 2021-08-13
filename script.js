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
let enteredString = "";
let operator = '';
let firstNum;
let result = 0;
let prev;

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

// 1. START FRESH IF ENTERING NUM AFTER CLICKING ENTER
// 2. PREVENT MULTIPLE OPERATORS BEING ENTERED CONSECUTIVELY
// 3. ROUND FLOATS
// 4. ADD MESSAGE ABOUT DIV BY ZERO
// 5. BACKSPACE BUTTON
// 6. ADD KEYBOARD CAPABILITY

const input = (element) => {
  current = element.target.textContent;
  const operators = ["+", "x", "-", "/"];
  if (current == "CLEAR") {
    // Clear button actions
    clear();
  } else if (operators.includes(current) && typeof(prev) == 'string') {
    // Operator button actions
    operate(operator, parseFloat(firstNum), parseFloat(currentNum));
    operator = current;
    firstNum = currentNum;
    currentNum = '';
  } else if (current == "=") {
    // Equate button actions
    operate(operator, parseFloat(firstNum), parseFloat(currentNum));
    firstNum = result;
    currentNum = 0;
    currentNum = result;
  } else {
    // Numeric button actions
    currentNum = currentNum + current;
    
  }
  prev = current;
  updateDisplay(current, currentNum, operators);
  console.log(`CURRENT is ${current}`);
  console.log(`firstNum is ${firstNum}`);
  console.log(`currentNum is ${currentNum}`);  
  console.log(`result is ${result}`);  
  return current;
};

const updateDisplay = (current, currentNum, operators) => {
  display.style.animation = "none";
  enteredString = enteredString + current;
  if (current == "=") {
    display.textContent = result;
    enteredString = result;
  } else if (operators.includes(current)) {
    enteredString = firstNum + current;
    display.textContent = enteredString;
  } else {
    display.textContent = enteredString;
  }
};

const operate = (operator, a, b) => {
  if (firstNum){ 
    if (operator == "+") {
      result = add(a, b);
    } else if (operator == "-") {
      result = subtract(a, b);
    } else if (operator == "x") {
      result = multiply(a, b);
    } else if (operator == "/") {
      result = divide(a, b);
    }    
  } else {
    result = currentNum;
  } 

  // add floating point rounding
  // result.toFixed(2); 
  return result;
};

const clear = () => {
  display.style.animation = '';
  display.textContent = originalDisplay;
  displayText = originalDisplay;
  enteredString = '';
  currentNum = '';
  firstNum = '';
  result = 0;
  current = '';
};

display.addEventListener("click", updateDisplay);
key.forEach((element) => {
  console.log(element);
  element.addEventListener("click", input);
});
clearBtn.addEventListener("click", clear);

enterBtn.addEventListener("click", operate);
