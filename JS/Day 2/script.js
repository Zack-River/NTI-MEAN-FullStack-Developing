let resultBox = document.querySelector("#resultBox");

// 📝 Exercise: Star Grid with Even Number Rows
let gridBtn = document.getElementById("StarGrid");
gridBtn.addEventListener("click", () => {
    resultBox.value = "";
    let num = parseInt(prompt("Enter Num"));

    for (let i = 1; i <= num; i++) {
        if (i % 2 !== 0) {
            for (let j = 1; j <= num; j++) {
                resultBox.value += "* ";
            }
        } else {
            for (let j = 1; j <= num; j++) {
                resultBox.value += `${j} `;
            }
        }
        resultBox.value += "\n";
    }
});

//🧪 Exercise: Recursive Countdown
let RCBtn = document.getElementById("RecursiveCD");
RCBtn.addEventListener("click" , ()=> {
    resultBox.value = "";
    let num = parseInt(prompt("Enter Num"));
    RecursivePrint(num);
});

function RecursivePrint(num) {
    if(num == 0) {
        resultBox.value += `Done!`;
        return;
    }
    resultBox.value += `${num}\n`;
    RecursivePrint(--num);
}