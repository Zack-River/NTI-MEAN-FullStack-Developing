class User {
    constructor(name , city) {
        this.name = name;
        this.city = city;
    }

    greet() {
        console.log(`Hello. my name is ${this.name} from ${this.city}`);
    }
}

class Student extends User {
    constructor(name , city , grade) {
        super(name , city);
        this.grade = grade;
    }

    async loadStudentData() {
        let message = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Data Loaded For ${this.name}
                    (Grade: ${this.grade})
                (City: ${this.city})`);
            },1000)
        });
        console.log(message);
    }
}

let student1 = new Student("Zack River" , "Qalubiyah" , 99);

student1.greet();
student1.loadStudentData();