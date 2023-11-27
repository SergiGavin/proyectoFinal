package com.example.proyecto_final.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.proyecto_final.entities.LibrosEntity;
import com.example.proyecto_final.services.LibroService;


@RestController
@RequestMapping("/libros")
@CrossOrigin(origins = { "http://localhost:3000", "http://127.0.0.1:3000" })
public class LibroController {

	@Autowired
	private LibroService libroService;

	// GET
	@GetMapping
	public List<LibrosEntity> listarLibros() {
		return libroService.getAllLibros();
	}

	// GET para obtener un libro por ID
	// Si el id esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/{id}")
	public ResponseEntity<?> obtenerLibroPorId(@PathVariable Long id) {
		Optional<LibrosEntity> librosPorAutor = libroService.getLibroById(id);

		if (librosPorAutor.isPresent()) {
			return new ResponseEntity<>(librosPorAutor.get(), HttpStatus.OK);
		} else {
			String mensaje = "No se encontró ningún libro con el ID: " + id;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// GET para obtener un libro por genero
	// Si el genero esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/genero/{genero}")
	public ResponseEntity<?> obtenerLibrosPorGenero(@PathVariable String genero) {
		List<LibrosEntity> librosPorGenero = libroService.getLibrosByGenero(genero);

		if (!librosPorGenero.isEmpty()) {
			return new ResponseEntity<>(librosPorGenero, HttpStatus.OK);
		} else {
			String mensaje = "No se encontraron libros para el género: " + genero;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// GET para obtener un libro por autor
	// Si el autor esta presente lo mostrará sino saldra mensaje de no encontrado.
	// Si pones algo parecido al nombre te saldra. Ejemplo: J.K. Rowling la puedes
	// encontrar con "row"
	// Para ello utilizamos un placeHolder en el ResponseEntity
	@GetMapping("/autor/{autor}")
	public ResponseEntity<?> obtenerLibrosPorAutor(@PathVariable String autor) {
		if (autor != null) {
			autor = autor.trim();
		} else {
			// Manejar el caso en que autor es null, por ejemplo, asignar una cadena vacía o
			// devolver un error.
			return new ResponseEntity<>("Introduzca el autor", HttpStatus.BAD_REQUEST);
		}

		List<LibrosEntity> librosPorAutor = libroService.getLibrosByAutor(autor);

		if (!librosPorAutor.isEmpty()) {
			return new ResponseEntity<>(librosPorAutor, HttpStatus.OK);
		} else {
			String mensaje = "No se encontraron libros para el autor: " + autor;
			return new ResponseEntity<>(mensaje, HttpStatus.NOT_FOUND);
		}
	}

	// Put
	@PutMapping
	public LibrosEntity crearLibro(@RequestBody LibrosEntity libro) {
		return libroService.createLibro(libro);
	}

	// Patch
	@PatchMapping("/{id}")
	// Pasamos como variable el id ya que se necesitará para editar el libro en
	// especifico.
	public LibrosEntity actualizarLibro(@RequestBody LibrosEntity libro, @PathVariable Long id) {
		libro.setId_libros(id);
		return libroService.updateLibro(libro);
	}

	// DELETE
	@DeleteMapping("/{id}")
	public void eliminarLibro(@PathVariable Long id) {
		libroService.deleteLibroById(id);
	}
}
