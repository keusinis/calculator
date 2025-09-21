const drawScreen = function() {
    screenCurrent.innerText = state.numberOnEntry;

    screenUpper.innerText = state.upperString;
    console.table(state);
}

const calculate = function() {
    const operator = state.operator;
    const num1 = state.num1;
    const num2 = state.num2;
    let result = 0;

    if (operator === '+')
        result = num1 + num2;
    else if (state.operator === '-')
        result = num1 - num2;
    else if (state.operator === '*')
        result = num1 * num2;
    else if (state.operator === '/')
        result = num1 / num2;
    state.result = result;
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
    num1: 0,
    num2: 0,
    result: 0,
    operator: "",
};

drawScreen();
numbers.forEach(button => button.addEventListener("click", (e) => {
    if(e.target.id === "dot" && state.numberOnEntry.includes('.'))
        return;
    state.numberOnEntry += e.target.innerText;
    drawScreen();
}));

backspace.addEventListener("click", () => {
    state.numberOnEntry = state.numberOnEntry.slice(0, -1);
    drawScreen();
});

clear.addEventListener("click", () => {
    state.numberOnEntry = "";
    state.num1 = 0;
    state.num2 = 0;
    state.operator = "";
    state.upperString = "";
    drawScreen();
});

operations.forEach(button => button.addEventListener("click", (e) => {
    if(state.operator !== "") {
        state.num2 = parseFloat(state.numberOnEntry) 
        ? parseFloat(state.numberOnEntry)
        : 0;
        calculate();
        state.operator = e.target.innerText;
        state.upperString = `${state.result} ${state.operator}`
        state.numberOnEntry = "";
        drawScreen();
        state.num1 = state.result;
        return;
    }
    state.operator = e.target.innerText;
    state.num1 = parseFloat(state.numberOnEntry) 
    ? parseFloat(state.numberOnEntry)
    : 0;
    
    state.numberOnEntry = "";
    state.upperString = `${state.num1} ${state.operator}`;
    drawScreen();
}));

equality.addEventListener("click", () => {
    if(state.operator === "")
        return;
    state.num2 = parseFloat(state.numberOnEntry) 
    ? parseFloat(state.numberOnEntry)
    : 0;
    calculate();
    state.numberOnEntry = state.result.toString();
    state.upperString = `${state.num1} ${state.operator} ${state.num2} = ${state.numberOnEntry}`
    state.operator = "";
    drawScreen();
});