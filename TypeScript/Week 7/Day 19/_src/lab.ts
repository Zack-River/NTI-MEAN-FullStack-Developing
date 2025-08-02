// 1. Type Assertion
/*
### Task 1

You are given a variable of type `unknown`.

- Assume it is a string and print its length using **type assertion**.
- Do not use any `if` checks or type guards.
*/

let data: unknown = "TypeScript";
console.log((data as string).length);

// 2. Classes & Classes with Interfaces

/*
### Task 2

Create a `Car` class with:

- A `brand` (string) and `year` (number) property.
- A method `printInfo()` that logs `"brand - year"`.

Then create an instance and call the method.
*/

class Car {
    brand: string;
    year: number;
    constructor(brand: string, year: number) {
        this.brand = brand;
        this.year = year;
    }
    printInfo() {
        console.log(`${this.brand} - ${this.year}`);
    }
}

let car1 = new Car("Toyota", 2020);
car1.printInfo();

/*
### Task 3

Create an interface `Drivable` with:

- A method `drive()` that logs `"Driving..."`.

Make a `Truck` class that implements `Drivable` and has:

- `model` property (string).
- Implements the `drive()` method.

Create a `Truck` instance and call `drive()`.
*/

interface Drivable {
    drive(): void;
}

class Truck implements Drivable {
    model: string;
    constructor(model: string) {
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

function printId(id: string | number) {
    if (typeof id === "number") {
        console.log(`ID is number: ${id}`);
    } else {
        console.log(`ID is string: ${id}`);
    }
}

/*
### Task 5
You now have three types:

```tsx
type Admin = { username: string; isAdmin: boolean; permissions: string[] };
type Editor = { username: string; canEdit: boolean; sections: string[] };
type Viewer = { username: string };
```

Write a function `printRole(user: Admin | Editor | Viewer)` that:

1. Uses the **`in` operator** to check if the user is an Admin, Editor, or Viewer.
2. Logs:
    - `"Admin <username> has permissions: <permissions>"`
    - `"Editor <username> can edit sections: <sections>"`
    - `"Viewer <username>"`
3. If the user is `Editor`, also check if `sections` array is empty:
    - If empty, log `"Editor <username> has no sections assigned"` instead.
*/

type Admin = { username: string; isAdmin: boolean; permissions: string[] };
type Editor = { username: string; canEdit: boolean; sections: string[] };
type Viewer = { username: string };

function printRole(user: Admin | Editor | Viewer) {
    if ("isAdmin" in user) {
        console.log(`Admin ${user.username} has permissions: ${user.permissions}`);
    } else if ("canEdit" in user) {
        if (user.sections.length === 0) {
            console.log(`Editor ${user.username} has no sections assigned`);
        } else {
            console.log(`Editor ${user.username} can edit sections: ${user.sections}`);
        }
    } else {
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

function wrapInArray<T>(value: T): T[] {
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

function processConfig(config: unknown) {
    const settings = config as { theme: string; version: number };
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

const input = document.querySelector("#username") as HTMLInputElement;
input.value = "Hello";

// 2. Classes & Classes with Interfaces
/*
### **Task 3**

Create an interface `Serializable` with a method `toJSON(): string`.

Then create a class `User` with:

- Properties `id: number` and `name: string`.
- Implements `Serializable` by returning a JSON string of itself.

Finally, create an array of `User` objects and map them into JSON strings using the `toJSON()` method.
*/

interface Serializable {
    toJSON(): string;
}

class UserBonus implements Serializable {
    id: number;
    name: string;
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    toJSON() {
        return JSON.stringify({ id: this.id, name: this.name });
    }
}

let userArray: UserBonus[] = [
    new UserBonus(1, "Zack"),
    new UserBonus(2, "River"),
    new UserBonus(3, "NTI"),
];

let jsonArray = userArray.map((user) => user.toJSON());
console.log(jsonArray);

/*
### **Task 4**

Create an interface `Logger` with a method `log(message: string): void`.

Then create two classes:

1. `ConsoleLogger` that logs to the console.
2. `PrefixedLogger` that adds a prefix `[LOG]` before logging.

Write a function `runLogger(logger: Logger)` that uses the logger. Pass both classes to the function and see different outputs.
*/

interface Logger {
    log(message: string): void;
}

class ConsoleLogger implements Logger {
    log(message: string) {
        console.log(message);
    }
}

class PrefixedLogger implements Logger {
    log(message: string) {
        console.log(`[LOG] ${message}`);
    }
}

function runLogger(logger: Logger) {
    logger.log("Hello!");
}

let cl = new ConsoleLogger();
let pl = new PrefixedLogger();
runLogger(cl);
runLogger(pl);


// 3. Type Narrowing
/*
### **Task 5**

You have these two types:

```tsx
type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };
```

Write a function `calculateArea(shape: Circle | Rectangle)` that:

- Uses **discriminated unions** (`kind` property) to narrow the type.
- Returns the correct area.
*/

type Circle = { kind: "circle"; radius: number };
type Rectangle = { kind: "rectangle"; width: number; height: number };

function calculateArea(shape: Circle | Rectangle) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    } else {
        return shape.width * shape.height;
    }
}

/*
### **Task 6**

You are working with this union:

```tsx
type Admin = { username: string; isAdmin: boolean };
type Guest = { username: string; guestId: number };
```

Write a function `printInfo(user: Admin | Guest)` that:

- Uses the **`in` operator** to narrow the type.
- Logs `"Admin: <username>"` or `"Guest: <username> - ID <guestId>"`.
*/

type AdminFromTask6 = { username: string; isAdmin: boolean };
type GuestFromTask6 = { username: string; guestId: number };

function printInfo(user: AdminFromTask6 | GuestFromTask6) {
    if ("isAdmin" in user) {
        console.log(`Admin: ${user.username}`);
    } else {
        console.log(`Guest: ${user.username} - ID ${user.guestId}`);
    }
}

let admin: AdminFromTask6 = { username: "Zack", isAdmin: true };
let guest: GuestFromTask6 = { username: "River", guestId: 123 };
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

function mergeObjects<T, U>(obj1: T, obj2: U) {
    return { ...obj1, ...obj2 };
}

const merged = mergeObjects({ name: "Ali" }, { age: 30 });
console.log(merged);