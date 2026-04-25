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
    try {
        const rows = db.prepare("SELECT * FROM experience").all();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Något gick fel" });
    }
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
        return res.status(400).json({ error: "Fyll i alla fält" });
    }

    try {
        const stmt = db.prepare(`
            INSERT INTO experience (company, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?)`);

        const result = stmt.run(company, jobtitle, location, startdate, enddate, description);
        res.status(201).json({
            message: "Post tillagd",
            id: result.lastInsertRowid
        });
    } catch (error) {
        return res.status(500).json({ error: "Gick inte att spara data" });
    }

});


//Radera en experience
app.delete("/experience/:id", (req, res) => {
    try {
        db.prepare("DELETE FROM experience WHERE id = ?").run(req.params.id);
        res.json({ message: "Post raderad" });
    } catch (error) {
        res.status(500).json({ error: "Kunde inte radera" });
    }
});


const PORT = process.env.PORT || 5000; //Försöker att koppla till Render på detta sätt
app.listen(PORT, () => {
    console.log("Servern startar på port " + PORT);

});