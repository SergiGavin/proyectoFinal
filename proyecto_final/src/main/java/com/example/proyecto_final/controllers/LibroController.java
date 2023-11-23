package com.example.proyecto_final.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.services.LibroService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("swap-reads/libro")
public class LibroController {

	@Autowired
	private LibroService libroService;
	
		//GET
		@GetMapping
		public List<LibrosEntity> listarLibros(){
			return libroService.getAllLibros();
		}
		
		//POST
		@PostMapping
		public LibrosEntity crearLibro(@RequestBody LibrosEntity libro) {
			return libroService.createLibro(libro);
		}
		
		//PUT
		@PostMapping("editar/{id}")
		//Pasamos como variable el id ya que se necesitará para editar el libro en especifico.
		public LibrosEntity actualizarLibro(@RequestBody LibrosEntity libro, @PathVariable Long id) {
			libro.setId_libros(id);
			return libroService.updateLibro(libro);
		}
		//DELETE
		@DeleteMapping("eliminar/{id}")
		public void eliminarLibro(@PathVariable Long id) {
			libroService.deleteLibroById(id);
		}
}
