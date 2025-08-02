"use strict";
// 1. Type Assertion
/*
### Task 1

You are given a variable of type `unknown`.

- Assume it is a string and print its length using **type assertion**.
- Do not use any `if` checks or type guards.
*/
let data = "TypeScript";
console.log(data.length);
// 2. Classes & Classes with Interfaces
/*
### Task 2

Create a `Car` class with:

- A `brand` (string) and `year` (number) property.
- A method `printInfo()` that logs `"brand - year"`.

Then create an instance and call the method.
*/
class Car {
    constructor(brand, year) {
        this.brand = brand;
        this.year = year;
    }
    printInfo() {
        console.log(`${this.brand} - ${this.year}`);
    }
}
let car1 = new Car("Toyota", 2020);
car1.printInfo();
class Truck {
    constructor(model) {
        this.model = model;
    }
    drive() {
        console.log("Driving...");
    }
}
let truck1 = new Truck("SomeThing!");
truck1.drive();
// 3. Type Narrowing
/*
### Task 4

Write a function `printId` that accepts a parameter of type `string | number`.

- If it is a number, log `"ID is number: <id>"`.
- If it is a string, log `"ID is string: <id>"`.
- Use **type narrowing** (`typeof`) to differentiate.
*/
function printId(id) {
    if (typeof id === "number") {
        console.log(`ID is number: ${id}`);
    }
    else {
        console.log(`ID is string: ${id}`);
    }
}
function printRole(user) {
    if ("isAdmin" in user) {
        console.log(`Admin ${user.username} has permissions: ${user.permissions}`);
    }
    else if ("canEdit" in user) {
        if (user.sections.length === 0) {
            console.log(`Editor ${user.username} has no sections assigned`);
        }
        else {
            console.log(`Editor ${user.username} can edit sections: ${user.sections}`);
        }
    }
    else {
        console.log(`Viewer ${user.username}`);
    }
}
// 4. Basic Simple Generics
/*
### Task 6
Create a function wrapInArray that:
Takes a value of any type (generic).
Returns an array containing that value.
const result = wrapInArray(5); // [5]
*/
function wrapInArray(value) {
    return [value];
}
const resultArray = wrapInArray(5);
console.log(resultArray);
// -------------------Bonus------------------------- //
// 1. Type Assertion
/*
### Task 1
You are building a function that processes a configuration object coming from a third-party library as unknown.
Assert that it is an object with a settings property of type { theme: string; version: number }.
Print the theme property directly (no if or type guards).
function processConfig(config: unknown) {
  // Your code here
}
processConfig({ settings: { theme: "dark", version: 2 } });
*/
function processConfig(config) {
    const settings = config;
    console.log(settings.theme);
}
/*
### Task 2
You are given a DOM element (type Element | null).
Use type assertion to treat it as an HTMLInputElement.
Set its value to "Hello" without using if or null checks.
const input = document.querySelector("#username");
// Your code here
*/
const input = document.querySelector("#username");
input.value = "Hello";
class UserBonus {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toJSON() {
        return JSON.stringify({ id: this.id, name: this.name });
    }
}
let userArray = [
    new UserBonus(1, "Zack"),
    new UserBonus(2, "River"),
    new UserBonus(3, "NTI"),
];
let jsonArray = userArray.map((user) => user.toJSON());
console.log(jsonArray);
class ConsoleLogger {
    log(message) {
        console.log(message);
    }
}
class PrefixedLogger {
    log(message) {
        console.log(`[LOG] ${message}`);
    }
}
function runLogger(logger) {
    logger.log("Hello!");
}
let cl = new ConsoleLogger();
let pl = new PrefixedLogger();
runLogger(cl);
runLogger(pl);
function calculateArea(shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
    else {
        return shape.width * shape.height;
    }
}
function printInfo(user) {
    if ("isAdmin" in user) {
        console.log(`Admin: ${user.username}`);
    }
    else {
        console.log(`Guest: ${user.username} - ID ${user.guestId}`);
    }
}
let admin = { username: "Zack", isAdmin: true };
let guest = { username: "River", guestId: 123 };
printInfo(admin);
printInfo(guest);
// 4. Generic Functions (only functions)
/*
Task 7
Create a generic function mergeObjects<T, U>(obj1: T, obj2: U) that:
Combines the two objects into one object.
Returns the merged result with all properties from both.
Example:
const merged = mergeObjects({ name: "Ali" }, { age: 30 });

  merged = {
    name: "Ali",
    age: 30
  }
*/
function mergeObjects(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
const merged = mergeObjects({ name: "Ali" }, { age: 30 });
console.log(merged);
