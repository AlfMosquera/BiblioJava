package com.tarea.libro.services;

import com.tarea.libro.models.Libro;
import com.tarea.libro.repositories.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LibroServiceImpl implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Override
    public List<Libro> getLibros() {
        return libroRepository.findAll();
    }

    @Override
    public Libro getLibro(int id) {
        // JPA usa Long, por lo que convertimos el int a long
        return libroRepository.findById((long) id).orElse(null);
    }

    @Override
    public Libro nuevoLibro(Libro libro) {
        return libroRepository.save(libro);
    }

    @Override
    public Libro actualizarLibro(int id, Libro libro) {
        libro.setId((long) id);
        return libroRepository.save(libro);
    }

    @Override
    public void eliminarLibro(int id) {
        libroRepository.deleteById((long) id);
    }
}