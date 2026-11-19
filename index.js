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


// ==========================================
// RUTA GET /reportes (Con filtros y tarjetas dinámicas)
// ==========================================
app.get("/reportes", (req, res) => {
    const { categoria, barrio } = req.query;

    // Filtrar los reportes según los parámetros de la URL
    let reportesFiltrados = reportes;

    if (categoria) {
        reportesFiltrados = reportesFiltrados.filter(
            r => r.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    if (barrio) {
        reportesFiltrados = reportesFiltrados.filter(
            r => r.barrio.toLowerCase().includes(barrio.toLowerCase())
        );
    }

    // Generar el HTML de las tarjetas dinámicamente
    let tarjetasHTML = "";
    if (reportesFiltrados.length === 0) {
        tarjetasHTML = `
            <div class="mensaje-comunidad" style="grid-column: 1 / -1;">
                <h2>No se encontraron reportes</h2>
                <p>No hay reportes que coincidan con los filtros seleccionados.</p>
                <a href="/reportes" class="boton">Ver todos los reportes</a>
            </div>
        `;
    } else {
        tarjetasHTML = reportesFiltrados.map(r => {
            let claseUrgencia = "baja";
            if (r.urgencia === "Alta") claseUrgencia = "alta";
            if (r.urgencia === "Media") claseUrgencia = "media";

            return `
                <article class="tarjeta-reporte">
                    <span class="etiqueta-urgencia ${claseUrgencia}">Urgencia: ${r.urgencia}</span>
                    <h3>${r.titulo}</h3>
                    <p><strong>Categoría:</strong> ${r.categoria}</p>
                    <p><strong>Barrio:</strong> ${r.barrio}</p>
                    <p>${r.descripcion}</p>
                    <p><strong>Contacto:</strong> ${r.contacto}</p>
                    <p><small>Fecha: ${r.fecha}</small></p>
                    <div class="estado">Estado: ${r.estado}</div>
                </article>
            `;
        }).join("");
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ReportaBarrio | Listado de Reportes</title>
            <link rel="stylesheet" href="/estilos.css">
        </head>
        <body>
            <header class="encabezado">
                <a href="/" class="logo">
                    <img src="/img/logo.png" alt="Logo ReportaBarrio">
                    ReportaBarrio
                </a>
                <nav class="menu">
                    <a href="/">Inicio</a>
                    <a href="/reportar.html">Reportar</a>
                    <a href="/reportes">Reportes</a>
                    <a href="/estadisticas">Estadísticas</a>
                </nav>
            </header>

            <main class="seccion-reportes">
                <h2>Listado de Reportes Ciudadanos</h2>
                
                <!-- Formulario de Filtros -->
                <form action="/reportes" method="GET" class="filtros">
                    <div class="campo">
                        <label for="categoria">Filtrar por Categoría</label>
                        <select id="categoria" name="categoria">
                            <option value="">Todas las categorías</option>
                            <option value="Vías y huecos" ${categoria === 'Vías y huecos' ? 'selected' : ''}>Vías y huecos</option>
                            <option value="Alumbrado público" ${categoria === 'Alumbrado público' ? 'selected' : ''}>Alumbrado público</option>
                            <option value="Residuos y basuras" ${categoria === 'Residuos y basuras' ? 'selected' : ''}>Residuos y basuras</option>
                            <option value="Agua y alcantarillado" ${categoria === 'Agua y alcantarillado' ? 'selected' : ''}>Agua y alcantarillado</option>
                            <option value="Espacio público y zonas verdes" ${categoria === 'Espacio público y zonas verdes' ? 'selected' : ''}>Espacio público y zonas verdes</option>
                            <option value="Seguridad vial" ${categoria === 'Seguridad vial' ? 'selected' : ''}>Seguridad vial</option>
                        </select>
                    </div>

                    <div class="campo">
                        <label for="barrio">Filtrar por Barrio</label>
                        <input type="text" id="barrio" name="barrio" placeholder="Nombre del barrio" value="${barrio || ''}">
                    </div>

                    <button type="submit" class="boton">Filtrar</button>
                    <a href="/reportes" class="boton" style="background-color: #64748b; text-align: center; text-decoration: none;">Limpiar</a>
                </form>

                <!-- Cuadrícula de Tarjetas -->
                <div class="contenedor-tarjetas" style="margin-top: 30px;">
                    ${tarjetasHTML}
                </div>
            </main>

            <footer class="pie">
                <p>ReportaBarrio - Tecnologías Web | ODS 11</p>
            </footer>
        </body>
        </html>
    `);
});


// ==========================================
// RUTA GET /estadisticas (Cálculo dinámico)
// ==========================================
app.get("/estadisticas", (req, res) => {
    const totalReportes = reportes.length;
    const pendientes = reportes.filter(r => r.estado === "Pendiente").length;
    const urgentesAltas = reportes.filter(r => r.urgencia === "Alta").length;
    const urgentesMedia = reportes.filter(r => r.urgencia === "Media").length;
    const urgentesBaja = reportes.filter(r => r.urgencia === "Baja").length;

    const catVias = reportes.filter(r => r.categoria === "Vías y huecos").length;
    const catAlumbrado = reportes.filter(r => r.categoria === "Alumbrado público").length;
    const catResiduos = reportes.filter(r => r.categoria === "Residuos y basuras").length;
    const catAgua = reportes.filter(r => r.categoria === "Agua y alcantarillado").length;
    const catEspacio = reportes.filter(r => r.categoria === "Espacio público y zonas verdes").length;
    const catSeguridad = reportes.filter(r => r.categoria === "Seguridad vial").length;

    res.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ReportaBarrio | Estadísticas</title>
            <link rel="stylesheet" href="/estilos.css">
        </head>
        <body>
            <header class="encabezado">
                <a href="/" class="logo">
                    <img src="/img/logo.png" alt="Logo ReportaBarrio">
                    ReportaBarrio
                </a>
                <nav class="menu">
                    <a href="/">Inicio</a>
                    <a href="/reportar.html">Reportar</a>
                    <a href="/reportes">Reportes</a>
                    <a href="/estadisticas">Estadísticas</a>
                </nav>
            </header>

            <main class="seccion-estadisticas">
                <h2>Estadísticas Generales</h2>
                <p class="descripcion-estadisticas">Monitoreo en tiempo real de los reportes ciudadanos asociados a los objetivos de desarrollo sostenible (ODS 11).</p>
                
                <div class="resumen-estadisticas" style="margin-bottom: 35px;">
                    <div class="tarjeta-estadistica">
                        <h3>Total Reportes</h3>
                        <p class="numero-estadistica">${totalReportes}</p>
                        <span>Registrados</span>
                    </div>
                    <div class="tarjeta-estadistica">
                        <h3>Pendientes</h3>
                        <p class="numero-estadistica">${pendientes}</p>
                        <span>Por revisar</span>
                    </div>
                    <div class="tarjeta-estadistica">
                        <h3>Urgencia Alta</h3>
                        <p class="numero-estadistica">${urgentesAltas}</p>
                        <span>Críticos</span>
                    </div>
                    <div class="tarjeta-estadistica">
                        <h3>Barrios</h3>
                        <p class="numero-estadistica">${[...new Set(reportes.map(r => r.barrio))].length}</p>
                        <span>Participando</span>
                    </div>
                </div>

                <h2 style="margin-top: 40px;">Reportes por Categoría (ODS 11)</h2>
                <div class="panel-estadisticas" style="margin-bottom: 35px;">
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Vías y huecos</strong>
                            <span>${catVias} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catVias / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Alumbrado público</strong>
                            <span>${catAlumbrado} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catAlumbrado / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Residuos y basuras</strong>
                            <span>${catResiduos} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catResiduos / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Agua y alcantarillado</strong>
                            <span>${catAgua} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catAgua / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Espacio público y zonas verdes</strong>
                            <span>${catEspacio} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catEspacio / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                    <div class="barra-estadistica">
                        <div class="informacion-barra">
                            <strong>Seguridad vial</strong>
                            <span>${catSeguridad} reportes</span>
                        </div>
                        <div class="fondo-barra"><div class="progreso-barra" style="width: ${totalReportes ? (catSeguridad / totalReportes) * 100 : 0}%;"></div></div>
                    </div>
                </div>

                <h2>Distribución por Urgencia</h2>
                <div class="resumen-urgencias">
                    <div class="tarjeta-urgencia urgencia-alta">
                        <h3>Alta</h3>
                        <p>${urgentesAltas}</p>
                        <span>Casos críticos</span>
                    </div>
                    <div class="tarjeta-urgencia urgencia-media">
                        <h3>Media</h3>
                        <p>${urgentesMedia}</p>
                        <span>Atención moderada</span>
                    </div>
                    <div class="tarjeta-urgencia urgencia-baja">
                        <h3>Baja</h3>
                        <p>${urgentesBaja}</p>
                        <span>Menor prioridad</span>
                    </div>
                </div>
            </main>

            <footer class="pie">
                <p>ReportaBarrio - Tecnologías Web | ODS 11</p>
            </footer>
        </body>
        </html>
    `);
});


// ==========================================
// RUTA DE ERROR 404 (Páginas inexistentes)
// ==========================================
app.use((req, res) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Error 404 | Página no encontrada</title>
            <link rel="stylesheet" href="/estilos.css">
        </head>
        <body style="text-align: center; padding: 80px 20px;">
            <header class="encabezado">
                <a href="/" class="logo">ReportaBarrio</a>
            </header>
            <main style="margin: 50px auto; max-width: 600px;">
                <h1 style="color: #164e63; font-size: 48px; margin-bottom: 20px;">404</h1>
                <h2>Página no encontrada</h2>
                <p style="margin: 20px 0; color: #555;">La ruta que intentas visitar no existe o fue movida.</p>
                <a href="/" class="boton">Volver al inicio</a>
            </main>
        </body>
        </html>
    `);
});


// ==========================================
// 10. INICIAR EL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`ReportaBarrio funcionando en http://localhost:${PORT}`);
});