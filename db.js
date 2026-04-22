//Importerar sqlite3
const sqlite3 = require("sqlite3");

//Skapar databasen
const db = new sqlite3.Database("./database.db");

//Skapar tabellen experience om den inte redan finns. Unikt ID för varje post
db.run(`
CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT,
    jobtitle TEXT,
    location TEXT,
    startdate TEXT,
    enddate TEXT,
    description TEXT
)
    `);

    //Exporterar databasen så att den kan användas i andra filer, exempelvis server.js
    module.exports = db;