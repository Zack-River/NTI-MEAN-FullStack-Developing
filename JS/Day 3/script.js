// Sync Code.
// console.log("Start");

// function wait3Seconds() {
//     let start = Date.now();
//     while(Date.now() - start < 3000) {

//     }
// };

// wait3Seconds();
// console.log("End");

// ASync Code
console.log("Start");
setTimeout(() => {
    console.log("Middle");
}, 3000);
console.log("End");
console.log("End");
console.log("End");
console.log("End");
console.log("End");

// Promises
let myPromise = new Promise( (resolve,reject) => {
    let done = true;
    setTimeout(() => {
        if(done) {
            resolve("Task Completed");
        } else {
            reject("Task Failed");
        }
    },1000);
});

myPromise
.then((result) => {
    console.log(result);
    result += " - Updated";
    return result
})
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.error(error);
    
})
.finally(() => {
    console.log("Finally Text");
});

// Async && await
async function myFunc(parameter) {
    let message = await Promise.resolve("Welcome!");

}

myFunc();

// OOP Constructor Function
function Person(name , age) {
    this.name = name;
    this.age = age;
    this.greet = function () {
        console.log("Hello " + this.name);
    };
}

let person1 = new Person("Ahmed" , 20);
person1.greet();
console.log(person1);

// Class
class animal {
    constructor(name , gender) {
        this.name = name;
        this.gender = gender;
    }
    say(){
        console.log(`${this.name} is ${this.gender}`);
    }
}

let animal1 = new animal("Cow", "Female");
console.log(animal1);
animal1.say();

function sayHello(name) {
    console.log(name); 
}

function sayHello(name,age) {
    console.log(name,age);
}

sayHello("ahmed");
sayHello("ahmed",20)