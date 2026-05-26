const express = require("express")
const router = express.Router();
const mysql = require("mysql2")
const dotenv = require("dotenv")
dotenv.config();

const pool = mysql.createPool({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    database: process.env.DB,
    connectionLimit: 1,
    connectTimeout: 12000,
    waitForConnections: true
})

module.exports = pool;