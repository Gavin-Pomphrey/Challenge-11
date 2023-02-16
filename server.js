const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Route handlers
app.get("/api/notes", (req, res) => {
    const notes = readDataFromFile();
    res.json(notes);
});

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = { id: uuidv4(), title, text };
    const notes = readDataFromFile();
    notes.push(newNote);
    writeDataToFile(notes);
    res.json(newNote);
});


// Data functions
function readDataFromFile() {
    const data = fs.readFileSync(path.join(__dirname, "db", "db.json"), "utf8");
    return JSON.parse(data);
}

function writeDataToFile(data) {
    fs.writeFileSync(path.join(__dirname, "db", "db.json"), JSON.stringify(data));
}


// Start server
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
