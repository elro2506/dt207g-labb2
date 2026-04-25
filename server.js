//Installerar paketen jag behöver
const express = require("express");
const cors = require("cors");

//Importerar databasen
const db = require("./db");

//Express-appen
const app = express();

//Middlewares
app.use(cors()); //Så att frontend-sidan kan hämta API
app.use(express.json()); //Så att jag kan läsa JSON

//Min test-route för att se så att servern funkar
app.get("/", (req, res) => {
    res.send("Servern funkar");
});

//Resten av mina GETS
app.get("/experience", (req, res) => {
    //SQL-fråga så att jag hämtar data från experience
   db.all("SELECT * FROM experience", (err, rows) => {
    if (err) {
        //Felmeddelande vid eventuellt fel
        return res.status(500).json({ error: "Något gick fel"});
    }
    //Skickar tillbaka datan som JSON
    res.json(rows);
   });
});



//Lägger till ny post
app.post("/experience", (req, res) => {
    //Här hämtar jag data från request body
    const {
            company,
            jobtitle,
            location,
            startdate,
            enddate,
            description
    } = req.body;

    //Validering för att undvika tomma fält
    if (!company || !jobtitle || !location || !startdate || !enddate || !description) {
        return res.status(400).json({error: "Fyll i alla fält"});
    }
//SQL för att lägga till data
    const sql = `INSERT INTO experience (company, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)`;
//Kör SQL-frågan
    db.run(sql, [company, jobtitle, location, startdate, enddate, description], function(err) {
        if (err) {
            return res.status(500).json({error: "Gick inte att spara data"});
        }
//Skickar tillbaka svar + ID på nya posten
        res.json({
            message: "Post är tillagd",
            id: this.lastID
        });
    });
});

//Radera en experience
app.delete("/experience/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM experience WHERE id = ?";

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json ({error: "Kunde inte radera post"});
        }

        res.json({message: "Posten är raderad"});
    });
});

const PORT = process.env.PORT || 5000; //Försöker att koppla till Render på detta sätt
app.listen(PORT, () => {
    console.log("Servern startar på port " + PORT);
});