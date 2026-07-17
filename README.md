# 📚 BiblioJava
Sistema de gestión de catálogo bibliográfico desarrollado como una aplicación web moderna y dinámica. Permite administrar registros de libros mediante operaciones **CRUD** (Crear, Leer, Actualizar y Eliminar), ofreciendo una interfaz inspirada en los tradicionales ficheros de biblioteca, combinada con tecnologías modernas de desarrollo web.

---
## 🚀 Tecnologías utilizadas
| Tecnología | Descripción |
|------------|-------------|
| ☕ Java 17 | Lenguaje principal del backend |
| 🌱 Spring Boot | Framework para el desarrollo de la API |
| 🗄️ H2 Database | Base de datos en memoria para desarrollo |
| 🎨 HTML5 | Estructura de la interfaz |
| 🎨 CSS3 | Diseño moderno y responsive |
| ⚡ JavaScript | Interactividad del frontend |
| 📦 Maven | Gestión de dependencias y compilación |

---

## ✨ Características
- 📖 Gestión completa de libros mediante operaciones **CRUD**.
- 🔍 Búsqueda y filtrado en tiempo real por:
  - Título
  - Autor
  - Editorial
  - Año de publicación
- 📱 Diseño responsive adaptable a dispositivos móviles y escritorio.
- 🌐 Indicador de estado de conexión con el servidor.
- ⚡ Actualización dinámica de la interfaz.

---

## 📁 Estructura del proyecto
```
BiblioJava/
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   ├── resources/
│   │   │   ├── static/
│   │   │   └── application.properties
│   │   └── ...
│   ├── test/
│
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

---

## 📋 Requisitos
Antes de ejecutar el proyecto asegúrate de tener instalado:
- ☕ Java Development Kit (JDK) 17 o superior
- 📦 Maven (opcional, ya que el proyecto incluye Maven Wrapper)
- 💻 Terminal o consola de comandos

---
## ⚙️ Instalación
### 1. Clonar el repositorio
```bash
git clone https://github.com/AlfMosquera/BiblioJava.git
```
### 2. Ingresar al proyecto
```bash
cd BiblioJava/Principal
```
---
## ▶️ Ejecutar la aplicación

### Windows
```bash
.\mvnw.cmd clean spring-boot:run
```

### Linux / macOS
```bash
./mvnw clean spring-boot:run
```

---
## 🌐 Acceder a la aplicación
Una vez iniciado el servidor, abre tu navegador en:
```
http://localhost:5070
```
---
## 🗄️ Consola H2
Puedes acceder a la base de datos desde:
```
http://localhost:5070/h2-console
```
### Credenciales

| Parámetro | Valor |
|-----------|-------|
| JDBC URL | jdbc:h2:mem:librosdb |
| Usuario | sa |
| Contraseña | *(vacía)* |

---

## 💡 Notas

- Si realizas cambios en los archivos ubicados en:

```
src/main/resources/static/
```

recuerda actualizar la caché del navegador con:

```
Ctrl + F5
```

para visualizar correctamente las modificaciones.

---

## 📸 Funcionalidades
- 📚 Registro de libros
- ✏️ Edición de registros
- 🗑️ Eliminación de libros
- 🔍 Búsqueda instantánea
- 📱 Interfaz adaptable
- ⚡ Comunicación en tiempo real con el backend

---

## 👨‍💻 Autor
**Omar Mosquera Soria**

Estudiante de Ingeniería en Sistemas  
Universidad de Guayaquil

---

## 📄 Licencia
Este proyecto ha sido desarrollado con fines académicos y de aprendizaje.

# Ejecución 
**Pantalla Principal**
![Pantalla Principal](https://github.com/AlfMosquera/BiblioJava/blob/main/BiblioJava/Principal/src/main/java/com/tarea/libro/image/Pantalla%20Principal.png)


**Pantalla Ingreso Base H2**
![Pantalla Ingreso Base H2](https://github.com/AlfMosquera/BiblioJava/blob/main/BiblioJava/Principal/src/main/java/com/tarea/libro/image/Pantalla%20Ingreso%20H2.png)

