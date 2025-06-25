
// Task 2

// class Student {
//     constructor(name , marks , {city} = address) {
//         this.name = name;
//         this.marks = [...marks];
//         this.address = {...address};
//     }
//     showReport({name,marks = [] , address:{city}}) {
//         try {
//             let total = 0;
//             for(mark of marks) {
//                 total += mark;
//             }

//             let avg = total / marks.length;
//             console.log(`Student Report:
//                 Name: ${this.name}
//                 City: ${this.address?.city ?? "Not Available"}
//                 Total Marks: ${total}
//                 Average Marks: ${avg.toFixed(2)}
//                 `);
//         } catch(error) {
//             console.error("Error While Showing Report");
//         } finally {
//             console.log("---------------------------End of Report ----------------------\n");
//         }
//     }
// }

let students = [
    {
        name : "Omar",
        marks : [90,85,95],
        address: 
            {city : "Cairo"}
    },
    {
        name : "Zack",
        marks : [80,75,85],
        address: 
            {city : "Alex"}
    },
    {
        name : "Wael",
        marks : [60,50,75],
        address: 
            {city : "Qal"}
    }
];

function showReport({name , marks = [] , address}){
    try {
        let total = 0;

        for(mark of marks) {
            total += mark;
        }

        let avg = total / marks.length;
        console.log(`Student Report:
            Name: ${name}
            City: ${address?.city ?? "Not Available"}
            Total Marks: ${total}
            Average Marks: ${avg.toFixed(2)}
            `);
    } catch(error) {
        console.error("Error While Showing Report");
    } finally {
        console.log("--------------------------- End of Report ----------------------\n");       
    }
}

for(let student of students) {
    showReport(student);
}