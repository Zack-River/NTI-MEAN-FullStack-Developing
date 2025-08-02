// Task 1 – Primitive Types with Union
//Create a variable userId that can be either a number or a string.
let userId : number | string = 5; 
let isLoggedIn : boolean = false;

//Create a variable isLoggedIn that must be a boolean.
interface printId { (id : number ) : void; }
interface printId { (id : string ) : void; }
interface printId { (id : number | string) : void; }

//Write a function printId that accepts userId.
function printId (id : number | string) : void {
  if (typeof id === 'number'){
    console.log(`ID is number: ${id}`);
  } else if (typeof id === 'string'){
    console.log(`ID is string: ${id}`);
  }
}

// Task 2 – Complex Types (Arrays, Tuples, Nested Objects)
//Create an array of usernames (string array).
let usernames : string[] = ['Zack', 'River', 'NTI'];

//Create a tuple httpResponse.
let httpResponse : [number, string] = [200, 'OK'];

//Create an array of objects products.
let products : {id : number, name : string, price : number, tags : string[]}[] = [
  {id : 1, name : 'Product 1', price : 100, tags : ['tag1', 'tag2']},
  {id : 2, name : 'Product 2', price : 200, tags : ['tag1', 'tag2']},
  {id : 3, name : 'Product 3', price : 300, tags : ['tag1', 'tag2']}
];

// Task 3 – User-Defined Types (Interface & Type Alias)
// Create a type alias Coordinates
type coordinates = [number, number];
let here : coordinates = [10, 20];

//Create an interface User with:
interface User {
  id : number;
  name : string;
  location : coordinates;
  email? : string;
}

let user1 : User = {
  id : 1,
  name : 'Zack',
  location : [10, 20],
  email : 'zack@gmail.com'
}

//Create a function printUser that accepts a User and prints its data.
function printUser (user : User) : void {
  console.log(`ID: ${user.id}, Name: ${user.name}, Location: ${user.location}, Email: ${user.email ?? 'Not provided'}`);
}

// Task 4 – Function Types
//Create a function type alias MathOp that represents a function taking two numbers and returning a number.
type MathOp = (a : number, b : number) => number;

//Implement two functions using MathOp:
let add : MathOp = (a, b) => a + b;
let multiply : MathOp = (a, b) => a * b;

/* 3. Create a function `operate` that takes:
    - Two numbers
    - A `MathOp` function
        
        And returns the result of applying the function.
*/
function operate (a : number, b : number, op : MathOp) : number {
  return op(a, b);
};

console.log(operate(10, 20, add));
console.log(operate(10, 20, multiply));

// Task 5 – Combine & Work with Data
//Create an array of User objects (from Task 3).
let users : User[] = [
  {id : 1, name : 'Zack', location : [10, 20], email : 'zack@gmail.com'},
  {id : 2, name : 'River', location : [30, 40], email : 'river@gmail.com'},
  {id : 3, name : 'NTI', location : [50, 60]}
];

//Write a function findUserById that accepts a user id (number or string) and the array, and returns the matching user.
function findUserById (id : number | string, users : User[]) : User | undefined {
  return users.find(user => user.id === id);
}

//Write another function updateUserLocation that accepts a user id and new coordinates, and updates the user’s location.
let updateUserLocation = (id : number | string, newLocation : coordinates, users : User[]) : void => {
  let user = findUserById(id, users);
  if (user){
    user.location = newLocation;
  }
}
