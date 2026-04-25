//Importerar sqlite3
const Database = require("better-sqlite3");

//Skapar databasen
const db = new Database("database.db");

//Skapar tabellen experience om den inte redan finns. Unikt ID för varje post
db.exec(`
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