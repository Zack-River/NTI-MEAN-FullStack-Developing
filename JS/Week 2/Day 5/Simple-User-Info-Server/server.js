const { log } = require("console");
const express = require("express");

const app = express();
const port = 3000;

let users = [
    {id: 1, name: "Zack" , age: 21},
    {id: 2, name: "Ahmed" , age: 30},
    {id: 3, name: "Ali" , age: 25}
];

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ ROUTES FIRST
app.get('/', (req , res) => {
    res.send(`Welcome to the User Info Server!`);
});

app.get('/users', (req,res) => {
    res.json(users);
});

app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id == id);

    if(!user) {
        res.status(404).send('User not found');
        return;
    }

    res.json(user);
});

app.get('/search', (req,res) => {
    const name  = req.query.name;

    if(!name) {
        res.json(users);
        return;
    }
    
    const results = users.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(results);
});

app.post('/users', (req,res) => {
    const {name , age} = req.body;
    const newId = users.length+1;
    const newUser = {id: newId , name , age};

    users.push(newUser);
    res.status(201).json(newUser);
});

app.use((req, res) => {
  res.status(404).send('404: Page Not Found');
});

app.listen(port , () => {
    console.log(`Server Is running on port: ${port}`);
});
