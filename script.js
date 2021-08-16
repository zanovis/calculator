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
let evaluated = false;
let isDecimal = false;

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

// 1. START FRESH IF ENTERING NUM AFTER CLICKING ENTER          - done
// 2. PREVENT MULTIPLE OPERATORS BEING ENTERED CONSECUTIVELY    - done
// 3. ROUND FLOATS                                              - done
// 4. ADD MESSAGE ABOUT DIV BY ZERO                             - done
// 5. BACKSPACE BUTTON                                          - done
// 6. ADD KEYBOARD CAPABILITY                                   - done

const inputNumber = (number) => {
	if (evaluated) clear();
	console.log('inputting number');
	display.style.animation = 'none';
	if (firstNum) {
		currentNum = currentNum + number;
		display.textContent = enteredString;
	} else {
		currentNum = currentNum + number;
		display.textContent = enteredString + number;
	}
	currentOperator = false;
	enteredString = enteredString + number;
	display.textContent = enteredString;

	console.log(`firstNum is ${firstNum}`);
	console.log(`currentNum is ${currentNum}`);
	console.log(`result is ${result}`);
	console.log(`entered str is ${enteredString}`);
	evaluated = false;
};

const inputOperator = (operator) => {
	if (enteredString == '' || currentOperator == true) return;
	currentOperator = true;
	if (firstNum) {
		evaluate();
	} else {
		firstNum = currentNum;
		currentNum = '';
		enteredString = enteredString + operator;
		result = firstNum;
		evaluated = false;
	}
	currentNum = '';
	display.textContent = enteredString;
};

const evaluate = () => {
	if (currentOperator && !firstNum) return;
	console.log('evaluating');
	operate(operator, parseFloat(firstNum), parseFloat(currentNum));
	display.textContent = result;
	enteredString = result;
	evaluated = true;
	firstNum = '';
	currentNum = display.textContent;
	operator = '';
};

const operate = (operator, a, b) => {
	console.log('operating');
	console.log(`a and b: ${a} and ${b}`);
	if (firstNum) {
		if (operator == '+') {
			result = add(a, b);
		} else if (operator == '-') {
			result = subtract(a, b);
		} else if (operator == 'x') {
			result = multiply(a, b);
		} else if (operator == '/') {
			if (b == 0) {
				alert("This is why we can't have nice things...");
			}
			result = divide(a, b);
		}
	} else {
		currentNum = number;
		result = number;
	}
	result = Math.round(result * 100) / 100;
	return result;
};

const inputDecimal = () => {
	if (!currentNum || isDecimal) return;
	isDecimal = true;
	console.log('test');
	currentNum = currentNum + decimal.textContent;
	enteredString = currentNum;
	display.textContent = currentNum;
};

const clear = () => {
	console.log('clearing');
	display.style.animation = '';
	display.textContent = originalDisplay;
	firstNum = '';
	currentNum = '';
	enteredString = '';
	currentOperator;
	result = 0;
	operator = '';
	evaluated = false;
	isDecimal = false;
};

const del = () => {
	console.log('deleting');
	enteredString = enteredString.toString();
	enteredString = enteredString.substring(0, enteredString.length - 1);
	currentNum = enteredString;
	firstNum = '';
	result = currentNum;
	display.textContent = enteredString;

	console.log(`firstNum is ${firstNum}`);
	console.log(`currentNum is ${currentNum}`);
	console.log(`result is ${result}`);
	console.log(`entered str is ${enteredString}`);
};

const kbEntry = (e) => {
	if (e.key >= 0 && e.key <= 9) inputNumber(e.key);
	if (e.key === '.') inputDecimal();
	if (e.key === '=' || e.key === 'Enter') evaluate();
	if (e.key === 'Backspace') del();
	if (e.key === 'Escape') clear();
	if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
		inputOperator((operator = e.key));
	}
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
	window.addEventListener('keyup', kbEntry);
};

main();
