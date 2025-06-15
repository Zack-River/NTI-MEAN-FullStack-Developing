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
