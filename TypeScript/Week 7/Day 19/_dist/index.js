"use strict";
let direction1 = 'up';
let direction2 = 'down';
let direction3 = 'left';
let direction4 = 'right';
function math(a, b, cb) {
    if (cb === '+') {
        return a + b;
    }
    else if (cb === '-') {
        return a - b;
    }
    else if (cb === '*') {
        return a * b;
    }
    else if (cb === '/') {
        return a / b;
    }
    else {
        throw new Error('Invalid operator');
    }
}
const input1 = document.querySelector('#input1');
const input2 = document.querySelector('#input2');
const operator = document.querySelector('#operator');
const btn = document.querySelector('#btn');
const result = document.querySelector('#result');
btn.addEventListener('click', () => {
    const a = Number(input1.value);
    const b = Number(input2.value);
    const cb = operator.value;
    const res = math(a, b, cb);
    result.textContent = res.toString();
});
