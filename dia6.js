const visor = document.getElementById('visor');

// visor.focus();

let math = "";
let num1 = 0;
let num2 = 0;
let final = 0;
let opTest = true;

visor.addEventListener('input', visorMask)

function visorMask() {
    if (visor.value.indexOf(",") == -1) {
        visor.value = visor.value
        .replace(/\D/g, "")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2")
        .replace(/(\d+)(\d{3})/, "$1.$2");
    }

    // Max length
    if (visor.value.length > 28) {
        visor.value = visor.value.slice(0, 28);
    }
}

function addNumber(number) {
    if (number != 0 || visor.value != 0){
        visor.value = visor.value + number.toString();
        visorMask();
        opTest = true
        visor.focus();
    }
}

function addDecimal() {
    let commaTrue = visor.value.indexOf(",")
    if (visor.value != "" && commaTrue < 0 ) {
        visor.value = visor.value + ",";
    } else if (commaTrue > -1 ) {
        visor.value = visor.value;
    } else {
        visor.value = "0,"
    }
    visor.focus();
}

function count(operator) {
    math = operator;
    if (opTest) {
        visor.placeholder = visor.value;
        num1 = parseFloat(visor.value.replaceAll(".","").replaceAll(",","."));
        visor.value = "";
    } else if (visor.value != "") {
        calculate();
        visor.placeholder = visor.value;
        num1 = parseFloat(visor.value.replaceAll(".","").replaceAll(",","."));
        visor.value = "";
    }
    opTest = false;
}

function calculate() {
    if ( math != ""){
        num2 = parseFloat(visor.value.replaceAll(".","").replaceAll(",","."));

        switch (math) {
            case '+':
                final = num1 + num2;
                break;
            case '-':
                final = num1 - num2;
                break;
            case '*':
                final = num1 * num2;
                break;
            case '/':
                final = num1 / num2;
                break;
        }

        visor.value = final.toString().replace(".",",");
    }

    visor.placeholder = 0;
    num1 = num2;
    num2 = 0

    opTest = true;
    visorMask();
}

function clearData() {
    visor.value = "";
    visor.placeholder = 0;
    visor.focus();
}

function backspace() {
    if (visor.value != "0,"){
        visor.value = visor.value.slice(0, visor.value.length-1);
    } else {
        visor.value = "";
    }
    visor.focus();
}

// Listen to keyboard
const operators = ['+', '-', '*','/'];

document.addEventListener('keypress', (event) => {
    event.preventDefault();
    
    if (isNaN(event.key) == false) {
        addNumber(event.key);
    } else if (operators.indexOf(event.key) >-1){
        count(event.key);
    } else if (event.key == "Enter") {
        calculate();
    } else if (event.key == ",") {
        addDecimal();
    }

});