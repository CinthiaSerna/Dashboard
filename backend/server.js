const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "dashboard_seguro";

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "cinthia" && password === "cinthia123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    } else {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }
});

app.listen(5000, () => {
    console.log("Servidor corriendo en http://localhost:5000");
});
