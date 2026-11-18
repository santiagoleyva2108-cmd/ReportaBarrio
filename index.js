
// 1. IMPORTAR EXPRESS Y CREAR EL SERVIDOR

const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


// 2. ARREGLO PARA ALMACENAR LOS REPORTES EN MEMORIA

const reportes = [];


// 3. CONFIGURACIÓN DE MIDDLEWARES

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


// 4. RUTA DE INICIO

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


// 5. RUTA POST PARA RECIBIR LOS REPORTES

app.post("/reportes", (req, res) => {

    // Obtener los datos enviados desde el formulario
    const {
        titulo,
        categoria,
        barrio,
        descripcion,
        urgencia,
        contacto
    } = req.body;


    // 6. VALIDAR LOS CAMPOS OBLIGATORIOS

    if (
        !titulo?.trim() ||
        !categoria?.trim() ||
        !barrio?.trim() ||
        !descripcion?.trim() ||
        !urgencia?.trim() ||
        !contacto?.trim()
    ) {
        return res.status(400).send(`
            <h1>Error 400: Datos incompletos</h1>
            <p>Debes completar todos los campos obligatorios.</p>
            <a href="/reportar.html">Volver al formulario</a>
        `);
    }


    // 7. ALMACENAR EL REPORTE EN EL ARREGLO

   const nuevoReporte = {
    id: Date.now(),
    titulo: titulo.trim(),
    categoria: categoria.trim(),
    barrio: barrio.trim(),
    descripcion: descripcion.trim(),
    urgencia: urgencia.trim(),
    contacto: contacto.trim(),
    fecha: new Date().toLocaleString("es-CO"),
    estado: "Pendiente"
};

    reportes.push(nuevoReporte);


    // 8. MOSTRAR LOS DATOS EN LA TERMINAL PARA COMPROBAR

    console.log("Reporte recibido correctamente:");
    console.log(nuevoReporte);


    // 9. RESPUESTA DESPUÉS DE RECIBIR EL REPORTE

   res.redirect("/reportar.html?exito=true");

});

// Mostrar la página de Reportes
app.get("/reportes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "reportes.html"));
});

// Mostrar la página de Estadísticas
app.get("/estadisticas", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "estadisticas.html"));
});


// 10. INICIAR EL SERVIDOR

app.listen(PORT, () => {
    console.log(`ReportaBarrio funcionando en http://localhost:${PORT}`);
});

