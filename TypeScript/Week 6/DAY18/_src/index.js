"use strict";
// Task 1 – Primitive Types with Union
//Create a variable userId that can be either a number or a string.
let userId = 5;
let isLoggedIn = false;
//Write a function printId that accepts userId.
function printId(id) {
    if (typeof id === 'number') {
        console.log(`ID is number: ${id}`);
    }
    else if (typeof id === 'string') {
        console.log(`ID is string: ${id}`);
    }
}
// Task 2 – Complex Types (Arrays, Tuples, Nested Objects)
//Create an array of usernames (string array).
let usernames = ['Zack', 'River', 'NTI'];
//Create a tuple httpResponse.
let httpResponse = [200, 'OK'];
//Create an array of objects products.
let products = [
    { id: 1, name: 'Product 1', price: 100, tags: ['tag1', 'tag2'] },
    { id: 2, name: 'Product 2', price: 200, tags: ['tag1', 'tag2'] },
    { id: 3, name: 'Product 3', price: 300, tags: ['tag1', 'tag2'] }
];
let here = [10, 20];
let user1 = {
    id: 1,
    name: 'Zack',
    location: [10, 20],
    email: 'zack@gmail.com'
};
//Create a function printUser that accepts a User and prints its data.
function printUser(user) {
    var _a;
    console.log(`ID: ${user.id}, Name: ${user.name}, Location: ${user.location}, Email: ${(_a = user.email) !== null && _a !== void 0 ? _a : 'Not provided'}`);
}
//Implement two functions using MathOp:
let add = (a, b) => a + b;
let multiply = (a, b) => a * b;
/* 3. Create a function `operate` that takes:
    - Two numbers
    - A `MathOp` function
        
        And returns the result of applying the function.
*/
function operate(a, b, op) {
    return op(a, b);
}
;
console.log(operate(10, 20, add));
console.log(operate(10, 20, multiply));
// Task 5 – Combine & Work with Data
//Create an array of User objects (from Task 3).
let users = [
    { id: 1, name: 'Zack', location: [10, 20], email: 'zack@gmail.com' },
    { id: 2, name: 'River', location: [30, 40], email: 'river@gmail.com' },
    { id: 3, name: 'NTI', location: [50, 60] }
];
//Write a function findUserById that accepts a user id (number or string) and the array, and returns the matching user.
function findUserById(id, users) {
    return users.find(user => user.id === id);
}
//Write another function updateUserLocation that accepts a user id and new coordinates, and updates the user’s location.
let updateUserLocation = (id, newLocation, users) => {
    let user = findUserById(id, users);
    if (user) {
        user.location = newLocation;
    }
};
