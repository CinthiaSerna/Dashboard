const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "dashboard_seguro";

let tareas = [];

// ---------------------------------------------------------------------------
// Login con usuario quemado

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "cinthia" && password === "cinthia123") {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ token });
    } else {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }
});

// ---------------------------------------------------------------------------
// Crear una tarea

app.post("/tareas", (req, res) => {
    const {texto} = req.body;
    if (!texto) return res.status(400).json({ error: "El texto es requerido" });

    const nuevaTarea = { id:Date.now(), texto };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// ---------------------------------------------------------------------------
// Editar una tarea

app.put("/tareas/:id", (req, res) => {
    const { id } = req.params;
    const { texto } = req.body;

    const tarea = tareas.find(t => t.id == id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    tarea.texto = texto || tarea.texto;
    res.json(tarea);
});

// ---------------------------------------------------------------------------
//Eliminar una tarea

app.delete("/tareas/:id", (req, res) => {
    const { id } = req.params;
    tareas = tareas.filter(t => t.id != id);
    res.json({ menssage: "Tarea eliminada" });
});

// ---------------------------------------------------------------------------

app.listen(5000, () => {
    console.log("Servidor corriendo en http://localhost:5000");
});
