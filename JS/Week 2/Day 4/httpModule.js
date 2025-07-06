const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req , res) => {
    if(req.url === '/') {
        res.write('<h1>Welcome to My Node.js Server!</h1>')
        res.end();
    } else if (req.url === '/about') {
        res.write(
            `<h1 style="color:red; font-size:60px">About Us</h1>
            <p>This is a simple Node.js server that handles different routes.</p>`
        );
        res.end();
    } else if (req.url === '/contact') {
        res.write(
            `<h1 style="color:red; font-size:60px">Contact Information</h1>
            <p>For inquiries, email us at contact@nodejsserver.com</p>`
        );
        res.end();
    } else if (req.url === '/page') {
        fs.readFile(path.join(__dirname, "public/page.html") , "utf8" , (err,data) => {
            if(err) {
                res.write(`<h1>500 Internal Server Error</h1>`);
                res.end;
                return;
            }
            res.write(data);
            res.end();
        });
    } else if(req.url === '/student') {
        const student = {
            name: 'Zack River',
            age: '21'
        };
        // status code + header info and type
        res.writeHead(200, {"content-type":'application/json'});
        // message after type decleration on header and turn student from js object to json format
        res.end(JSON.stringify(student));
    } else {
        res.writeHead(404,{"content-type":"text/html"});
        res.end(`<h1 style="color:red; font-size:60px">404 Not Found</h1>`);
    }
});

server.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
});

// server.on('request', (req, res) => {
//     let body = '';

//     req.on('data', chunk => {
//         body += chunk;
//     });

//     req.on('end', () => {
//         console.log(`Request method: ${req.method}`);
//         console.log(`Request url: ${req.url}`);

//         try {
//             const parsedBody = JSON.parse(body);
//             console.log("Request body:", parsedBody);
//         } catch (error) {
//             console.error("Invalid JSON:", body);
//         }

//         res.statusCode = 200;
//         res.write('<h1 style="color:red; font-size:60px">Hello, world!</h1>');
//         res.end();
//     });
// });
