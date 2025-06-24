const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAMEDB_NAME
}
);

connection.connect((err)=>{
    if(err){
        console.error('error al conectarse a la bd', err.stack);
        return
    }
    console.log('conexion exitosa');
});

module.exports = connection;