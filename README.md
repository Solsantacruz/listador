
![PauloLogo](https://res.cloudinary.com/ddlwjsfml/image/upload/v1703604360/FaceHalf_lce9uv.jpg)

# **Listador**

Este proyecto individual es la resolución de un desafío técnico para la empresa [Consultoría Global](https://www.consultoriaglobal.com.ar/) . La presentación del mismo es la siguiente:

*"Por un error en el proceso, se permitió realizar extracciones (varias para la misma cuenta) sin
controlar si la cuenta tenía monto suficiente en el Saldo.
Se debe hacer el proceso tal que detecte las cuentas que quedaron con saldo negativo. Para
ello se debe generar el archivo Errores.dat que contenga todas las cuentas que tienen saldo
negativo. Mostrar el archivo de errores e informar cuántas cuentas quedaron con un saldo negativo
mayor a $10000."*

## **🧾 Principales funcionalidades**

-  Selección manual del archivo de cuentas y de movimientos (se adjuntan ejemplos en la subcarpeta Files).
-  Importación del archivo de cuentas, almacenándolo indexado en una tabla de base de datos.
-  Creación del archivo de salida Errores.dat, con bajada automática en la carpeta local de descargas al finalizar el proceso.
-  Interfaz de usuario construida con React y React Router.
-  Diseño web responsive.
-  Estilizado con styled components y CSS modules.
-  Backend desarrollado con Express y Sequelize para interactuar con la base de datos.
-  Utilización de PostgreSQL como base de datos.
-  Solicitudes HTTP con Axios.

## **🧾 Tecnologías utilizadas**

-  React
-  React Router
-  Styled components
-  CSS modules
-  Express
-  Sequelize
-  PostgreSQL
-  Axios

## **🧾 Instrucciones de instalación**

-  Clonar el repositorio.
-  Navegar al directorio del proyecto. Hay dos carpetas de ejecución: Client, para el frontend, y Server para el backend.
-  Ejecutar `npm install` en ambas carpetas para instalar las dependencias.
-  Crear una nueva base de datos local en PostgreSQL con el nombre *listador*. Las dos tablas de operación se crearán automáticamente durante la ejecución del programa.

## **🧾 Instrucciones de ejecución**

-  Ejecutar `npm start` en la carpeta Server (backend).
-  Ejecutar `npm run dev` en la carpeta Client (frontend).
-  Navegar al sitio http://localhost:5173/.
-  Seguir las indicaciones del programa para seleccionar los archivos de entrada.
-  Presionar el botón **Iniciar proceso**.
-  El resultado final será la descarga automática del archivo Errores.dat, el cual se podrá acceder con cualquier visualizador de archivos. El tiempo de finalización del proceso puede variar, dependiendo de la cantidad de registros a procesar.

## **🧾 Acerca del Autor**

Este proyecto fue creado por [**Paulo Vinci**](https://www.linkedin.com/in/paulo-damian-vinci/).

