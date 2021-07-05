const mysql = require("mysql");
const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "banana",
    database: "webapp"
}).promise()