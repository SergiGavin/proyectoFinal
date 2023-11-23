package com.example.proyecto_final.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
}
