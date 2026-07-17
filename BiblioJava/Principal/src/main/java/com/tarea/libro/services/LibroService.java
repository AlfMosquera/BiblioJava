package com.tarea.libro.services;

import com.tarea.libro.models.Libro;
import java.util.List;

public interface LibroService {
    List<Libro> getLibros();
    Libro getLibro(int id);
    Libro nuevoLibro(Libro libro);
    Libro actualizarLibro(int id, Libro libro);
    void eliminarLibro(int id);
}