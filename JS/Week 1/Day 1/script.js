let distance = 15;

if(distance === 5) {
    console.log("Use a bicycle.");
} else if(distance >= 6 && distance <= 20) {
    console.log("take a motor bike.");
} else if(distance >= 21 && distance < 100) {
    console.log("Use a car.");
} else {
    console.log("Take a plane.");
    
}

console.log(
  distance === 5
    ? "Use a bicycle."
    : distance >= 6 && distance <= 20
    ? "take a motor bike."
    : distance >= 21 && distance < 100
    ? "Use a car."
    : "Take a plane."
);

const testValue = 50;

function testSwitch() {
    console.time("Switch");
    switch (testValue) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 10:
            break;
        case 20:
            break;
        case 30:
            break;
        case 40:
            break;
        case 50:
            break;
    }
    console.timeEnd("Switch");
}

function testIfElse() {
    console.time("If-Else");
    if (testValue === 1) {
    } else if (testValue === 2) {
    } else if (testValue === 3) {
    } else if (testValue === 4) {
    } else if (testValue === 5) {
    } else if (testValue === 10) {
    } else if (testValue === 20) {
    } else if (testValue === 30) {
    } else if (testValue === 40) {
    } else if (testValue === 50) {
    }
    console.timeEnd("If-Else");
}

// Run both
testSwitch();
testIfElse();

let grade = 78;

function passResult(grade) {
    if (grade >= 90) {
        return "Excellent";
    } else if (grade >= 80) {
        return "Very Good";
    } else if (grade >= 70) {
        return "Good";
    } else if (grade >= 60) {
        return "Pass";
    } else {
        return "Fail";
    }
}

let print = (grade) => {
    if (grade >= 60) {
        for (let i = 0; i < 3; i++) {
            console.log(passResult(grade));
        }
    } else {
        for (let i = 0; i < 5; i++) {
            console.log(passResult(grade));
        }
    }
};

let bye = () => {
    console.log("Thank You❤️");
}

print(grade);
bye();
