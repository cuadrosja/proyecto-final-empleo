# Proyecto App Final: Empleo YA
(BackOffice y backend api)

### Integrantes Grupo 6 :
1. Jhonatan Alexander Quispe Cuadros 
2. Dennis Chávez Diaz 
3. Robinson Said Nolasco Valle 
4. Daril D'alessandro Urbina Sandoval

# Descripción General del Proyecto

**Empleo YA** es una aplicación móvil diseñada para funcionar como una bolsa de trabajo digital. Su principal objetivo es conectar a usuarios que buscan empleo 
con una variedad de oportunidades laborales. La aplicación gestiona todo el ciclo, desde el registro y la autenticación del usuario hasta la visualización de 
ofertas de trabajo detalladas y la postulación a las mismas.

# Funcionalidades Clave

**Registro de Usuarios:** Permite a nuevos usuarios crear una cuenta en la plataforma.
**Inicio de Sesión (Login):** Autenticación de usuarios existentes con persistencia de sesión.
**Gestión de Sesión:** Permite que el usuario permanezca conectado automáticamente (Recordar Sesión).
**Visualización de Empleos:** Muestra un catálogo de ofertas de trabajo con información detallada.
**Postulación:** Permite a los usuarios postularse directamente a los empleos de su interés.

---

# 1.Entrada (Verificación de Sesión)

* Cuando abres la app, el código verifica si ya iniciaste sesión anteriormente.
* Si la sesión está guardada (`CLAVE_ESTADO_SESION` es true), el usuario **salta a la pantalla de login** y va directamente al EmpleoActivity (la pantalla principal de empleos).

# 2. Registro (Creación de Cuenta)

* El usuario introduce sus datos y pulsa "Crear Cuenta".
* La aplicación valida los campos (ej. que el email sea correcto).
* Si el servidor confirma el registro, la app muestra un mensaje de éxito (ejemplo: "¡Registro Exitoso! Bienvenido, **Nombre**")
  y envía al usuario a la pantalla de **Inicio de Sesión** para que use sus nuevas credenciales.

# 3. Login (Guardar Sesión)

* El usuario ingresa su usuario y contraseña en la InicioActivity(pantalla de inicio).
* Si el servidor autentica las credenciales:
    * La app guarda el estado de la sesión (CLAVE_ESTADO_SESION = true) en la memoria del teléfono.
    * El usuario es inmediatamente redirigido a la EmpleoActivity (la pantalla principal de empleos).

------------------------------------------------------------------
#Este repositorio contiene el ecosistema completo de la aplicación.

## 📂 Estructura del Proyecto

* **/backoffice**: Interfaz de administración creada con React + Vite.
* **/backend**: API y lógica de servidor (Node.js/Python/etc).

## 🚀 Cómo ejecutarlo

### 1. Backend
1. Entra a la carpeta: cd backend
2. Instala dependencias: npm install 
3. Inicia: npm run dev

### 2. Backoffice
1. Entra a la carpeta: cd backoffice
2. Instala dependencias: npm install
3. Inicia: npm run dev

