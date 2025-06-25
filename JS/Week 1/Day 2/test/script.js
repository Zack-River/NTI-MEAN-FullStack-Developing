function outer() {
    let secret = "Value already Saved!";

    function inner() {
        console.log(secret);
    }

    return inner;
}

const keepSecret = outer();
keepSecret();

function thisWord (name , age) {
    this.name = name;
    this.age = age;
    console.log(this.name,this.age);
}
thisWord("Zack",21);

let colors = ["red", "green", "yellow", "blue"];
let part = colors.slice(0, 2);
console.log(...part);

