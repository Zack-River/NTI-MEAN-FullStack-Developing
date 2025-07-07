const express = require('express');
const dotenv = require('dotenv');
const app = require('./app');
const port = process.env.PORT;

dotenv.config();

app.listen(port , () => {
    console.log(`Server is running on port: ${port}`);
});