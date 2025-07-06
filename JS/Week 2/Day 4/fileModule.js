const fs = require('fs');

// async read function
async function asyncRead() {
    fs.readFile("./public/file1.txt", 'utf8' , (err,data) => {
        if(err) {
            console.error("Error While Reading File: ", err);
            return;
        }
        console.log("Async File Content:\n",data);
        return data;
    });
}

// sync read function
function syncRead  () {
    const data = fs.readFileSync("./public/file1.txt", 'utf8')
    console.log("Sync File Content:\n",data);
    return data;
}

// async write function
// flag : {flag:wx} => write only if not exist (create then write) no overwrite.
async function asyncWrite(data) {
    fs.writeFile("./public/file2.txt" , data , {flag: 'wx'} ,(err) => {
        if(err) {
            console.error("Sorry File Already exists and has Data!" );
            return;
        }
        console.log("File written successfully.");
    });
}

// append file function 
async function append(data) {
    fs.appendFile("./public/file2.txt" , data+"\n" , "utf8" , (err) => {
        if(err) {
            console.error("Error while appending file: ", err);
            return;
        }
        console.log("File Updated Successfully.");
    });
}

asyncWrite(syncRead());
append(syncRead());
syncRead();