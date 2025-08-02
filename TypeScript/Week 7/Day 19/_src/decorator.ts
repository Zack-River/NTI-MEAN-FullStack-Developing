function logClassDefined(constructor: Function) {
    console.log(`Class ${constructor.name} class is defined!`);
}

@logClassDefined
class User {
    constructor(public fullname : string) {
        console.log(`User ${this.fullname} is created!`);
    }
}

let user1: User = new User('Zack River');
