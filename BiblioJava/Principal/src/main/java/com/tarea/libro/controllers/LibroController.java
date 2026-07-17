package com.tarea.libro.controllers;

import com.tarea.libro.models.Libro;
import com.tarea.libro.services.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class LibroController {

    @Autowired
    private LibroService libroService;

    @GetMapping("/Bienvenido")
    public String Hola(){
        return "Tarea pt1";
    }

    @PostMapping("/libros")
    public ResponseEntity<Libro> nuevoLibro(@RequestBody Libro libro){
        Libro creado = libroService.nuevoLibro(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping("/libros/{id}")
    public ResponseEntity<Libro> getLibro(@PathVariable int id){
        Libro libro = libroService.getLibro(id);
        if (libro == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(libro);
    }

    @GetMapping("/libros")
    public List<Libro> getLibros(){
        return libroService.getLibros();
    }

    @PutMapping("/libros/{id}")
    public Libro actualizarLibro(@PathVariable int id, @RequestBody Libro libro) {
        return libroService.actualizarLibro(id, libro);
    }

   @DeleteMapping("/libros/{id}")
    public ResponseEntity<Void> eliminarLibro(@PathVariable int id) {
        libroService.eliminarLibro(id);
        return ResponseEntity.noContent().build(); // Retorna un código HTTP 204
    }
}