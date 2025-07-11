const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer');


// multer Storage config : file name and destination(directiory)
const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,"uploads/");
    },
    filename: function(req , file , cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// multer + filters
const upload = multer({storage:storage,
    limits : {
        fileSize: 1 * 1024 * 1024,
        files: 5
    },
    fileFilter: function (req, file , cb) {
        const allowedTypes = ['image/jpeg','image/png']
        if(allowedTypes.includes(file.mimetype)) {
            cb(null,true);
        }
        cb(new Error('Only JPG and PNG files are allowed'))
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// access static files
app.use(express.static("public"));
app.use('/uploads', express.static('uploads'));

// common used directories
const publicFolder = path.join(__dirname , 'public');
const submit = path.join(publicFolder , 'submit' , 'submit.html');

app.get("/submit" , (req,res) => {
    res.sendFile(submit);
});

app.post("/submit",(req,res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(404).json({message: "You must enter email and Password!"});
    }
    res.send(`
            <div style="width:90vw; height:90vh; display:flex; flex-direction:column; gap:10px; justify-content:center; align-items:center">
                <h1 style="color: blue; text-align= center;font-size:40px">Account Details:</h1>
                <h1 style="color: blue; text-align= center;font-size:40px">Email: ${email}</h1>
                <h2 style="color: red; text-align= center;font-size:40px">Password: ${password}</h2>
            </div>
        `);
});

app.post('/upload' , upload.single('myFile') , (req,res) => {
    console.log(req.file);
    res.send('File uploaded successfully!');
});

app.post('/upload-multiple' , upload.array('photos' , 5) , (req,res) => {
    res.send('File uploaded successfully!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
