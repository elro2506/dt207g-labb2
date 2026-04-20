//Startar server
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servern funkar");
});

app.get("/experience", (req, res) => {
    res.json([
        {
            id: 1,
            company: "Skanetrafiken",
            jobtitle: "Kundtjanst",
            location: "Malmo",
            startdate: "20151225",
            enddate: "20161015",
            description: "Testjobb"

        }
    ])
})

app.listen(5000, () => {
    console.log("Servern startar på port 5000");
});