# ReportaBarrio
# ReportaBarrio 🏘️

## Plataforma ciudadana para reportar problemas del barrio

Integrantes: Santiago Leyva y Carlos Castillo

ReportaBarrio es una aplicación web que busca facilitar la participación ciudadana mediante el registro y consulta de problemas que afectan a las comunidades, como daños en las vías, alumbrado público, acumulación de basuras y problemas de agua y alcantarillado.

El proyecto está relacionado con el **Objetivo de Desarrollo Sostenible 11 (ODS 11): Ciudades y comunidades sostenibles**, promoviendo barrios más seguros, inclusivos y sostenibles.

## 🎯 Objetivo del proyecto

Desarrollar una plataforma web que permita a los ciudadanos registrar problemas de su comunidad, consultar reportes y visualizar estadísticas sobre las situaciones identificadas en los barrios.

## 🛠️ Tecnologías utilizadas

- **HTML5:** estructura y contenido de las páginas web.
- **CSS3:** diseño, estilos y adaptación a diferentes dispositivos.
- **JavaScript:** lógica de programación.
- **Node.js:** entorno de ejecución de JavaScript.
- **Express.js:** framework para la creación del servidor y gestión de rutas.
- **Nodemon:** herramienta para reiniciar automáticamente el servidor durante el desarrollo.
- **Git y GitHub:** control de versiones y almacenamiento del proyecto.

## 📁 Estructura del proyecto

```text
ReportaBarrio/
│
├── index.js
├── package.json
├── package-lock.json
├── README.md
│
└── public/
    ├── index.html
    ├── reportar.html
    ├── reportes.html
    ├── estadisticas.html
    ├── estilos.css
    │
    └── img/
        └── logo.png
```

## 🖥️ Secciones de la aplicación

### 1. Inicio

Presenta la plataforma, su objetivo y las opciones principales de navegación.

### 2. Reportar

Contiene un formulario para registrar problemas de la comunidad con los siguientes datos:

- Título del reporte.
- Categoría.
- Barrio.
- Descripción.
- Nivel de urgencia.
- Información de contacto.

### 3. Reportes

Permite consultar los problemas registrados, conocer su categoría, barrio, urgencia y estado. También contempla filtros para facilitar la búsqueda.

### 4. Estadísticas

Presenta información resumida de los reportes, incluyendo cantidades por estado, categoría y nivel de urgencia.

## ⚙️ Instalación y ejecución

### Requisitos previos

- Tener instalado Node.js.
- Tener instalado npm.
- Contar con un editor de código, como Visual Studio Code.

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

También puedes descargar el proyecto desde GitHub y abrir la carpeta en Visual Studio Code.

### 2. Abrir la carpeta del proyecto

Abre una terminal en Visual Studio Code y ubícate dentro de la carpeta `ReportaBarrio`.

### 3. Instalar las dependencias

```bash
npm install
```

### 4. Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

También puedes ejecutarlo con:

```bash
npm start
```

### 5. Abrir la aplicación

En el navegador ingresa a:

```text
http://localhost:3000
```

## 📦 Dependencias

El proyecto utiliza principalmente:

- express
- nodemon (dependencia de desarrollo)

Las dependencias se encuentran definidas en `package.json` y se instalan mediante `npm install`.

## 💾 Almacenamiento de datos

Los reportes se almacenarán temporalmente en un arreglo en memoria de JavaScript dentro del servidor Express.

No se utiliza una base de datos. Por esta razón, los registros se perderán cuando se reinicie el servidor.

## 🌱 Objetivo de Desarrollo Sostenible

Este proyecto contribuye al **ODS 11: Ciudades y comunidades sostenibles**, fomentando la participación ciudadana y la identificación de problemas que afectan la calidad de vida de los habitantes.

## 👥 Desarrollo del proyecto

Proyecto académico desarrollado en equipo como parte de la asignatura de Tecnologías Web.

## 📌 Estado del proyecto

El frontend de la aplicación se encuentra desarrollado. La implementación y conexión de las funcionalidades del backend se realizará progresivamente.

---

**ReportaBarrio – Construyendo comunidades más sostenibles.**
