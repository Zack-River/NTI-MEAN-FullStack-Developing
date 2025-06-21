let grades = new Array;
let statusLabel = document.querySelector("#status");

function updateGrades() {
    let textArea = document.querySelector("#Grades");
    textArea.value = "";
    if(grades.length != 0){
        for(grade of grades) {
            textArea.value += `${grade}\n`;
        }
    }
}

let addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
    statusLabel.innerText = "";

    let gradeInput = document.querySelector("#gradesInput");
    let grade = parseInt(gradeInput.value);
    
    if(gradeInput.value === "") {

    } else if(isNaN(grade)) {
        alert("Grade Must Be a Number");
        gradeInput.value = "";
    } else {
        let textArea = document.querySelector("#Grades");
        grades.push(grade);
        updateGrades();
        gradeInput.value = "";
    }
    
});

let updateBtn = document.querySelector("#updateBtn");
updateBtn.addEventListener("click" , () => {
    statusLabel.value = "";

    let studentIdField = document.querySelector("#updatedStudentId");
    let studentId = parseInt(studentIdField.value);
    
    let studentGradeField = document.querySelector("#updatedStudentGrade");
    let studentGrade = parseInt(studentGradeField.value);

    if(studentIdField.value === "" || studentGradeField.value === "") {
        alert("You Must Fill All Fields First!");
    } else if(isNaN(studentId) || isNaN(studentGrade)) {
        alert("Student Grade and ID Must be numbers!");
    } else if(studentId < 1 || studentId > grades.length) {
        alert("Student ID Can't Be Found (Out Of Range)!");
    } else {
        grades[studentId-1] = studentGrade;
        updateGrades();
    }
    studentIdField.value = "";
    studentGradeField.value = "";
});

let searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click" , () => {
    statusLabel.innerText = "";

    let studentIdField = document.querySelector("#studentId");
    let studentId = parseInt(studentIdField.value);

    if(studentIdField.value == "") {
        alert("You Must Enter ID To Search!");
    } else if(isNaN(studentId)) {
        alert("Student ID Must Be a Number!");
    } else if(studentId > grades.length || studentId < 1){
        alert("ID Is Out Of Range!");
    } else {
        statusLabel.innerText = `Student${studentId} Grade: ${grades[studentId-1]}`
    }
    studentIdField.value = "";
});

let includeBtn = document.querySelector("#include");
includeBtn.addEventListener("click" , () => {
    if(grades.length < 1) {
        alert("No Grades!\nEnter Grades First.");
    } else {
        let studentGradeField = document.querySelector("#includeGrade");
        let studentGrade = parseInt(studentGradeField.value);

        if(grades.includes(studentGrade)) {
            statusLabel.textContent = "✅ Found";
        } else {
            statusLabel.textContent = "❌ Not Found";
        }
        studentGradeField.value = "";
    }
});

let lengthBtn = document.querySelector("#length");
lengthBtn.addEventListener("click" , () => {
    statusLabel.innerText = "";

    if(grades.length < 1)
    {
        alert("You Must Enter Grades First");
    } else {
        statusLabel.innerText = `Array Length:${grades.length}`;
    }
});

let shiftBtn = document.querySelector("#shift");
shiftBtn.addEventListener("click" , () => {
    if(grades.length < 1) {
        alert("No Students Already!\nTry To Add Grades First.");
    } else {
        grades.shift();
        updateGrades();
    }
});

let clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
    statusLabel.innerText = "";

    if(grades.length < 1) {
        alert("No Student Already!");
    } else {
        let textArea = document.querySelector("#Grades");

        grades = [];
        updateGrades();
    }
});

console.log(typeof NaN);




