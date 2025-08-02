type direction = 'up' | 'down' | 'left' | 'right';

let direction1: direction = 'up';
let direction2: direction = 'down';
let direction3: direction = 'left';
let direction4: direction = 'right';

// make a function that can add,subtract,multiply,divide
type operator = '+' | '-' | '*' | '/';
type mathOp = (a:number , b:number , cb:operator) => number;

function math(a:number , b:number , cb:operator){
    if(cb === '+'){
        return a + b;
    } else if(cb === '-'){
        return a - b;
    } else if(cb === '*'){
        return a * b;
    } else if(cb === '/'){
        return a / b;
    } else {
        throw new Error('Invalid operator');
    }
}

const input1 = document.querySelector('#input1') as HTMLInputElement;
const input2 = document.querySelector('#input2') as HTMLInputElement;
const operator = document.querySelector('#operator') as HTMLSelectElement;
const btn = document.querySelector('#btn') as HTMLButtonElement;
const result = document.querySelector('#result') as HTMLParagraphElement;   

btn.addEventListener('click',() => {
    const a = Number(input1.value);
    const b = Number(input2.value);
    const cb = operator.value as operator;
    const res = math(a,b,cb);
    result.textContent = res.toString();
});