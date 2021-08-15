// Get elements
const display = document.getElementById('display');
const clearBtn = document.getElementById('clear');
const delBtn = document.getElementById('delete');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const enterBtn = document.getElementById('enter');
const decimalBtn = document.getElementById('decimal');

let originalDisplay = display.textContent;
let firstNum;
let currentNum = '';
let enteredString = '';
let currentOperator;
let result = 0;
let operator;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

// 1. START FRESH IF ENTERING NUM AFTER CLICKING ENTER          - done, buggy
// 2. PREVENT MULTIPLE OPERATORS BEING ENTERED CONSECUTIVELY    - done
// 3. ROUND FLOATS                                              -
// 4. ADD MESSAGE ABOUT DIV BY ZERO                             - done
// 5. BACKSPACE BUTTON                                          - done
// 6. ADD KEYBOARD CAPABILITY                                   -

const inputNumber = (number) => {
	console.log('inputting number');
	display.style.animation = 'none';
	display.textContent = enteredString;
	if (firstNum) {
		currentNum = currentNum + number;
		display.textContent = enteredString + number;
	} else {
		display.textContent = enteredString + number;
	}
	currentOperator = false;
	enteredString = enteredString + number;
	console.log(`firstNum is ${firstNum}`);
	console.log(`currentNum is ${currentNum}`);
	console.log(`result is ${result}`);
	console.log(`entered str is ${enteredString}`);
};

const inputOperator = (operator) => {
	if (enteredString == '' || currentOperator == true) return;
	currentOperator = true;

	if (firstNum) {
		evaluate();
		enteredString = result + operator;
		currentNum = '';
	} else {
		firstNum = enteredString;
		enteredString = enteredString + operator;
	}
	display.textContent = enteredString;
	console.log(`firstNum is ${firstNum}`);
	console.log(`currentNum is ${currentNum}`);
	console.log(`result is ${result}`);
	console.log(`entered str is ${enteredString}`);
};

const operate = (operator, a, b) => {
	console.log('operating');
	if (firstNum) {
		if (operator == '+') {
			result = add(a, b);
		} else if (operator == '-') {
			result = subtract(a, b);
		} else if (operator == 'x') {
			result = multiply(a, b);
		} else if (operator == '/') {
			b == 0 ? alert("This is why we can't have nice things...") : false;
			result = divide(a, b);
		}
	}
	return result;
};

const inputDecimal = () => {};

const evaluate = () => {
	if (currentOperator) return;
	console.log('evaluating');
	operate(operator, parseFloat(firstNum), parseFloat(currentNum));
	display.textContent = result;
	enteredString = '';

	firstNum = result;
};

const clear = () => {
	console.log('clearing');
	display.style.animation = '';
	display.textContent = originalDisplay;
	enteredString = '';
	originalDisplay = display.textContent;
	currentNum = '';
	currentOperator = '';
	firstNum = '';
	result = 0;
};

const del = () => {
	console.log('deleting');
	enteredString = enteredString.substring(0, enteredString.length - 1);
	display.textContent = enteredString;
};

const main = () => {
	numberBtns.forEach((element) => {
		element.addEventListener('click', () => inputNumber(element.textContent));
	});
	operatorBtns.forEach((element) => {
		element.addEventListener('click', () =>
			inputOperator((operator = element.textContent))
		);
	});

	clearBtn.addEventListener('click', clear);
	delBtn.addEventListener('click', del);
	enterBtn.addEventListener('click', evaluate);
	decimalBtn.addEventListener('click', inputDecimal);
};

main();
