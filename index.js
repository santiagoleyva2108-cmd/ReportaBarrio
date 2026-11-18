// 1. IMPORTAR EXPRESS Y CREAR EL SERVIDOR

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Permitir recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar los archivos HTML, CSS e imágenes
app.use(express.static(path.join(__dirname, "public")));

// Página de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Página de reportes
app.get("/reportes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reportes.html"));
});

// Página de estadísticas
app.get("/estadisticas", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "estadisticas.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`ReportaBarrio funcionando en http://localhost:${PORT}`);
});
