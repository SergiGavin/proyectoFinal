package com.example.proyecto_final.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.repository.LibrosRepository;

@Service
public class LibroService {
	
	@Autowired
	private LibrosRepository librosRepository;
	
	//Mostrar libros
	public List<LibrosEntity> getAllLibros(){
		return librosRepository.findAll();
	}
	//Mostrar libros especifico por ID
	//Hay que poner Optional porque el findById devuelve un Optional, puede devolver algo o no. 
	public Optional<LibrosEntity> getLibroById(Long id) {
	    return librosRepository.findById(id);
	}
	
	//Mostrar libros especificos por genero
	public List<LibrosEntity> getLibrosByGenero(String genero) {
		return librosRepository.findByGenero(genero);
	}
	//Mostrar libros especificos por autor
	public List<LibrosEntity> getLibrosByAutor(String autor) {
		return librosRepository.findByAutorContainingIgnoreCase(autor);	
	}	
	public List<LibrosEntity> getLibrosByTitulo(String titulo) {
		return librosRepository.findByTituloContainingIgnoreCase(titulo);	
	}	
	public List<LibrosEntity> getLibrosByTituloAndAutor(String titulo, String autor) {
	    System.out.println("Buscando libros con titulo: " + titulo + " y autor: " + autor);
	    List<LibrosEntity> result = librosRepository.findByTituloContainingIgnoreCaseAndAutorContainingIgnoreCase(titulo.trim(), autor.trim());
	    System.out.println("Libros encontrados: " + result.size());
	    return result;
	}
	
	
	
	
	//Crear un libro 
	public LibrosEntity createLibro(LibrosEntity libro) {
		return librosRepository.save(libro);
	}
	
	//Editar libro --> el codigo es igual que el crear pero en este caso como ya habrá un ID existente de ese libro
	// en vez de crearlo, lo actualizará.
	public LibrosEntity updateLibro(LibrosEntity libro) {
		return librosRepository.save(libro);
	}
	
	//Eliminar libro
	public void deleteLibroById(Long id) {
		librosRepository.deleteById(id);
	}
	 public LibrosEntity obtenerLibroPorId(Long idLibro) {
	        Optional<LibrosEntity> libroOptional = librosRepository.findById(idLibro);
	        return libroOptional.orElse(null);
	    }
}
