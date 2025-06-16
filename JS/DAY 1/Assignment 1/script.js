// Assignment 1 Grades Sum Calc
function gradeSum (score) {
    let grade;

    if(score >= 90) {
        grade = "A";
    } else if (score >= 80 && score < 90) {
        grade = "B";
    } else if (score >= 70 && score < 80) {
        grade = "C";
    } else if (score >= 60 && score < 70) {
        grade = "D";
    } else {
        grade = "F";
    }
    return grade;
}

let calcButton = document.querySelector(".calc_btn");

calcButton.addEventListener("click", () => {
    let name = document.getElementById("Name").value;
    let score = parseInt(document.getElementById("scoreInput").value);

    document.getElementById("Welcome").innerText += " " + name;
    document.getElementById("scoreResult").innerText += " " + score;
    document.getElementById("Grade").innerText += " " + gradeSum(score)
});

// Assignment 2 Multiplication Table

let showBtn = document.querySelector(".show_btn");

showBtn.addEventListener("click", () => {
    let num = parseInt(document.getElementById("numberInput").value);
    let textArea = document.querySelector("#mulTable");

    for (let i = 1; i < 13; i++) {
        textArea.value += `${num} x ${i} = ${num*i}\n`;
    }
});


// Assignment 3 Age Checker
function checkDrivingAge(age) {
    let answer;
    if(age >= 18) {
        answer = "You can drive.";
    } else {
        answer = "You are too young to drive.";
    }
    return answer;
}

let checkBtn = document.querySelector(".check_btn");
let msgField = document.getElementById("State");

checkBtn.addEventListener("click" , () => {
    let age = parseInt(document.getElementById("ageInput").value);
    let msg = checkDrivingAge(age);
    msgField.innerText = msg;
});
