class Person {
    name: string;
    age: number;
    
    constructor(name : string , age: number) {
        this.name = name;
        this.age = age;
    }
}

let person1: Person = new Person('Zack',20);
let person2: Person = new Person('River',21);

console.log(person1);
console.log(person2);