const drawScreen = () => {
    screenCurrent.innerText = state.entryStr;
    screenUpper.innerText = state.upperString;
}

const operate = (num1, operator, num2) => {
    let result;
    switch(operator){
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/': result = num1 / num2; break;
    }
    return Math.round(result * 1000) / 1000;
}

const performOperation = (operator) => {
    state.eraseOnNewEntry = false;
    const isEquality = operator === "=";
    const hasEntry = state.entryStr !== "";
    const hasPreviousOperator = state.operator !== "";
    let a = state.num1;
    let result = b = Number(state.entryStr);
    
    if(!hasPreviousOperator && isEquality) 
        return;
    if(hasPreviousOperator && hasEntry)
        result = operate(a, state.operator, b);   
    if(!hasEntry)
        result = a;

    state.num1 = result;
    if(isEquality) {
        state.upperString = `${a} ${state.operator} ${b} =`;
        state.entryStr = result.toString();
        state.operator = "";
        state.eraseOnNewEntry = true;
    }
    else {
        state.upperString = `${result} ${operator}`;
        state.entryStr = "";
        state.operator = operator;
    }
    drawScreen();
}

const clearScreen = () => {
    state.entryStr = "";
    state.num1 = "";
    state.num2 = "";
    state.operator = "";
    state.upperString = "";
    drawScreen();
}

const appendNumber = (symbol) => {
    if(state.eraseOnNewEntry){
        clearScreen();
        state.eraseOnNewEntry = false;
    }
    if(symbol === '.' && state.entryStr.includes('.'))
        return;
    state.entryStr += symbol;
    drawScreen();
}

const eraseLastDigit = () => {
    if(state.eraseOnNewEntry){
        clearScreen();
        state.eraseOnNewEntry = false;
    }    
    state.entryStr = state.entryStr.slice(0, -1);
    drawScreen();
}

const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const screenCurrent = document.querySelector("#screen #current");
const screenUpper = document.querySelector("#screen #previous");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const operations = document.querySelectorAll(".operation");

let state = {
    entryStr: "",
    upperString: "",
    num1: "",
    num2: "",
    operator: "",
    eraseOnNewEntry: false,
};

drawScreen();

numbers.forEach(button => button.addEventListener("click", (e) => appendNumber(e.target.innerText)));

backspace.addEventListener("click", eraseLastDigit);

clear.addEventListener("click", clearScreen);

operations.forEach(button => button.addEventListener("click", (e) => performOperation(e.target.innerText)));