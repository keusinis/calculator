const drawScreen = () => {
    screenCurrent.innerText = state.numberOnEntry;
    screenUpper.innerText = state.upperString;
    console.table(state);
}

const operate = () => {
    let answer = 0;
    switch(state.operator){
        case '+':
            answer = state.num1 + state.num2;
            break;
        case '-':
            answer = state.num1 - state.num2;
            break;
        case '*':
            answer = state.num1 * state.num2;
            break;
        case '/':
            answer = state.num1 / state.num2;
            break;
    }
    return Math.round(answer * 1000) / 1000;
}

const evaluate = () => {
    if(state.operator === "" || state.numberOnEntry === "")
        return;
    state.num2 = parseFloat(state.numberOnEntry);
    state.result = operate();

    state.numberOnEntry = state.result.toString();
    state.upperString = `${state.num1} ${state.operator} ${state.num2} =`
    state.operator = "";
    drawScreen();
}

const setOperator = (operator) => {
    // Operator switching
    if(state.numberOnEntry === "") {
        if(state.num1 === "")
            return;
        state.operator = operator;
        state.upperString = `${state.num1} ${state.operator}`
        drawScreen();
        return;
    }
    // Calculating with past operator
    if(state.operator !== "") {
        state.num2 = parseFloat(state.numberOnEntry);
        state.result = operate();
        state.operator = operator;
        state.upperString = `${state.result} ${state.operator}`
        state.numberOnEntry = "";
        drawScreen();
        state.num1 = state.result;
        return;
    }
    state.operator = operator;
    state.num1 = parseFloat(state.numberOnEntry);
    state.numberOnEntry = "";
    state.upperString = `${state.num1} ${state.operator}`;
    drawScreen();
}

const clearScreen = () => {
    state.numberOnEntry = "";
    state.num1 = "";
    state.num2 = "";
    state.operator = "";
    state.upperString = "";
    drawScreen();
}

const appendNumber = (e) => {
    if(e.target.id === "dot" && state.numberOnEntry.includes('.'))
        return;
    state.numberOnEntry += e.target.innerText;
    drawScreen();
}

const eraseLastDigit = () => {
    state.numberOnEntry = state.numberOnEntry.slice(0, -1);
    drawScreen();
}

const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const screenCurrent = document.querySelector("#screen #current");
const screenUpper = document.querySelector("#screen #previous");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const equality = document.querySelector("#equality");
const operations = document.querySelectorAll(".operation");

let state = {
    numberOnEntry: "",
    upperString: "",
    num1: "",
    num2: "",
    result: 0,
    operator: "",
};

numbers.forEach(button => button.addEventListener("click", (e) => appendNumber(e)));

backspace.addEventListener("click", eraseLastDigit);

clear.addEventListener("click", clearScreen);

operations.forEach(button => button.addEventListener("click", (e) => setOperator(e.target.innerText)));

equality.addEventListener("click", evaluate);