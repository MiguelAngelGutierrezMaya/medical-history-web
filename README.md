# Management Historical Medicals Web

Aplicación web para la prestación de servicios terapéuticos, de salud y bienestar, además de la visualización de un listado de profesionales de la salud que estén acordes al servicio que sea solicitado, agendamiento de citas, relización de pagos y demás requerimientos que se contemplaron para el desarrollo de software de este proyecto. También se entregará la documentación necesaria incluyendo un plan de pruebas ejecutado.

### Dependencias 📋

---

Como prerequisito debe tener instalado en el sistema operatvo las siguientes dependencias:

| **DEPENDENCIA** | **FUENTE**                                                                         |
| --------------- | ---------------------------------------------------------------------------------- |
| Node JS         | [Obtener NodeJs](https://nodejs.org/en/)                                           |
| Docker          | [Obtener Docker](https://www.docker.com/products/overview)                         |
| docker-compose  | [Obtener docker-compose](https://docs.docker.com/compose/install/#install-compose) |

### Parámetros de configuración ⚙️

---

| **KEY**                | **VALUE**                     |
| ---------------------- | ----------------------------- |
| REACT_APP_URL_BASE     | http://localhost:3001         |
| REACT_APP_API_URL_BASE | https://bae2394dc34a.ngrok.io |

### Instrucciones de construcción o despliegue 📦

---

| **DESCRIPCIÓN**                                | **COMANDO**     |
| ---------------------------------------------- | --------------- |
| Compilación entorno de pruebas                 | `npm start`     |
| Ejecución de pruebas unitarias                 | `npm test`      |
| Compilación entornode producción               | `npm run build` |
| Dejar "permanente" la compilación de proucción | `npm run eject` |

### Autores ✒️

---

Edwin Castaño - ecastano@pcaingenieria.com

#### Observaciones 📄

---

- Para el comando `npm run eject` tratar de no usar este comando a no ser que sea necesario (si no se va a volver a compilar la aplicación en producción)
