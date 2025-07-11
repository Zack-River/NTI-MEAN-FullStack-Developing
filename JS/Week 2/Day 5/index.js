const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port =  3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Custom MiddleWare
app.use((req,res,next) => {
    console.log(req.method , req.url);
    next();
});

// app.get('/' , (req ,res) => {
//     const data = req.body;
//     console.log(`Request Method: ${req.method}`);
//     console.log(`Request URL: ${req.url}`);
//     console.log(`Request Body: ${JSON.stringify(data)}`);
//     res.writeHead(200,{"content-type": "application/json"});
//     res.end(JSON.stringify({ name: 'Layla', age: 25 }));
// });

// Request Query

const users = [
  { id: 1, name: 'Amina' },
  { id: 2, name: 'Ali' },
  { id: 3, name: 'Ali' },
  { id: 4, name: 'Hassan' }
];

app.get('/users' , (req ,res) => {
    // const data = Number(req.query.age);
    const search = req.query.name;
    const results  = users.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
    });
    res.status(200).json(results);
});

// Route parameters
app.get('/user/:id' , (req,res) => {
    const Id = Number(req.params.id); // params is object of "key":"value"
    // const user = users.find(user => user.id === Id);
    const user = users.find((u) => {
        return u.id === Id;
    });

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    res.send(`
            <div style="width:90vw; height:90vh; display:flex; flex-direction:column; gap:10px; justify-content:center; align-items:center">
                <h1 style="color: blue; text-align= center;font-size:40px">Id: ${user.id}</h1>
                <h2 style="color: red; text-align= center;font-size:40px">Name: ${user.name}</h2>
            </div>
        `);
});

app.post('/submit', (req,res) => {
    const {email , password} = req.body;
    res.send(`
            <div style="width:90vw; height:90vh; display:flex; flex-direction:column; gap:10px; justify-content:center; align-items:center">
                <h1 style="color: blue; text-align= center;font-size:40px">Account Details:</h1>
                <h1 style="color: blue; text-align= center;font-size:40px">Email: ${email}</h1>
                <h2 style="color: red; text-align= center;font-size:40px">Password: ${password}</h2>
            </div>
        `);
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