// Get elements
const display = document.getElementById("display");
const clearBtn = document.getElementById("clear");
const delBtn = document.getElementById("delete");
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

// 1. START FRESH IF ENTERING NUM AFTER CLICKING ENTER          - done
// 2. PREVENT MULTIPLE OPERATORS BEING ENTERED CONSECUTIVELY    - 
// 3. ROUND FLOATS                                              - 
// 4. ADD MESSAGE ABOUT DIV BY ZERO                             - done
// 5. BACKSPACE BUTTON                                          - done, with bugs
// 6. ADD KEYBOARD CAPABILITY                                   -

const input = (element) => {
  current = element.target.textContent;
  const operators = ["+", "x", "-", "/"];
  if (current == "CLEAR") {
    // Clear button actions
    clear();
  } else if (operators.includes(current) && prev != '=') {
    console.log('test1')
    // Operator button actions
    operator = current;
    operate(operator, parseFloat(firstNum), parseFloat(currentNum));
    firstNum = currentNum;
    currentNum = '';
  } else if (current == "=") {
    // Equate button actions
    operate(operator, parseFloat(firstNum), parseFloat(currentNum));
    firstNum = result;
  } else if (current == "DELETE") {
    del();
  } else {
    // Numeric button actions
    // if (prev == "=" && operators.includes(current) ) {
    //   currentNum = current;
    // } else {
    //   firstNum = currentNum;
    //   currentNum = currentNum + current;
    // }
    currentNum = currentNum + current;
    result = currentNum;

  }
  updateDisplay(current, currentNum, operators)
  prev = current;
  console.log(`CURRENT is ${current}`);
  console.log(`firstNum is ${firstNum}`);
  console.log(`currentNum is ${currentNum}`);  
  console.log(`result is ${result}`);  
  console.log(`entered str is ${enteredString}`);  
  return current;
};

const updateDisplay = (current, currentNum, operators) => {
  display.style.animation = "none";
  enteredString = enteredString + current;
  if (current == "=") {
    display.textContent = result;
    enteredString = '';
  } else if (operators.includes(current)) {
    display.textContent = enteredString;
  } else if (current = 'DELETE') {
    display.textContent = currentNum;
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
      b == 0 ? alert('This is why we can\'t have nice things...') : false;
      result = divide(a, b);
    }    
  parseFloat(result)
  console.log(typeof(result)) 
  // result = result.toFixed(2).replace(/\.0/,'')
} else {
    result = currentNum;
  }

  return result;
};

const clear = () => {
  display.style.animation = '';
  display.textContent = originalDisplay;
  displayText = '';
  enteredString = '';
  currentNum = '';
  firstNum = '';
  result = 0;
  current = '';
  prev = '';
};

const del = () => {
  console.log('test')
  firstNum = currentNum; 
  currentNum = currentNum.substring(0, currentNum.length - 1);
  result = currentNum;
}

display.addEventListener("click", updateDisplay);
key.forEach((element) => {
  element.addEventListener("click", input);
});
clearBtn.addEventListener("click", clear);
delBtn.addEventListener("click", del);

enterBtn.addEventListener("click", operate);
