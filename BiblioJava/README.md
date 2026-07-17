# TareaLibro
Web API de Libro
En este repositorio se encuentra un proyecto, inicializado mediante la tecnogolia "Spring Initializer"
Con una clase "Libro" con los campos "Id","titulo","autor","editorial" y "anioPublicacion"

# Estructura
- Models: Donde se almacena nuestra clase creada 'Libro.'
- Repository: Donde se almacena de manera estatica la información que sera usada para la ejecución del proyecto.
- Services: Donde se almacenan los servicios que se ejecutaran en el proyecto.
- Controllers: Donde se almacenan los controlador con los que pondremos en acción nuestros servicios.

# Funcionamiento:
Tiene tres funcionalidades principales:

 - Consultar la lista de libros: Mediante una solicitud Get, nos muestra los libros almacenados en nuestro repositorio.
 - Buscar un libro: A través de una búsqueda Get de id, se solicita un libro en especifico.
 - Agregar libro: Por medio de una solicitud Post, se agrega (aunque de manera temporal al no contar con una base de datos) un nuevo libro con todas sus caracteristicas pertinentes.

# Ejecución 
 - Consulta general:
 - [![Prueba-Post-Man-Get-Libros.jpg](https://i.postimg.cc/rsxGtGBH/Prueba-Post-Man-Get-Libros.jpg)](https://postimg.cc/CnMn38LC)
 - Consulta Por Id:
 - [![Prueba-Post-Man-Get-Libro-Id.jpg](https://i.postimg.cc/k5GxydrK/Prueba-Post-Man-Get-Libro-Id.jpg)](https://postimg.cc/HJGcpRkk)
 - Libro Agregado: 
 - [![Prueba-Post-Man-Post-Libro.jpg](https://i.postimg.cc/fbPY2gZF/Prueba-Post-Man-Post-Libro.jpg)](https://postimg.cc/t1h17kst)
 - Consulta general con el libro agregado:
 - [![Prueba-Post-Man-Get-Libros-2.jpg](https://i.postimg.cc/VNZFyk9K/Prueba-Post-Man-Get-Libros-2.jpg)](https://postimg.cc/2qvWhmKW)
