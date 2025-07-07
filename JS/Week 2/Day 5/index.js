const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port =  3000;

app.use(express.json());

app.get('/' , (req ,res) => {
    const data = req.body;
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Body: ${JSON.stringify(data)}`);
    res.writeHead(200,{"content-type": "application/json"});
    res.end(JSON.stringify({ name: 'Layla', age: 25 }));
});

app.use((req , res) => {
    fs.readFile(path.join(__dirname, "/public/index.html") , 'utf8' , (err,data) => {
        if(err) {
            console.log("Error While Loading Page");
            return;
        }
        res.writeHead(404, {"content-type": "text/html"});
        res.end(data);
    });
});

app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
})