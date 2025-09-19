const buttons = document.querySelectorAll("button");
const numbers = document.querySelectorAll(".number");
const screenCurrent = document.querySelector("#screen #current");
const screenPrev = document.querySelector("#screen #previous");
const backspace = document.querySelector("#backspace");
const clear = document.querySelector("#clear");
const equality = document.querySelector("#equality");
const operations = document.querySelectorAll(".operation");

let operator = "";
let prevNumber = 0;
let currentNumber = 0;

const calculate = function() {
    let result = "ERROR";
    if(operator === "+")
        result = prevNumber + currentNumber;
    if(operator === "-")
        result = prevNumber - currentNumber;
    if(operator === "/")
        result = prevNumber / currentNumber;
    if(operator === "*")
        result = prevNumber * currentNumber;
    screenCurrent.textContent = result;
}

numbers.forEach(button => button.addEventListener("click", (e) => {
    if(screenCurrent.innerText === "0")
        screenCurrent.innerText = e.target.innerText;
    else 
        screenCurrent.innerText += e.target.innerText;
}));

backspace.addEventListener("click", () => {
    screenCurrent.innerText = screenCurrent.innerText.slice(0, -1);
    if(screenCurrent.innerText === "")
        screenCurrent.innerText = "0";
});

clear.addEventListener("click", () => {
    screenCurrent.innerText = "0";
});

operations.forEach(button => button.addEventListener("click", (e) => {
    operator = e.target.textContent;
    prevNumber = screenCurrent.textContent;
    screenPrev.innerText = `${prevNumber} ${operator}`;
}));

equality.addEventListener("click", () => {
    screenPrev.innerText += ` ${screenCurrent.innerText} =`;
    currentNumber = screenCurrent.textContent;
    calculate();
});