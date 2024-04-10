import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql"

let connection;

try {
    connection = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASS,
        database: process.env.DBNAME
    });
} catch(error){
    console.log("error al conectar con la base de datos")
}
export  {connection};