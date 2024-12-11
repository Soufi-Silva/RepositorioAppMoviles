# Descripción

Este proyecto es una aplicación móvil que permite a los usuarios reportar cortes de suministro eléctrico en tiempo real. Los usuarios pueden crear y visualizar reportes con información de ubicación, imágenes y comentarios relacionados con la interrupción del servicio. La aplicación proporciona una interfaz intuitiva y funcionalidades para gestionar la autenticación de usuarios.
Esta Version se encuentra utilizando React Native y Expo para su despliegue.

## Objetivos

El objetivo principal de este proyecto es desarrollar una aplicación móvil que permita a los ciudadanos reportar cortes de suministro eléctrico de manera rápida y eficiente. 

Para ello, hemos establecido algunos objetivos específicos que OSP debe cumplir, entre los cuales se encuentran:

- **Facilitar el reporte de cortes de electricidad** mediante una interfaz fácil de usar.
- **Gestionar la autenticación** con el fin de permitir que los usuarios registren y guarden sus reportes.
- **Visualizar los reportes en tiempo real**, incluyendo detalles como la fecha, ubicación y medios adjuntos.
- **Proporcionar opciones de configuración y acceso al perfil de usuario**, con un diseño coherente y accesible.

### Características disponibles en esta entrega

- [ ] **Registro e Inicio de Sesión**: Los usuarios pueden registrarse y autenticarse utilizando Firebase. Se implementan validaciones para asegurar que los datos ingresados sean correctos.
- [ ] **Reporte de Incidentes**: Los usuarios pueden crear reportes con descripciones, imágenes y datos de geolocalización.
- [ ] **Gestión de Reportes**: Visualización de los reportes en una lista con imágenes y detalles relevantes.
- [ ] **Menú Lateral y Barra de Navegación**: Una barra lateral para acceder rápidamente al perfil y configuración .

## Tecnologías Utilizadas

- **Frontend**: React Native.
- **Backend**: Firebase.

## Características a Futuro v.2

Se planea a corto plazo implementar constantes mejoras en la experiencia de usuario:
Actualmente la version 1.2 cuenta con los siguientes avances:
- [ ] Perfil de Usuario. (listo)
- [ ] Mis reportes. (listo)
- [ ] Configuración. (tema gris)
- [ ] Edición de imagen y contenido. (listo)
- [ ] Avatares personalizados. (listo)

## Inicio de sesión

Puedes revisar esta versión de la app con los siguientes datos de prueba:

- **Usuario**: prueba@hotmail.com
- **Contraseña**: prueba

## Wireframes Propuestos

En las primeras etapas de diseño, se desarrollaron wireframes que proporcionaban una visión preliminar de la aplicación. Estos wireframes incluían las siguientes pantallas principales:

1. **Pantalla de Login/Registro**: Con botones claros para iniciar sesión o registrarse.
2. **Pantalla de Login**: Con campos para el correo y contraseña, con un diseño limpio y centrado.
3. **Pantalla de Registro**: Incluyendo campos para RUT, nombre de usuario, Avatar, correo electrónico y contraseña.
4. **Feed Principal**: Mostrando los reportes realizados por los usuarios con sus datos y avatars, con botones para crear un nuevo reporte o navegar por el menú.
5. **Menú Lateral**: Con opciones como Perfil, Configuración, Mis Reportes y la opción de Cerrar Sesión.

### Wireframe Propuesto

![Wireframe](https://github.com/user-attachments/assets/76263851-4905-463d-8862-90bb8f66bf94)

## Resultados

Los resultados finales muestran cómo los wireframes se transformaron en una aplicación completamente funcional. Aquí se observan:

- **Pantalla de Login y Registro**: Se respetó el esquema de diseño original, con mejoras visuales como la incorporación del logotipo de la aplicación y un fondo sólido para mejorar la legibilidad.
- **Feed Principal y Menú Lateral**: Se implementó un diseño moderno, con reportes visualmente atractivos y un menú lateral que permite una navegación sencilla y eficiente.
- **Reportes**: Los reportes hacen uso de una ubicacion entregada por el usuario mediante un mapa y un menú de seleccion de imagenes de forma sencilla y eficiente.

### Capturas de Pantallas de los Resultados

![Login](https://github.com/user-attachments/assets/a1460221-9f88-4d90-84ab-ffe0bc873bf7)
![Register](https://github.com/user-attachments/assets/08e8c9b5-c5b7-475f-b742-8eee4fec974b)
![ReportesScreen](https://github.com/user-attachments/assets/b4b3eb4b-a39d-494a-b581-aceb6ea6d2d3)
![MenúLateral](https://github.com/user-attachments/assets/58165a9a-98fe-433f-9508-4d77706b145f)
![Edit](https://github.com/user-attachments/assets/586dfc8d-d79f-4cae-b5da-cf8a105803e3)
![resultados](https://github.com/user-attachments/assets/d57cfd46-8b93-4a5c-9753-389fb0cf5f05)

---
